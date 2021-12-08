import React, { useContext } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import MainContent from "../components/MainContent";
import FAQ from '../components/FAQ';
import ENS, { getEnsAddress } from '@ensdomains/ensjs'
import detectEthereumProvider from '@metamask/detect-provider';
import axios from "axios";
import NFTAsset from "../components/NFTAsset"
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
      accountAssets: []
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

    if(this.state.userAddress.includes('.eth')){
      const provider = await detectEthereumProvider();
      const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })
      this.setState({ethAddress: await ens.name(this.state.userAddress).getAddress()});
    }
    else {
      this.setState({ethAddress: this.state.userAddress});
    }


    const data = await axios.get(`https://api.opensea.io/api/v1/assets?limit=50&owner=${this.state.ethAddress}`)
    if (!data) return

    let assets = data.data.assets
    
    assets.map(async (item, i) => {
      const collectionSlug = item.collection.slug
      if(item.num_sales > 0) {
        const data = await axios.get(`https://api.opensea.io/collection/${collectionSlug}`)
        console.log(data.data.collection.stats.floor_price)
        item.floor_price = data.data.collection.stats.floor_price
      }
      else {
        item.floor_price = 0
      }
    })
    this.setState({accountAssets: assets});

  }


  render() {
    return (
      <div className="font-press-start">
        <Fade>
          <div className="shadow-2xl">
            <TopNav />
          </div>
          <section className="flex flex-col h-screen justify-center items-center">
            {/* {this.state.accountAssets == 0 && } */}
            <div className="flex flex-row justify-center space-x-8 p-16">
              <div className="md:flex md:items-center mb-6 flex-col ">
                  <h1 className="text-white font-bold mb-16 pr-4 text-4xl text-center" >
                    <span className="text-green-200">Wut</span>'s the <span className="text-green-200">Floor </span>price?
                  </h1>
                  <p className="text-gray-400 text-center text-xs">Enter your Ethereum Adress below or use your ENS</p>

                <div className="md:w-2/3 ">
                  <form className="flex justify-center flex-col">
                  <input className="mt-16 bg-gray-800 appearance-none border-4 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" placeholder="vb.eth or 0x..." id="inline-full-name" type="text" value={this.state.userAddress} onChange={this.handleChange}/>
                  <button className="mt-16 text-white bg-secondary w-32 rounded-lg mx-auto" type="submit" onClick={this.handleSumbit}>Go!</button>
                  </form>
                </div>
                
              </div>
            </div>
          </section>
          <>
          {this.state.accountAssets.length > 0 &&
                <>
                <div className="flex justify-center">
                    <h1 className="text-red-300 mt-16">Address: {this.state.ethAddress}</h1>
                  </div>
                  {this.state.accountAssets.map((asset, i) => {
                    return (
                      
                      <NFTAsset asset={asset} />
                   )
                  })}
                  </>
                }
                </>
        </Fade>
        <section className="mt-16 shadow-2xl p-16">
          <MainContent />
        </section>        
          <section className="mt-16 shadow-2xl p-16">
            <FAQ />
          </section>
        <section className="mt-16 shadow-2xl">
          <Footer />
        </section>
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
