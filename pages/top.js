import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import axios from "axios";
import Web3 from "web3";
import TopNav from "../components/TopNav";
import Particles from "react-particles-js";
import Router from 'next/router';
import Footer from "../components/Footer";
import NFTEvent from "../components/NFTEvent";
import { ethers } from "ethers";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import randomColor from 'randomcolor';
import NFTCollection from "../components/NFTCollection";
import Head from 'next/head';
import Link from 'next/link';
const getTopCollectionsData = async () => {
    let collections = [];
    const collectionSlugs = [
        "fidenza-by-tyler-hobbs",
        "autoglyphs", "twinflames",
        "cyberkongz", "boredapeyachtclub",
        "neo-tokyo-identities", "cool-cats-nft",
        "mutant-ape-yacht-club", "veefriends",
        "cryptoadz-by-gremplin", "hashmasks",
        "world-of-women-nft",
        "galacticapesgenesis", "sandbox", "clonex", "clonex-mintvial", "doodles-official", "punks-comic", "decentraland", "art-blocks", "lootproject"];
    await Promise.all(collectionSlugs.map(async (slug, i) => {

        const data = await axios.get(`https://api.opensea.io/api/v1/collection/${slug}`);
        if (!data) return;
        // console.log(data.data.asset_events);
        collections.push(data.data.collection);

    }));
    // const web3 = new Web3(provider);
    // const result = await web3.eth.getBalance(address);
    // const ethBalance = web3.utils.fromWei(result).slice(0, 6);
    // console.log(`There are ${collections.length} collections`);

    return collections;
};

const top = (props) => {
    const [ethPrice, setETHPrice] = useState(0);

    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(async () => {

        const getData = async () => {
            const data = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
            setETHPrice(data.data.USD);
            setLoading(true);

            const results = await getTopCollectionsData();
            if (!results) {
                Router.push('/');
                return;
            }
            console.log(results);

            setCollections(results);
            console.log(collections);
            setLoading(false);

            console.log(collections);

        };
        await getData();

        const interval = setInterval(() => {
            getData();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="">
            <Head>
                <title>
                    Top
                </title>

            </Head>

            <div className="w-full">
                <div className="shadow-lg">
                    <TopNav />
                </div>
                <Fade>
                    <div className="mx-auto px-16 mt-4">
                        <div className="flex flex-col justify-center  p-4">
                            <h1 className="text-white font-bold mb-1 text-2xl text-center" >
                                Top Collections
                            </h1>
                            <p className="text-gray-300 text-sm text-center ml-2">v.0.1 (beta)</p>
                        </div>
                        <table className="table-auto overflow-x-scroll p-4 mx-auto">
                            {/* <div className="flex flex-row shadow-2xl"> */}
                            <thead className="rounded-t-2xl bg-bg-light  h-12">
                                <tr className="text-white p-8">
                                    <th classname="px-8">
                                        Collection
                                    </th>
                                    <th className="px-8">

                                        Floor
                                    </th>
                                    <th className="px-8">
                                        Avg
                                    </th>
                                    <th className="px-8">
                                        1D Vol
                                    </th>
                                    <th className="px-8">
                                        1D Sales
                                    </th>
                                    <th className="px-8">
                                        Market Cap
                                    </th>
                                    <th className="px-8">
                                       1D Δ(+/-%)
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {collections.length > 0 && collections.map((collection, i) => {
                                    return (
                                        <Link href={'/c/' + collection.slug} >
                                            <tr className="text-white hover:bg-bg-light rounded-2xl text-sm">

                                                <NFTCollection collection={collection} ethPrice={ethPrice} />
                                            </tr>
                                        </Link>

                                    );
                                })}
                            </tbody>

                        </table>
                    </div>
                </Fade >
                {
                    loading && <div className="flex flex-col h-screen justify-center items-center"><>
                        <Particles className="absolute -z-10 top-50 left-50 h-screen px-16" id="tsparticles" options={{
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
                        }} />
                        <p className="text-white p-8 text-center" >Loading...</p></></div>
                }
                <Footer></Footer>
            </div >

        </div >

    );
};

export default top;
