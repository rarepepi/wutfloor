import React, { useContext } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import rateLimit from "axios-rate-limit";
import { ethers } from "ethers";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import MainContent from "../components/MainContent";
import FAQ from "../components/FAQ";
import ENS, { getEnsAddress } from "@ensdomains/ensjs";
import detectEthereumProvider from "@metamask/detect-provider";
import axios from "axios";
import NFTAsset from "../components/NFTAsset";
import NFTCollection from "../components/NFTCollection";
import Link from "next/link";
const request = rateLimit(axios.create(), {
  maxRequests: 5,
  perMilliseconds: 1000,
  maxRPS: 5,
});
import Web3 from "web3";
import TypeIt from "typeit-react";
import Router from "next/router";
import Particles from "react-particles-js";
import Head from "next/head";
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
      collections: [],
      loading: true,
    };
    this.updatePredicate = this.updatePredicate.bind(this);
    this.myRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }

  async componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);

    const data = await axios.get(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
    );

    this.setState({ ethPrice: data.data.USD });
    const results = await this.getTopCollectionsData();
    this.setState({ collections: results });
  }
  getTopCollectionsData = async () => {
    let collections = [];
    const collectionSlugs = [
      "fidenza-by-tyler-hobbs",
      "autoglyphs",
      "twinflames",
      "cyberkongz",
      "boredapeyachtclub",
      "neo-tokyo-identities",
      "cool-cats-nft",
      "mutant-ape-yacht-club",
      "veefriends",
      "cryptoadz-by-gremplin",
      "hashmasks",
      "world-of-women-nft",
      "galacticapesgenesis",
      "sandbox",
      "clonex",
      "clonex-mintvial",
      "doodles-official",
      "punks-comic",
      "decentraland",
      "art-blocks",
      "lootproject",
    ];
    await Promise.all(
      collectionSlugs.map(async (slug, i) => {
        const data = await axios.get(
          `https://api.opensea.io/api/v1/collection/${slug}`
        );
        if (!data) return;
        // console.log(data.data.asset_events);
        collections.push(data.data.collection);
      })
    );
    // const web3 = new Web3(provider);
    // const result = await web3.eth.getBalance(address);
    // const ethBalance = web3.utils.fromWei(result).slice(0, 6);
    // console.log(`There are ${collections.length} collections`);

    return collections;
  };

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
    if (ethAddress.endsWith(".eth")) {
      const provider = new Web3.providers.HttpProvider(
        "https://mainnet.infura.io/v3/558cd10a65b84096b34dc0ab71eb6ef7"
      );
      const ens = new ENS({ provider, ensAddress: getEnsAddress("1") });
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
      <div className="relative bg-background w-full">
        <Head>
          <title>Wut Floor</title>
        </Head>

        <div className="shadow-lg">
          <TopNav />
        </div>
        <Fade>
          <div className="mx-auto px-16 mt-4">
            <div className="flex flex-col justify-center  p-4">
              <h1 className="text-white font-bold mb-1 text-2xl text-center">
                Top Collections
              </h1>
            </div>
            <div class="container">
              <table className="table-auto mx-auto w-full">
                <thead className="rounded-t-2xl bg-bg-light text-left  h-12">
                  <tr className="text-white">
                    <th classname="">Collection</th>
                    <th className="">Floor</th>
                    <th className="">Avg</th>
                    <th className="">1D Vol</th>
                    <th className="">1D Sales</th>
                    <th className="">Market Cap</th>
                    <th className="">1D Δ(+/-%)</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.collections.length > 0 &&
                    this.state.collections.map((collection, i) => {
                      return (
                        <Link href={"/c/" + collection.slug}>
                          <tr className="text-white hover:bg-bg-light cursor-pointer rounded-2xl">
                            <NFTCollection
                              collection={collection}
                              ethPrice={this.state.ethPrice}
                            />
                          </tr>
                        </Link>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </Fade>
        {/* <section className="flex flex-col justify-center mt-12 p8">
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-white xl:text-6xl text-4xl font-bold text-center mb-4">
              <span className="text-purple-500">Wut</span>'s the{" "}
              <span className="text-purple-500">Floor </span>price?
            </h1>
            <p className="text-gray-400 text-center text-xs">
              Enter your ENS address or use your ETH address below
            </p>
            <div className="">
              <form className="flex justify-center flex-col">
                <input
                  className="mt-16 focus:border-green-300 appearance-none border-4 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                  placeholder="vb.eth or 0x..."
                  id="inline-full-name"
                  type="text"
                  value={this.state.userAddress}
                  onChange={this.handleChange}
                />
                {this.state.wrongAddress && (
                  <Fade top>
                    <p className="text-red-500 text-center mt-8">
                      Not an ETH address, try again
                    </p>
                  </Fade>
                )}
                <button
                  className="mt-16 p-1 motion-safe:hover:scale-110 text-white bg-primary w-32 rounded-xl mx-auto"
                  type="submit"
                  onClick={this.handleSumbit}
                >
                  Go!
                </button>
              </form>
            </div>
          </div>
        </section> */}
        <section className="mt-16 bg-bg-light">
          <Footer />
        </section>
      </div>
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
