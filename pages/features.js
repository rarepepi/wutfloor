import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import axios from "axios";
import Web3 from "web3";
import TopNav from "../components/TopNav";
import Particles from "react-particles-js";
import Router from "next/router";
import Footer from "../components/Footer";
import MainContent from "../components/MainContent";
import FAQ from "../components/FAQ";
import Head from "next/head";
import Link from "next/link";
const getHotCollectionsData = async () => {
  const maxOffset = 200;
  const bundleSize = 20;
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
      // console.log(data.data.asset_events);
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

        <section className="-mt-6 p-16 ">
          <MainContent />
        </section>
        <section className="mt-16 p-16">
          <FAQ />
        </section>
        <section className="mt-16 bg-bg-light">
          <Footer />
        </section>
      </div>
    </div>
  );
};

export default hot;
