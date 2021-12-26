import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import axios from "axios";
import Web3 from "web3";
import TopNav from "../components/TopNav";
import Particles from "react-particles-js";
import Router from "next/router";
import Footer from "../components/Footer";
import NFTCollection from "../components/NFTCollection";
import Head from "next/head";
import Link from "next/link";
import BackgroundMagic from "../components/BackgroundMagic";
const getHotCollectionsData = async () => {
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
    "galacticapesgenesis",
  ];
  await Promise.all(
    collectionSlugs.map(async (slug, i) => {
      const { data } = await axios.get(
        `https://api.opensea.io/api/v1/collection/${slug}`
      );
      if (!data) return;
      collections.push(data.collection);
    })
  );
  console.log(collections);

  return collections;
};

const hot = (props) => {
  const [ethPrice, setETHPrice] = useState(0);

  const [collections, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const getData = async () => {
      const data = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
      );
      setETHPrice(data.data.USD);
      setLoading(true);

      const results = await getHotCollectionsData();
      setCollection(results);
      setLoading(false);
    };
    getData();

    const interval = setInterval(() => {
      getData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <Head>
        <title>Hot</title>
        <meta
          name="description"
          content="View the hottest NFTs ranked by volume, floor price, and more. Including additional statistics and alpha tools."
        />
      </Head>
      <div className="w-full">
        <div className="shadow-lg">
          <TopNav />
        </div>
        <Fade>
          <div className="mx-auto px-16 mt-4">
            <div className="flex flex-col justify-center  p-4">
              <h1 className="text-white font-bold mb-1 text-2xl text-center">
                Hot Collections
              </h1>
              <p className="text-gray-300 text-sm text-center ml-2">
                v.0.1 (beta)
              </p>
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
                  {collections.length > 0 &&
                    collections.map((collection, i) => {
                      return (
                        <Link href={"/c/" + collection.slug}>
                          <tr className="text-white hover:bg-bg-light cursor-pointer rounded-2xl">
                            <NFTCollection
                              collection={collection}
                              ethPrice={ethPrice}
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
        {loading && (
          <div className="flex flex-col h-screen justify-center items-center">
            <>
              <BackgroundMagic />
              <p className="text-white p-8 text-center">Loading...</p>
            </>
          </div>
        )}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default hot;
