import React, { useContext } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import rateLimit from 'axios-rate-limit';

import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import MainContent from "../components/MainContent";
import FAQ from '../components/FAQ';
import ENS, { getEnsAddress } from '@ensdomains/ensjs'
import detectEthereumProvider from '@metamask/detect-provider';
import axios from "axios";
import NFTAsset from "../components/NFTAsset"
const request = rateLimit(axios.create(), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })
import Web3 from "web3";
import TypeIt from "typeit-react";

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
      ethAddress: "",
      accountAssets: [],
      wrongAddress: false,
      total_eth_value: 0,
      loading: false,
      ethPrice: 4500
    };
    this.updatePredicate = this.updatePredicate.bind(this);
    this.myRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);

  }

  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);

    sleep(2000).then(() => {
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ isMobile: window.innerWidth <= 600 });
  }

  handleChange(event) {
    this.setState({userAddress: event.target.value});
  }

  async handleSumbit(e) {
    e.preventDefault();
    this.setState({accountAssets: []})
    if(this.state.userAddress.endsWith('.eth')){
      const provider = await detectEthereumProvider();
      const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })
      this.setState({ethAddress: await ens.name(this.state.userAddress).getAddress()});
    }
    else {
      this.setState({ethAddress: this.state.userAddress});
    }

    if(!Web3.utils.isAddress(this.state.ethAddress)) {
      this.setState({wrongAddress: true})
      return;
    }

    const data = await request.get(`https://api.opensea.io/api/v1/assets?limit=50&owner=${this.state.ethAddress}`, { crossdomain: true })
    if (!data) return

    let assets = data.data.assets;
    let total_eth_value = 0;
    const newAssets = []
    console.log(`There are ${assets.length} assets`)
    this.setState({loading: true})
    await Promise.all(assets.map(async(item, i) => {
      const collectionSlug = item.collection.slug
      const data = await request.get(`https://api.opensea.io/collection/${collectionSlug}`, { crossdomain: true })
      if(data.data.collection.stats.floor_price > 0.01){
        total_eth_value+=data.data.collection.stats.floor_price
        item.floor_price = data.data.collection.stats.floor_price
        if(item.image_url.length < 1){
          item.image_url = data.data.collection.image_url
        }
        newAssets.push(item)
      }
  }));
  this.setState({accountAssets: newAssets});
  this.setState({total_eth_value: total_eth_value})
  this.setState({loading: false})
  }


  render() {
    return (
      <div className="font-press-start">
          <div className="shadow-lg">
            <TopNav />
          </div>
          {this.state.accountAssets == 0 ? 
            <>

          <section className="flex flex-col h-screen justify-center items-center">
            {this.state.loading ? <p className="text-white p-8">Loading...</p> : 
            <div className="flex flex-row justify-center space-x-8 p-16">
            <div className="md:flex md:items-center mb-6 flex-col ">
                <h1 className="text-white font-bold mb-16 p-4 text-4xl text-center" >
                  <span className="text-purple-500">Wut</span>'s the <span className="text-purple-500">Floor </span>price?
                </h1>
                <p className="text-gray-400 text-center text-xs">Enter your Ethereum Adress below or use your ENS</p>
              <div className="md:w-2/3 ">
                <form className="flex justify-center flex-col">
                <input className="mt-16 focus:border-green-300 appearance-none border-4 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" placeholder="vb.eth or 0x..." id="inline-full-name" type="text" value={this.state.userAddress} onChange={this.handleChange}/>
                {this.state.wrongAddress && <Fade top><p className="text-red-500 text-center mt-8">Not an ETH address, try again</p></Fade>}
                <button className="mt-16 motion-safe:hover:scale-110 text-white bg-primary w-32 rounded-lg mx-auto" type="submit" onClick={this.handleSumbit}>Go!</button>
                </form>
              </div>
              
            </div>
          </div>}
            
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
            </> : <section>
          {this.state.accountAssets.length > 0 &&
            <>
            <div className="flex flex-col justify-center">
              <h1 className="text-purple-500 mt-16 text-center mb-16">{this.state.ethAddress.slice(0, 5) +
                "..." +
                this.state.ethAddress.slice(this.state.ethAddress.length - 4, this.state.ethAddress.length)}</h1>

            <div className="flex flew-row justify-evenly mb-8">
            <div className="flex flex-col justify-center text-center">
                <h1 className="text-green-400 text-lg">NFT Amount</h1>
                  <p className="text-white mt-4">{this.state.accountAssets.length}</p>
                </div>
                <div className="flex flex-col justify-center text-center">
                  <h1 className="text-green-400 text-lg">ETH Value</h1>
                  <p className="text-white mt-4">{this.state.total_eth_value}</p>

                </div>
                <div className="flex flex-col justify-center text-center">
                <h1 className="text-green-400 text-lg">USD Value</h1>
                  <p className="text-white mt-4">$ {(this.state.total_eth_value*this.state.ethPrice).toLocaleString("en-US")}</p>
                </div>
            </div>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center align-middle">
            {this.state.accountAssets.map((asset, i) => {
              return (
                <>
                  <NFTAsset key={i} asset={asset} />
                </>
              )
            })}
            </div>
            </>
          }
        </section>        
        }
        
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
