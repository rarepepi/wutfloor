import React, { useContext } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import rateLimit from "axios-rate-limit";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import axios from "axios";
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
      collections: [],
      loading: true,
    };
    this.updatePredicate = this.updatePredicate.bind(this);
    this.myRef = React.createRef();
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
      "cyberkongz",
      "boredapeyachtclub",
      "cool-cats-nft",
      "cryptoadz-by-gremplin",
      "doodles-official",

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
          <div className="mx-auto sm:px-16 mt-4">
            <div className="flex flex-col justify-center  p-4">
              <h1 className="text-white font-bold mb-1 text-2xl text-center">
                Top 5 Collections
              </h1>
            </div>
            <div class="flex sm:justify-center">
              <table className="table-auto mx-auto w-full overflow-x-scroll">
                <thead className="rounded-t-2xl bg-bg-light text-left  h-12">
                  <tr className="text-white">
                    <th className="p-6">Collection</th>
                    <th className="p-6">Floor</th>
                    <th className="p-6">Avg</th>
                    <th className="p-6">1D Vol</th>
                    <th className="p-6">1D Sales</th>
                    <th className="p-6">Market Cap</th>
                    <th className="p-6">1D Δ(+/-%)</th>
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
