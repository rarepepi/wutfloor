import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import axios from "axios";
import Web3 from "web3";
import TopNav from "../components/TopNav";
import Particles from "react-particles-js";
import Router from 'next/router';
import Footer from "../components/Footer";
import NFTCollection from "../components/NFTCollection";

const getHotCollectionsData = async () => {

    const maxOffset = 200;
    const bundleSize = 20;
    let collections = [];
    const collectionSlugs = ["fidenza-by-tyler-hobbs", "autoglyphs", "twinflames", "cyberkongz", "boredapeyachtclub", "neo-tokyo-identities", "cool-cats-nft", "mutant-ape-yacht-club", "veefriends", "galacticapesgenesis"];
    await Promise.all(collectionSlugs.map(async (slug, i) => {

        const { data } = await axios.get(`https://api.opensea.io/api/v1/collection/${slug}`);
        if (!data) return;
        // console.log(data.data.asset_events);
        collections.push(data.collection);

    }));
    console.log(collections);

    return collections;
};

const hot = (props) => {
    const [ethPrice, setETHPrice] = useState(0);

    const [collections, setCollection] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(async () => {

        const getData = async () => {
            const data = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
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
        <div className="font-press-start">
            <div className="w-full">
                <div className="shadow-lg">
                    <TopNav />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-white font-bold my-8 p-4 text-2xl text-center" >
                        <span className="text-purple-500">Wut</span>'s the <span className="text-purple-500">Floor </span>price?
                    </h1>
                </div>
                {loading ? <p className="text-center mx-auto text-white">loading</p> :
                    <div className="grid grid-cols-1 align-middle p-6 m-8">
                        {collections.map((c, i) => {
                            return (
                                <>
                                    <NFTCollection number={i} collection={c} ethPrice={ethPrice} />
                                </>
                            );
                        })}
                    </div>
                }
                <Footer></Footer>
            </div>

        </div>

    );
};

export default hot;
