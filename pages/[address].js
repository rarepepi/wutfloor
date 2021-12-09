import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import axios from "axios";
import Web3 from "web3";
const request = rateLimit(axios.create(), { maxRequests: 5, perMilliseconds: 1000, maxRPS: 5 });
import ENS, { getEnsAddress } from '@ensdomains/ensjs';
import rateLimit from 'axios-rate-limit';
import NFTAsset from "../components/NFTAsset";
import TopNav from "../components/TopNav";
import Particles from "react-particles-js";

const getOpenSeaData = async (address) => {
    console.log(address);
    if (address.endsWith('.eth')) {
        const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/558cd10a65b84096b34dc0ab71eb6ef7");
        const ens = new ENS({ provider, ensAddress: getEnsAddress('1') });
        address = await ens.name(address).getAddress();
    }
    else {
        // this.setState({ ethAddress: this.state.userAddress });
    }

    if (!Web3.utils.isAddress(address)) {
        // this.setState({ wrongAddress: true });
        return;
    }

    const data = await request.get(`https://api.opensea.io/api/v1/assets?limit=50&owner=${address}`, { crossdomain: true });
    if (!data) return;

    let assets = data.data.assets;
    let total_eth_value = 0;
    const newAssets = [];
    console.log(`There are ${assets.length} assets`);
    await Promise.all(assets.map(async (item, i) => {
        const collectionSlug = item.collection.slug;
        const data = await request.get(`https://api.opensea.io/api/v1/collection/${collectionSlug}`, { crossdomain: true });
        if (data.data.collection.stats.floor_price > 0.01) {
            total_eth_value += data.data.collection.stats.floor_price;
            item.floor_price = data.data.collection.stats.floor_price;
            item.average_price = data.data.collection.stats.average_price;
            item.num_owners = data.data.collection.stats.num_owners;
            item.total_supply = data.data.collection.stats.total_supply;
            item.market_cap = data.data.collection.stats.market_cap;
            item.total_volume = data.data.collection.stats.total_volume;

            item.one_day_volume = data.data.collection.stats.one_day_volume;
            item.one_day_change = data.data.collection.stats.one_day_change;
            item.one_day_sales = data.data.collection.stats.one_day_sales;
            item.one_day_average_price = data.data.collection.stats.one_day_average_price;

            item.seven_day_volume = data.data.collection.stats.seven_day_volume;
            item.seven_day_change = data.data.collection.stats.seven_day_change;
            item.seven_day_sales = data.data.collection.stats.seven_day_sales;
            item.seven_day_average_price = data.data.collection.stats.seven_day_average_price;


            item.thirty_day_volume = data.data.collection.stats.thirty_day_volume;
            item.thirty_day_change = data.data.collection.stats.thirty_day_change;
            item.thirty_day_sales = data.data.collection.stats.thirty_day_sales;
            item.thirty_day_average_price = data.data.collection.stats.thirty_day_average_price;

            if (item.image_url.length < 1) {
                item.image_url = data.data.collection.image_url;
            }
            newAssets.push(item);
        }
    }));
    return { assets: newAssets, totalETHValue: total_eth_value, address: address };
};

const Account = (props) => {
    const router = useRouter();
    const queryAddress = router.query.address;
    const [ethPrice, setETHPrice] = useState(0);
    const [totalETHValue, setTotalETHValue] = useState(0);
    const [accountAssets, setAccountAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ethAddress, setETHAddress] = useState("");
    useEffect(async () => {
        if (router.asPath !== router.route) {
            const getData = async () => {
                const data = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
                setETHPrice(data.data.USD);
                const results = await getOpenSeaData(queryAddress);
                setAccountAssets(results.assets);
                setTotalETHValue(results.totalETHValue);
                setETHAddress(results.address);
                setLoading(false);
            };
            await getData();
        }
    }, [router]);

    return (
        <div className="font-press-start">
            {loading ? <div className="flex flex-col h-screen justify-center items-center"><>
                <Particles className="absolute -z-10 inset-0" id="tsparticles" options={{
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
                <p className="text-white p-8">Loading...</p> </></div> :
                <div>
                    <div className="shadow-lg">
                        <TopNav />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-purple-500 mt-4 text-center mb-8">{ethAddress.slice(0, 5) +
                            "..." +
                            ethAddress.slice(ethAddress.length - 4, ethAddress.length)}</h1>

                        <div className="flex flew-row flex-wrap justify-evenly p-8">
                            <div className="flex flex-col justify-center text-center p-8">
                                <h1 className="text-white text-lg">ETH Price</h1>
                                <p className=" text-green-400 mt-4">${ethPrice}</p>
                            </div>
                            <div className="flex flex-col justify-center text-center p-8">
                                <h1 className=" text-white text-lg">Total Assets</h1>
                                <p className="text-green-400 mt-4">{accountAssets.length}</p>
                            </div>
                            <div className="flex flex-col justify-center text-center p-8">
                                <h1 className=" text-white text-lg">Total Value</h1>
                                <div className="flex flex-row jusitfy-center text-center space-x-2">
                                    <p className="text-green-400 mt-4">Ξ{Math.round(totalETHValue * 100) / 100}</p>
                                    <p className="text-green-400 mt-4">(${(Math.round((totalETHValue * ethPrice) * 100) / 100).toLocaleString()})</p>
                                </div>

                            </div>
                            <div className="flex flex-col justify-center text-center p-8">
                                <h1 className="text-white text-lg">Total Cost</h1>
                                <p className="text-green-400 mt-4">Soon..</p>

                            </div>
                        </div>
                    </div>

                    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center align-middle px-16">
                        {accountAssets.map((asset, i) => {
                            return (
                                <>
                                    <NFTAsset key={i} asset={asset} ethPrice={ethPrice} />
                                </>
                            );
                        })}
                    </div>
                </div>
            }
        </div>

    );
};

export default Account;
