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
import Head from 'next/head';
const getHotCollectionsData = async () => {

    const maxOffset = 800;
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
        if (e.asset && ethers.utils.formatEther(e.total_price) > 0.01) {
            newEvents.push(e);
        }
    }));

    // const web3 = new Web3(provider);
    // const result = await web3.eth.getBalance(address);
    // const ethBalance = web3.utils.fromWei(result).slice(0, 6);
    // console.log(`There are ${collections.length} collections`);

    return { newEvents };
};

function findOcc(arr, key) {
    let arr2 = [];

    arr.forEach((x) => {

        // Checking if there is any object in arr2
        // which contains the key value
        if (arr2.some((val) => { return val[key] == x[key]; })) {

            // If yes! then increase the occurrence by 1
            arr2.forEach((k) => {
                if (k[key] === x[key]) {
                    k["ocurrance"]++;
                    k["amt"]++;

                }
            });

        } else {
            // If not! Then create a new object initialize 
            // it with the present iteration key's value and 
            // set the occurrence to 1
            let a = {};
            a[key] = x[key];
            a["name"] = x[key];
            a["ocurrance"] = 1;
            a["amt"] = 1;
            arr2.push(a);
        }
    });

    return arr2;
}

const feed = (props) => {
    const [ethPrice, setETHPrice] = useState(0);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [occurances, setOccurances] = useState([]);


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
            setEvents(results.newEvents.slice(0, 20));
            console.log(results.events);
            let occur = findOcc(results.newEvents, "collection_slug");
            occur = occur.sort((a, b) => (a.ocurrance > b.ocurrance) ? -1 : 1);
            setOccurances(occur.splice(0, 5));
            console.log({ occur });
            setLoading(false);
        };
        getData();

        const interval = setInterval(() => {
            getData();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-poppins">
            <Head>
                <title>
                    Feed
                </title>

            </Head>

            <div className="w-full">
                <div className="shadow-lg">
                    <TopNav />
                </div>
                <div className="flex flex-col justify-center p-4 my-8">
                    <h1 className="text-white font-bold mb-2 text-2xl text-center" >
                        Live Feed
                    </h1>
                    <p className="text-gray-300 text-sm text-center">v.0.1 (beta)</p>
                </div>
                {/* <div className="flex flex-row justify-evenly w-full bg-secondary">
                    <div classname="flex">
                        Name
                    </div>
                    <div classname="flex">
                        Floor
                    </div>
                    <div classname="flex">
                        Volume
                    </div>
                    <div classname="flex">
                        Activity
                    </div>
                </div> */}
                <div className="flex flex-row flex-wrap justify-between w-2/3 mx-auto">

                    {occurances.length > 0 && <div className="overflow-x-auto shadow-2xl flex w-full h-full">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart
                                width={500}
                                height={400}
                                data={occurances}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="amt" stackId="1" fill="#34d399" />;
                            </AreaChart>
                        </ResponsiveContainer>

                    </div>}

                </div>
                <div className="flex flex-col w-full align-middle m-8 overflow-x-auto">

                    {events.map((event, i) => {
                        return (
                            <>
                                <NFTEvent number={i} event={event} ethPrice={ethPrice} />
                            </>
                        );
                    })}
                </div>
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

export default feed;
