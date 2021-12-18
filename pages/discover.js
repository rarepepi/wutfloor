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

const discover = (props) => {
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
        <div className="font-press-start">


            <div className="w-full">
                <div className="shadow-lg">
                    <TopNav />
                </div>
                <div className="flex flex-col justify-center p-4 my-8">
                    <h1 className="text-white font-bold mb-2 text-2xl text-center" >
                        Discover Mints
                    </h1>
                    <p className="text-gray-300 text-sm text-center">v. coming soon</p>
                </div>

                <Footer></Footer>
            </div>

        </div>

    );
};

export default discover;
