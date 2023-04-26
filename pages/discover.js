import axios from "axios";
import TopNav from "../components/TopNav";

import Footer from "../components/Footer";

import { ethers } from "ethers";
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

  return { newEvents };
};

const discover = (props) => {
  return (
    <div className="">
      <Head>
        <title>Discover</title>
      </Head>

      <div className="w-full">
        <div className="shadow-lg">
          <TopNav />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-white font-bold mb-1 my-8 p-4 text-2xl text-center">
            Discover Mints
          </h1>
          <p className="text-gray-300 text-sm text-center">
            coming soon follow our{" "}
            <a
              className="text-green-300"
              href="https://twitter.com/wutfloorxyz"
            >
              twitter
            </a>{" "}
            for updates
          </p>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default discover;
