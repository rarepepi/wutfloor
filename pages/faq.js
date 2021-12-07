import React, { useContext } from "react";
import { Container, Row, Accordion, Card, Image } from "react-bootstrap";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import { Discord, Instagram, Twitter } from "react-bootstrap-icons";

import { nftaddress, rgbaddress } from "../config";
import Particles from "react-particles-js";

import Color from "../artifacts/contracts/Color.sol/Color.json";
import YieldToken from "../artifacts/contracts/YieldToken.sol/YieldToken.json";

import { ethers } from "ethers";
import Web3Modal from "web3modal";

class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: [],
      selectedColors: [],
      claimableAmount: 0,
      isMobile: false,
    };
  }

  componentDidMount() {
    // this.loadColors()
    // this.getClaimableAmount()
  }

  updatePredicate() {
    this.setState({ isMobile: window.innerWidth <= 600 });
  }

  breed = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    let signer = provider.getSigner();
    console.log(signer.provider.provider.selectedAddress);
    const tokenContract = new ethers.Contract(nftaddress, Color.abi, signer);
    let tokenId = await tokenContract.breed(1, 2);
  };

  getClaimableAmount = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    let signer = provider.getSigner();
    console.log(signer.provider.provider.selectedAddress);
    const yieldTokenContract = new ethers.Contract(
      rgbaddress,
      YieldToken.abi,
      signer
    );
    let amount = await yieldTokenContract.getTotalClaimable(
      signer.provider.provider.selectedAddress
    );
    console.log(amount);
    this.setState({
      claimableAmount:
        Math.round(ethers.utils.formatEther(amount._hex) * 100) / 100,
    });
  };

  claimRGB = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    let signer = provider.getSigner();
    const colorContract = new ethers.Contract(nftaddress, Color.abi, signer);
    let tx = await colorContract.getReward();
    await tx.wait();
  };

  loadColors = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    let signer = provider.getSigner();
    console.log(signer.provider.provider.selectedAddress);
    const tokenContract = new ethers.Contract(nftaddress, Color.abi, provider);
    const balance = await tokenContract.balanceOf(
      signer.provider.provider.selectedAddress
    );

    let tokensData = [];
    for (let i = 0; i < balance; i++) {
      let tokenId = await tokenContract.tokenOfOwnerByIndex(
        signer.provider.provider.selectedAddress,
        i
      );
      let tokenData = await this.getTokenURI(tokenId.toNumber());
      tokensData.push(tokenData);
    }

    this.setState({ tokens: tokensData });
  };

  getTokenURI = async (_tokenId) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    let signer = provider.getSigner();
    const tokenContract = new ethers.Contract(nftaddress, Color.abi, provider);
    let tokenUri = await tokenContract.tokenURI(_tokenId);
    let b64Text = tokenUri.split(",")[1];
    let buff = new Buffer.from(b64Text, "base64");
    let ascii = buff.toString("ascii");
    let data = JSON.parse(ascii);
    // console.log(data)
    if (data.attributes[0].value !== "#") {
      let svgB64Text = data.image.split(",")[1];
      buff = new Buffer.from(svgB64Text, "base64");
      ascii = buff.toString("ascii");
      let svgText = ascii;
      return {
        tokenId: _tokenId,
        name: data.name,
        hex: data.attributes[0].value,
        art: svgText,
      };
    }
  };

  render() {
    const isMobile = this.state.isMobile;

    return (
      <div className="rootContainer">
        <Container>
          <div style={{ marginTop: "-55px" }} className="center">
            <Fade right>
              <div className="address-connected">
                <a style={{ fontSize: "24px" }} href="/">
                  <Image width={100} src="img/logo.png"></Image>
                </a>
              </div>
            </Fade>
          </div>
          <div className="center faq-list">
            <Card className="faq-item card-style">
              <Card.Body>
                <Card.Title>How does the game work?</Card.Title>
                <Card.Text>
                  <h3>
                    On mint day you will be able to mint up to 10 numbers
                    randomly generated between 1 and 1,000. The higher the
                    number the faster you can claim the prize pool.
                  </h3>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="card-style faq-item">
              <Card.Body>
                <Card.Title>More Details coming soon.</Card.Title>
                <Card.Text>
                  <h3>Join our discord to find out more.</h3>
                </Card.Text>
              </Card.Body>
            </Card>
            {/* <Card className="card-style">
                                <Card.Body>
                                    <Card.Title>Question 1</Card.Title>
                                    <Card.Text>
                                        <h3>The game begins</h3>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className="card-style">
                                <Card.Body>
                                    <Card.Title>Question 1</Card.Title>
                                    <Card.Text>
                                        <h3>The game begins</h3>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className="card-style">
                                <Card.Body>
                                    <Card.Title>Question 1</Card.Title>
                                    <Card.Text>
                                        <h3>The game begins</h3>
                                    </Card.Text>
                                </Card.Body>
                            </Card> */}
          </div>
        </Container>
      </div>
    );
  }
}

export default FAQ;
