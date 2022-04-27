import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import axios from "axios";
import Web3 from "web3";
import TopNav from "../components/TopNav";
import Router from "next/router";
import Footer from "../components/Footer";
import NFTCollection from "../components/NFTCollection";
import NFTCollectionsTableHead from "../components/NFTCollectionsTableHead";
import Head from "next/head";
import Link from "next/link";
import BackgroundMagic from "../components/BackgroundMagic";
import _ from "lodash";

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
    "doodles-official",
  ];
  await Promise.all(
    collectionSlugs.map(async (slug, i) => {
      const { data } = await axios.get(
        `https://api.opensea.io/api/v1/collection/${slug}`
      );
      if (!data) return;
      collections.push({
        ...data.collection,
        avg_price_market_cap:
          data.collection.stats.total_supply *
          data.collection.stats.average_price,
      });
    })
  );

  return collections;
};

const hot = (props) => {
  const [ethPrice, setETHPrice] = useState(0);

  const [collections, setCollections] = useState([]);
  const [sortBy, setSortBy] = useState("stats.floor_price");
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const getData = async () => {
      const data = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
      );
      setETHPrice(data.data.USD);
      setLoading(true);

      const results = await getHotCollectionsData();
      const cols = _.sortBy(results, sortBy);
      if (sortBy !== "name") {
        setCollections(cols.reverse());
      } else {
        setCollections(cols);
      }
      setLoading(false);
    };
    getData();

    const interval = setInterval(() => {
      getData();
    }, 60000);

    return () => clearInterval(interval);
  }, [sortBy]);

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
                <NFTCollectionsTableHead onSortBy={setSortBy} />
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
