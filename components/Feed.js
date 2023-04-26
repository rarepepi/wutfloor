import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import NFTEvent from "./NFTEvent";
import { ethers } from "ethers";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BackgroundMagic from "./BackgroundMagic";
const getHotCollectionsData = async () => {
  const maxOffset = 100;
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

  return { newEvents };
};

function findOcc(arr, key) {
  let arr2 = [];

  arr.forEach((x) => {
    // Checking if there is any object in arr2
    // which contains the key value
    if (
      arr2.some((val) => {
        return val[key] == x[key];
      })
    ) {
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

const Feed = (props) => {
  const [ethPrice, setETHPrice] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [occurances, setOccurances] = useState([]);

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
      return results;
    };
    return getData();

    const interval = setInterval(() => {
      getData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <div className="w-full">
        <div className="flex flex-col justify-center p-4 my-8">
          <h1 className="text-white font-bold mb-2 text-2xl text-center">
            Live Feed
          </h1>
          <p className="text-gray-300 text-sm text-center">v.0.1 (beta)</p>
        </div>
        <div className="flex flex-row flex-wrap justify-between w-2/3 mx-auto">
          {occurances.length > 0 && (
            <div className="overflow-x-auto shadow-2xl flex w-full h-full">
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
                  <Area
                    type="monotone"
                    dataKey="amt"
                    stackId="1"
                    fill="#34d399"
                  />
                  ;
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
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
        {loading && (
          <div className="flex flex-col h-screen justify-center items-center">
            <>
              <BackgroundMagic />
              <p className="text-white p-8 text-center">Loading...</p>
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
