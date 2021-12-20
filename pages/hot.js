import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import axios from "axios";
import Web3 from "web3";
import TopNav from "../components/TopNav";
import Particles from "react-particles-js";
import Router from 'next/router';
import Footer from "../components/Footer";
import NFTCollection from "../components/NFTCollection";
import Head from 'next/head';
import Link from 'next/link';
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
        <div className="">
            <Head>
                <title>
                    Hot
                </title>
                <meta name="description" content="View the hottest NFTs ranked by volume, floor price, and more. Including additional statistics and alpha tools."/>
            </Head>
            <div className="w-full">
                <div className="shadow-lg">
                    <TopNav />
                </div>
                <Fade>
                    <div className="mx-auto px-16 mt-4">
                        <div className="flex flex-col justify-center  p-4">
                            <h1 className="text-white font-bold mb-1 text-2xl text-center" >
                                Hot Collections
                            </h1>
                            <p className="text-gray-300 text-sm text-center ml-2">v.0.1 (beta)</p>
                        </div>
                        <div class="container">

<table className="table-auto mx-auto w-full">
    <thead className="rounded-t-2xl bg-bg-light text-left  h-12">
        <tr className="text-white">
            <th classname="">
                Collection
            </th>
            <th className="">
                Floor
            </th>
            <th className="">
                Avg
            </th>
            <th className="">
                1D Vol
            </th>
            <th className="">
                1D Sales
            </th>
            <th className="">
                Market Cap
            </th>
            <th className="">
               1D Δ(+/-%)
            </th>

        </tr>
    </thead>
    <tbody>
        {collections.length > 0 && collections.map((collection, i) => {
            return (
                <Link href={'/c/' + collection.slug} >
                    <tr className="text-white hover:bg-bg-light rounded-2xl">

                        <NFTCollection collection={collection} ethPrice={ethPrice} />
                    </tr>
                </Link>

            );
        })}
    </tbody>

</table>
</div>
                    </div>
                </Fade >
                {loading && <div className="flex flex-col h-screen justify-center items-center"><>
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
                    <p className="text-white p-8 text-center" >Loading...</p></></div>}
                <Footer></Footer>
            </div>

        </div>

    );
};

export default hot;
