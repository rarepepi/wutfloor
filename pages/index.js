import React, { useContext } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import rateLimit from 'axios-rate-limit';
import { ethers } from "ethers";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import MainContent from "../components/MainContent";
import FAQ from '../components/FAQ';
import ENS, { getEnsAddress } from '@ensdomains/ensjs';
import detectEthereumProvider from '@metamask/detect-provider';
import axios from "axios";
import NFTAsset from "../components/NFTAsset";
const request = rateLimit(axios.create(), { maxRequests: 5, perMilliseconds: 1000, maxRPS: 5 });
import Web3 from "web3";
import TypeIt from "typeit-react";
import Router from 'next/router';
import Particles from "react-particles-js";
import Head from 'next/head';
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      signedIn: false,
      userAddress: "",
      wrongAddress: false,
    };
    this.updatePredicate = this.updatePredicate.bind(this);
    this.myRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);

  }

  async componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);

    sleep(2000).then(() => {
      this.setState({ loading: false });
    });

    const data = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');

    this.setState({ ethPrice: data.data.USD });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ isMobile: window.innerWidth <= 600 });
  }

  handleChange(event) {
    this.setState({ userAddress: event.target.value });
  }

  async handleSumbit(e) {
    e.preventDefault();
    let ethAddress = this.state.userAddress;
    if (ethAddress.endsWith('.eth')) {
      const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/558cd10a65b84096b34dc0ab71eb6ef7");
      const ens = new ENS({ provider, ensAddress: getEnsAddress('1') });
      ethAddress = await ens.name(ethAddress).getAddress();
    }


    if (!Web3.utils.isAddress(ethAddress)) {
      this.setState({ wrongAddress: true });
      return;
    }

    Router.push(`/a/${ethAddress}`);
  }

  render() {
    return (
      <div className="font-press-start min-h-screen relative bg-background">
        <Head>
          <title>
            Wut Floor
          </title>

        </Head>
        <div className=""><Particles className="absolute -z-10 inset-0" id="tsparticles" options={{
          "background": {
            "color": {
              "value": "#232741"
            },
            "image": "url('http://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1237px-NASA_logo.svg.png')",
            "position": "50% 50%",
            "repeat": "no-repeat",
            "size": "100%"
          },
          "fullScreen": {
            "zIndex": 1,
            "enable": true,
          },
          "interactivity": {
            "events": {
              "onClick": {
                "enable": true,
                "mode": "repulse"
              },
              "onHover": {
                "enable": true,
                "mode": "bubble"
              }
            },
            "modes": {
              "bubble": {
                "distance": 250,
                "duration": 2,
                "opacity": 0,
                "size": 0
              },
              "grab": {
                "distance": 400
              },
              "repulse": {
                "distance": 400
              }
            }
          },
          "particles": {
            "color": {
              "value": "#ffffff"
            },
            "links": {
              "color": {
                "value": "#ffffff"
              },
              "distance": 150,
              "opacity": 0.4
            },
            "move": {
              "attract": {
                "rotate": {
                  "x": 600,
                  "y": 600
                }
              },
              "enable": true,
              "outModes": {
                "bottom": "out",
                "left": "out",
                "right": "out",
                "top": "out"
              },
              "random": true,
              "speed": 1
            },
            "number": {
              "density": {
                "enable": true
              },
              "value": 160
            },
            "opacity": {
              "random": {
                "enable": true
              },
              "value": {
                "min": 0,
                "max": 1
              },
              "animation": {
                "enable": true,
                "speed": 1,
                "minimumValue": 0
              }
            },
            "size": {
              "random": {
                "enable": true
              },
              "value": {
                "min": 1,
                "max": 3
              },
              "animation": {
                "speed": 4,
                "minimumValue": 0.3
              }
            }
          }
        }} /></div>
        <div className="shadow-lg">
          <TopNav />
        </div>
        <>

          <section className="flex flex-col justify-center h-screen shadow-2xl">

            <div className="flex flex-row justify-center space-x-8 p-16 w-3/4 mx-auto">
              <div className="md:flex md:items-center mb-6 flex-col ">
                <h1 className="text-white font-bold mb-16 p-4 text-4xl text-center" >
                  <span className="text-purple-500">Wut</span>'s the <span className="text-purple-500">Floor </span>price?
                </h1>
                <p className="text-gray-400 text-center text-xs">Enter your ENS address or use your ETH address below</p>
                <div className="md:w-2/3 ">
                  <form className="flex justify-center flex-col">
                    <input className="mt-16 focus:border-green-300 appearance-none border-4 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" placeholder="vb.eth or 0x..." id="inline-full-name" type="text" value={this.state.userAddress} onChange={this.handleChange} />
                    {this.state.wrongAddress && <Fade top><p className="text-red-500 text-center mt-8">Not an ETH address, try again</p></Fade>}
                    <button className="mt-16 p-1 motion-safe:hover:scale-110 text-white bg-primary w-32 rounded-xl mx-auto" type="submit" onClick={this.handleSumbit}>Go!</button>
                  </form>
                </div>
                <div className="mt-16 flex flex-col justify-center border-t-2 border-white pt-8 " >
                  {/* <h1 className="text-2xl text-white text-center mb-8"><span className="text-purple-500"> NFT Alpha</span></h1>
                  <p className="text-sm text-gray-200 text-center px-12">Get the latest floor prices, volume, and sale history on NFTs, discover latest trending p rojects being minted, and see transaction history and portfolio value of any wallet.</p> */}
                  <div classname="flex flex-row justify-center">
                    <button className="mt-8 p-3 motion-safe:hover:scale-110 flex text-white  mx-auto bg-bg-light bg-opacity-30 rounded-xl" type="submit" onClick={() => Router.push('/top')}>See Top Collections</button>
                    <button className="mt-8 p-3 motion-safe:hover:scale-110 flex text-white mx-auto bg-bg-light bg-opacity-30 rounded-xl" type="submit" onClick={() => Router.push('/hot')}>View Hot Collections</button>
                  </div>

                </div>
              </div>
            </div>

          </section>
          <section className="mt-16 p-16">
            <MainContent />

          </section>
          <section className="mt-16 p-16">
            <FAQ />
          </section>
          <section className="mt-16">
            <Footer />
          </section>
        </>
      </div >
    );
  }
}
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      time: new Date().toISOString(),
    },
  };
}
export default HomePage;
