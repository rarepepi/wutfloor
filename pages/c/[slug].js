import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import axios from "axios";
import Web3 from "web3";
const request = rateLimit(axios.create(), {
  maxRequests: 5,
  perMilliseconds: 1000,
  maxRPS: 5,
});
import ENS, { getEnsAddress } from "@ensdomains/ensjs";
import rateLimit from "axios-rate-limit";
import TopNav from "../../components/TopNav";
import Router from "next/router";
import Footer from "../../components/Footer";
import { CollectionIcon } from "@heroicons/react/outline";
import Head from "next/head";
import BackgroundMagic from "../../components/BackgroundMagic";
const getOpenSeaData = async (
  collectionSlug,
  setCollection,
  setCurrentlyLoadingAssetNumber
) => {
  let provider = new Web3.providers.HttpProvider(
    "https://mainnet.infura.io/v3/558cd10a65b84096b34dc0ab71eb6ef7"
  );
  console.log(collectionSlug);

  const data = await request.get(
    `https://api.opensea.io/api/v1/collection/${collectionSlug}`,
    { crossdomain: true }
  );
  // setAssetAmount(data.data.assets.length);
  if (!data) return;

  let collection = data.data.collection;
  setCollection(collection);
  const web3 = new Web3(provider);
  return collection;
  // const result = await web3.eth.getBalance(address);
  // const ethBalance = web3.utils.fromWei(result).slice(0, 6);
  // return { assets: newAssets, totalETHValue: total_eth_value, totalETHValue7Day: total_eth_7_avg_value, address: address, ethBalance: ethBalance };
};

const Collection = (props) => {
  const router = useRouter();
  const queryCollectionSlug = router.query.slug;
  const [ethPrice, setETHPrice] = useState(0);
  const [ethBalance, setETHBalance] = useState(0);
  const [assetAmount, setAssetAmount] = useState(0);
  const [currentlyLoadingAssetNumber, setCurrentlyLoadingAssetNumber] =
    useState(0);
  const [collection, setCollection] = useState({});
  const [accountAssets, setAccountAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ethAddress, setETHAddress] = useState("");
  useEffect(async () => {
    if (router.asPath !== router.route) {
      const getData = async () => {
        const data = await axios.get(
          "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
        );
        setETHPrice(data.data.USD);
        const results = await getOpenSeaData(
          queryCollectionSlug,
          setCollection,
          setCurrentlyLoadingAssetNumber
        );
        if (!results) {
          Router.push("/");
          return;
        }
        // setAccountAssets(results.assets);
        // setTotalETHValue(results.totalETHValue);
        // setTotalETHValue7Day(results.totalETHValue7Day);
        // setETHAddress(results.address);
        // setETHBalance(results.ethBalance);
        setLoading(false);
      };
      await getData();
    }
  }, [router]);

  return (
    <div className=" ">
      <Head>
        <title>{collection.name}</title>
      </Head>
      {loading ? (
        <div className="flex flex-col h-screen justify-center items-center">
          <>
            <BackgroundMagic />
            <p className="text-white p-8">Loading...</p>{" "}
            <p className="text-xs text-white">
              {currentlyLoadingAssetNumber}/{assetAmount}
            </p>
          </>
        </div>
      ) : (
        <div>
          <div className="shadow-lg">
            <TopNav />
          </div>
          <div
            className="bg-center h-48"
            style={{ backgroundImage: `url(${collection.banner_image_url})` }}
          ></div>
          <div className="flex flex-col justify-center">
            <img
              className="rounded-full mx-auto -m-16 h-32"
              src={collection.image_url}
            ></img>
            <h1 className="text-white font-bold  text-xl mt-16 p-4 mb-1 text-center">
              {collection.name}'s
            </h1>
            <p className="text-white my-4 text-center ">
              Floor: Ξ{" "}
              <span className="text-green-300">
                {Math.round(collection.stats.floor_price * 100) / 100}
              </span>
            </p>
            <div className="flex flex-row space-x-8 justify-center text-purple-300 ">
              <a
                target="_blank"
                className="hover:cursor"
                href={collection.discord_url}
              >
                <i className="fab fa-discord text-xl mr-2" />
              </a>
              <a
                target="_blank"
                className="hover:cursor"
                href={collection.external_url}
              >
                <i className="fas fa-external-link-alt text-xl mr-2" />
              </a>

              <a
                target="_blank"
                className="hover:cursor"
                href={"https://twitter.com/" + collection.twitter_username}
              >
                <i className="fab fa-twitter text-xl mr-2" />
              </a>
            </div>

            <div className="">
              <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 p-8">
                <div className="flex flex-col justify-center text-center lg:p-8 p-4 shadow-2xl">
                  <h1 className="text-white pt-4">One Day</h1>
                  <div className="flex flex-col jusitfy-center text-center space-x-2">
                    <p className="text-white mt-4 ">
                      Vol: Ξ{" "}
                      <span className="text-green-300">
                        {Math.round(collection.stats.one_day_volume * 100) /
                          100}
                      </span>
                    </p>
                    <p className="text-white mt-4 ">
                      Δ(+/-%):{" "}
                      <span className="text-green-300">
                        {Math.round(collection.stats.one_day_change * 100) /
                          100}
                        %
                      </span>
                    </p>
                    <p className="text-white mt-4 ">
                      Txns:{" "}
                      <span className="text-green-300">
                        {" "}
                        {Math.round(collection.stats.one_day_sales * 100) / 100}
                      </span>
                    </p>
                    <p className="text-white mt-4 ">
                      Avg:{" "}
                      <span className="text-green-300">
                        {" "}
                        {Math.round(
                          collection.stats.one_day_average_price * 100
                        ) / 100}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center text-center lg:p-8 p-4 shadow-2xl">
                  <h1 className="text-white pt-4">7 Day</h1>
                  <div className="flex flex-col jusitfy-center text-center space-x-2">
                    <p className="text-white mt-4 ">
                      Vol: Ξ{" "}
                      <span className="text-green-300">
                        {Math.round(collection.stats.seven_day_volume * 100) /
                          100}
                      </span>
                    </p>
                    <p className="text-white mt-4 ">
                      Δ(+/-%):{" "}
                      <span className="text-green-300">
                        {Math.round(collection.stats.seven_day_change * 100) /
                          100}
                        %
                      </span>
                    </p>
                    <p className="text-white mt-4 ">
                      Txns:{" "}
                      <span className="text-green-300">
                        {" "}
                        {Math.round(collection.stats.seven_day_sales * 100) /
                          100}
                      </span>
                    </p>
                    <p className="text-white mt-4 ">
                      Avg:{" "}
                      <span className="text-green-300">
                        {" "}
                        Ξ{" "}
                        {Math.round(
                          collection.stats.seven_day_average_price * 100
                        ) / 100}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center text-center lg:p-8 p-4 shadow-2xl">
                  <h1 className="text-white pt-4">30 Day</h1>
                  <div className="flex flex-col jusitfy-center text-center space-x-2">
                    <p className="text-white mt-4 ">
                      Vol: Ξ{" "}
                      <span className="text-green-300">
                        {Math.round(collection.stats.thirty_day_volume * 100) /
                          100}
                      </span>
                    </p>
                    <p className="text-white mt-4 ">
                      Δ(+/-%):{" "}
                      <span className="text-green-300">
                        {Math.round(collection.stats.thirty_day_change * 100) /
                          100}
                        %
                      </span>
                    </p>
                    <p className="text-white mt-4 ">
                      Txns:{" "}
                      <span className="text-green-300">
                        {" "}
                        {Math.round(collection.stats.thirty_day_sales * 100) /
                          100}
                      </span>
                    </p>
                    <p className="text-white mt-4 ">
                      Avg:{" "}
                      <span className="text-green-300">
                        {" "}
                        Ξ{" "}
                        {Math.round(
                          collection.stats.thirty_day_average_price * 100
                        ) / 100}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center text-center lg:p-8 p-4 shadow-2xl">
                  <h1 className="text-white pt-4">Total Stats</h1>
                  <div className="flex flex-col jusitfy-center text-center space-x-2">
                    <p className="text-white mt-4 ">
                      MKT Cap: Ξ{" "}
                      <span className="text-green-300">
                        {Math.round(collection.stats.total_volume * 100) / 100}
                      </span>
                    </p>
                    <p className="text-white mt-4 ">
                      Supply:{" "}
                      <span className="text-green-300">
                        {" "}
                        {Math.round(collection.stats.total_supply * 100) / 100}
                      </span>
                    </p>
                    <p className="text-white mt-4 ">
                      Txns:{" "}
                      <span className="text-green-300">
                        {" "}
                        {Math.round(collection.stats.total_sales * 100) / 100}
                      </span>
                    </p>
                    <p className="text-white mt-4 ">
                      Owners:{" "}
                      <span className="text-green-300">
                        {" "}
                        {Math.round(collection.stats.num_owners * 100) / 100}
                      </span>
                    </p>
                    <p className="text-white mt-4">
                      Ratio:{" "}
                      <span className="text-green-300">
                        {Math.round(
                          (collection.stats.num_owners /
                            collection.stats.total_supply) *
                            100
                        ) / 100}
                        %
                      </span>
                    </p>
                    <p className="text-white mt-4 ">
                      Hisorial Avg: Ξ{" "}
                      <span className="text-green-300">
                        {" "}
                        {Math.round(collection.stats.average_price * 100) / 100}
                      </span>
                    </p>
                    <p className="text-white mt-4 ">
                      MKT Cap Avg: Ξ{" "}
                      <span className="text-green-300">
                        {" "}
                        {Math.round(collection.stats.market_cap * 100) / 100}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
};

export default Collection;
