import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import axios from "axios";
import Web3 from "web3";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { ethers } from "ethers";
import ENS, { getEnsAddress } from "@ensdomains/ensjs";

import Head from "next/head";

const getHotCollectionsData = async () => {
  const maxOffset = 800;
  const bundleSize = 20;
  let events = [];
  for (let i = 0; i < maxOffset / bundleSize; i++) {
    let offset = bundleSize * i;
    const data = await axios.get(
      `https://api.opensea.io/api/v1/events?event_type=successful&only_opensea=false&offset=${offset}&limit=${bundleSize}`,
      { headers: { "X-API-KEY": process.env.OS_KEY } }
    );
    if (!data) return;
    // console.log(data.data.asset_events);
    events.push(...data.data.asset_events);
  }
  console.log(events);
  let newEvents = [];
  await Promise.all(
    events.map(async (e, i) => {
      if (e.asset && ethers.utils.formatEther(e.total_price) > 0.01) {
        newEvents.push(e);
      }
    })
  );

  // const web3 = new Web3(provider);
  // const result = await web3.eth.getBalance(address);
  // const ethBalance = web3.utils.fromWei(result).slice(0, 6);
  // console.log(`There are ${collections.length} collections`);

  return { newEvents };
};

const wallet = (props) => {
  const [ethPrice, setETHPrice] = useState(0);

  const [loading, setLoading] = useState(true);
  const [wrongAddress, setWrongAddress] = useState(false);

  const [userAddress, setUserAddress] = useState("");

  const handleChange = (event) => {
    setUserAddress(event.target.value);
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    let ethAddress = userAddress;
    if (ethAddress.endsWith(".eth")) {
      const provider = new Web3.providers.HttpProvider(
        "https://mainnet.infura.io/v3/558cd10a65b84096b34dc0ab71eb6ef7"
      );
      const ens = new ENS({ provider, ensAddress: getEnsAddress("1") });
      ethAddress = await ens.name(ethAddress).getAddress();
    }

    if (!Web3.utils.isAddress(ethAddress)) {
      setWrongAddress(true);
      return;
    }

    Router.push(`/a/${ethAddress}`);
  };

  useEffect(async () => {
    const getData = async () => {
      const data = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
      );
      setETHPrice(data.data.USD);
      setLoading(true);

      const results = await getHotCollectionsData();
      if (!results) {
        Router.push("/");
        return;
      }
      if (results.address == "0x0000000000000000000000000000000000000000") {
        Router.push("/");
        console.log("no resolver / ens returned 0x000dead");
        return;
      }
      setEvents(results.newEvents.slice(0, 20));
      console.log(results.events);
      let occur = findOcc(results.newEvents, "collection_slug");
      occur = occur.sort((a, b) => (a.ocurrance > b.ocurrance ? -1 : 1));
      setOccurances(occur.splice(0, 5));
      console.log({ occur });
      setLoading(false);
    };
    // getData();

    const interval = setInterval(() => {
      // getData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <Head>
        <title>Wallet</title>
      </Head>

      <div className="w-full">
        <div className="shadow-lg">
          <TopNav />
        </div>

        <section className="flex flex-col justify-center mt-12 p8">
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-white xl:text-6xl text-4xl font-bold text-center mb-4">
              <span className="text-purple-500">Wut</span>'s the{" "}
              <span className="text-purple-500">Floor </span>price?
            </h1>
            <p className="text-gray-400 text-center text-xs">
              Enter your ENS address or use your ETH address below
            </p>
            <div className="">
              <form className="flex justify-center flex-col">
                <input
                  className="mt-16 focus:border-green-300 appearance-none border-4 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                  placeholder="vb.eth or 0x..."
                  id="inline-full-name"
                  type="text"
                  value={userAddress}
                  onChange={handleChange}
                />
                {wrongAddress && (
                  <Fade top>
                    <p className="text-red-500 text-center mt-8">
                      Not an ETH address, try again
                    </p>
                  </Fade>
                )}
                <button
                  className="mt-16 p-1 motion-safe:hover:scale-110 text-white bg-primary w-32 rounded-xl mx-auto"
                  type="submit"
                  onClick={handleSumbit}
                >
                  Go!
                </button>
              </form>
            </div>
          </div>
        </section>

        <Footer></Footer>
      </div>
    </div>
  );
};

export default wallet;
