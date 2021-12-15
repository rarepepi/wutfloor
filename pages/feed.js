import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import axios from "axios";
import Web3 from "web3";
import TopNav from "../components/TopNav";
import Particles from "react-particles-js";
import Router from 'next/router';
import Footer from "../components/Footer";
import NFTEvent from "../components/NFTEvent";

const getHotCollectionsData = async () => {

    const maxOffset = 200;
    const bundleSize = 20;
    let events = [];
    for (let i = 0; i < maxOffset / bundleSize; i++) {
        let offset = bundleSize * i;
        const data = await axios.get(`https://api.opensea.io/api/v1/events?event_type=successful&only_opensea=false&offset=${offset}&limit=${bundleSize}`, { headers: { 'X-API-KEY': process.env.OS_KEY } });
        if (!data) return;
        // console.log(data.data.asset_events);
        events.push(...data.data.asset_events);
    }
    console.log(events);
    let newEvents = [];
    await Promise.all(events.map(async (e, i) => {
        newEvents.push(e);
    }));

    // const web3 = new Web3(provider);
    // const result = await web3.eth.getBalance(address);
    // const ethBalance = web3.utils.fromWei(result).slice(0, 6);
    // console.log(`There are ${collections.length} collections`);

    return { newEvents };
};

const feed = (props) => {
    const [ethPrice, setETHPrice] = useState(0);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(async () => {

        const getData = async () => {
            const data = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
            setETHPrice(data.data.USD);
            setLoading(true);

            const results = await getHotCollectionsData();
            if (!results) {
                Router.push('/');
                return;
            }
            if (results.address == "0x0000000000000000000000000000000000000000") {
                Router.push('/');
                console.log("no resolver / ens returned 0x000dead");
                return;
            }
            setEvents(results.newEvents);
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
                <p className="text-white p-8 text-center" >Loading...</p></></div> :
                <div className="w-full">
                    <div className="shadow-lg">
                        <TopNav />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-white font-bold my-16 p-4 text-4xl text-center" >
                            <span className="text-purple-500">Wut</span>'s the <span className="text-purple-500">Floor </span>price?
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 align-middle p-6 m-8">
                        {events.map((event, i) => {
                            return (
                                <>
                                    <NFTEvent number={i} event={event} ethPrice={ethPrice} />
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

export default feed;
