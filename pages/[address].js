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
import Router from 'next/router';
import Footer from "../components/Footer";


const getOpenSeaData = async (address) => {
    let provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/558cd10a65b84096b34dc0ab71eb6ef7");;
    console.log(address);
    if (address.endsWith('.eth')) {
        const ens = new ENS({ provider, ensAddress: getEnsAddress('1') });
        address = await ens.name(address).getAddress();
    }
    else {
        // this.setState({ ethAddress: this.state.userAddress });
    }

    if (!Web3.utils.isAddress(address)) {
        provider;
        // this.setState({ wrongAddress: true });
        return;
    }

    const data = await request.get(`https://api.opensea.io/api/v1/assets?limit=50&owner=${address}`, { crossdomain: true });
    if (!data) return;

    let assets = data.data.assets;
    let total_eth_value = 0;
    let total_eth_7_avg_value = 0;
    const web3 = new Web3(provider);
    const result = await web3.eth.getBalance(address);
    const ethBalance = web3.utils.fromWei(result).slice(0, 6);
    const newAssets = [];
    console.log(`There are ${assets.length} assets`);
    await Promise.all(assets.map(async (item, i) => {
        const collectionSlug = item.collection.slug;
        const data = await request.get(`https://api.opensea.io/api/v1/collection/${collectionSlug}`, { crossdomain: true });
        if (data.data.collection.stats.floor_price > 0.01) {
            total_eth_value += data.data.collection.stats.floor_price;
            total_eth_7_avg_value += data.data.collection.stats.seven_day_average_price;

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

            item.created_date = data.data.collection.created_date;

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
    return { assets: newAssets, totalETHValue: total_eth_value, totalETHValue7Day: total_eth_7_avg_value, address: address, ethBalance: ethBalance };
};

const Account = (props) => {
    const router = useRouter();
    const queryAddress = router.query.address;
    const [ethPrice, setETHPrice] = useState(0);
    const [totalETHValue, setTotalETHValue] = useState(0);
    const [totalETHValue7Day, setTotalETHValue7Day] = useState(0);
    const [ethBalance, setETHBalance] = useState(0);

    const [accountAssets, setAccountAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ethAddress, setETHAddress] = useState("");
    useEffect(async () => {
        if (router.asPath !== router.route) {
            const getData = async () => {
                const data = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
                setETHPrice(data.data.USD);
                const results = await getOpenSeaData(queryAddress);
                if (!results) {
                    Router.push('/');
                    return;
                }
                if (results.address == "0x0000000000000000000000000000000000000000") {
                    Router.push('/');
                    console.log("no resolver / ens returned 0x000dead");
                    return;
                }
                setAccountAssets(results.assets);
                setTotalETHValue(results.totalETHValue);
                setTotalETHValue7Day(results.totalETHValue7Day);
                setETHAddress(results.address);
                setETHBalance(results.ethBalance);
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
                        <h1 className="text-white font-bold my-16 p-4 text-4xl text-center" >
                            <span className="text-purple-500">Wut</span>'s the <span className="text-purple-500">Floor </span>price?
                        </h1>
                        <div className="shadow-2xl w-64 mx-auto items-center p-4 ">
                            <h1 className="text-white text-2xl text-center block mt-2">Account</h1>
                            {queryAddress.endsWith('.eth') && <h1 className="text-purple-500 text-center block mt-2">{queryAddress}</h1>}

                            <h1 className="text-gray-300 text-center mt-2">{ethAddress.slice(0, 5) +
                                "..." +
                                ethAddress.slice(ethAddress.length - 4, ethAddress.length)}</h1>

                        </div>
                        <div className="">
                            <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 p-8">
                                <div className="flex flex-col justify-center text-center lg:p-10 p-8 shadow-2xl">
                                    <h1 className="text-white text-lg pt-4">ETH Balance</h1>
                                    <div className="flex flex-col jusitfy-center text-center space-x-2">
                                        <p className="text-green-400 mt-4"><img src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" className="h-6 w-6 inline mr-2" />{ethBalance}</p>
                                        <p className="text-green-400 mt-4">(${(Math.round((ethBalance * ethPrice) * 100) / 100).toLocaleString()})</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center text-center lg:p-10 p-8 shadow-2xl">
                                    <h1 className=" text-white text-lg pt-4">Floor Value</h1>
                                    <div className="flex flex-col jusitfy-center text-center space-x-2">
                                        <p className="text-green-400 mt-4"><img src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" className="h-6 w-6 inline mr-2" />{Math.round(totalETHValue * 100) / 100}</p>
                                        <p className="text-green-400 mt-4">(${(Math.round((totalETHValue * ethPrice) * 100) / 100).toLocaleString()})</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center mt-4 text-center lg:p-10 p-8 shadow-2xl items-center">
                                    <h1 className="text-white text-lg pt-4">ETH Price</h1>
                                    <p className=" text-green-400 mt-4">${ethPrice}</p>
                                </div>

                                <div className="flex flex-col justify-center text-center lg:p-10 p-8 shadow-2xl">
                                    <h1 className="text-white text-lg pt-4">7 Day Avg</h1>
                                    <div className="flex flex-col jusitfy-center text-center space-x-2">
                                        <p className="text-green-400 mt-4"><img src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" className="h-6 w-6 inline mr-2" />{Math.round(totalETHValue7Day * 100) / 100}</p>
                                        <p className="text-green-400 mt-4">(${(Math.round((totalETHValue7Day * ethPrice) * 100) / 100).toLocaleString()})</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center text-center lg:p-10 p-8 shadow-2xl items-center">
                                    <h1 className=" text-white text-lg pt-4">Total Assets</h1>
                                    <p className="text-green-400 mt-4">{accountAssets.length}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 shadow-2xl sm:grid-cols-2 grid-cols-1 align-middle p-6 m-8">
                        {accountAssets.map((asset, i) => {
                            return (
                                <>
                                    <NFTAsset number={i} asset={asset} ethPrice={ethPrice} />
                                </>
                            );
                        })}
                    </div>
                    <Footer></Footer>
                </div>
            }
        </div>

    );
};

export default Account;
