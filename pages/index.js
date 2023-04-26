import rateLimit from "axios-rate-limit";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import axios from "axios";

import BackgroundMagic from "../components/BackgroundMagic";
import Web3 from "web3";
import ENS, { getEnsAddress } from "@ensdomains/ensjs";
const request = rateLimit(axios.create(), {
  maxRequests: 5,
  perMilliseconds: 1000,
  maxRPS: 5,
});
import Router from "next/router";
import Head from "next/head";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const HomePage = (props) => {
  const [state, setState] = useState({
    isMobile: false,
    collections: [],
    loading: true,
    wrongAddress: false,
    userAddress: "",
  });
  const router = useRouter();
  const myRef = useRef();

  const handleChange = async (event) => {
    setState({
      ...state,
      userAddress: event.target.value,
      wrongAddress: false,
    });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    let ethAddress = state.userAddress;
    if (ethAddress.endsWith(".eth")) {
      const provider = new Web3.providers.HttpProvider(
        "https://mainnet.infura.io/v3/558cd10a65b84096b34dc0ab71eb6ef7"
      );
      const ens = new ENS({ provider, ensAddress: getEnsAddress("1") });
      ethAddress = await ens.name(ethAddress).getAddress();
    }

    if (!Web3.utils.isAddress(ethAddress)) {
      setState({ ...state, wrongAddress: true });
      return;
    }

    const acct = ethAddress.endsWith(".eth") ? ethAddress : state.userAddress;

    router.push(`/${acct}`);
  };

  const updatePredicate = () => {
    setState({ ...state, isMobile: window.innerWidth <= 600 });
  };

  useEffect(() => {
    updatePredicate();
    window.addEventListener("resize", updatePredicate);

    // const data = await axios.get(
    //   "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
    // );

    // setState({ ...state, ethPrice: data.data.USD });
    // const results = await getTopCollectionsData();
    // setState({ ...state, collections: results });

    return () => {
      window.removeEventListener("resize", updatePredicate);
    };
  }, []);

  const getTopCollectionsData = async () => {
    // ...
  };
  return (
    <div className="bg-background">
      <Head>
        <title>Wut Floor</title>
      </Head>

      <div className="shadow-lg z-10">
        <TopNav dontShow={true} />
      </div>

      <div className="h-screen flex flex-col">
        <h1 className="text-white font-bold text-4xl text-center mt-16">
          Enter wallet address
        </h1>
        <form onSubmit={handleSumbit}>
          <div className="flex justify-center mt-20">
            <input
              value={state.userAddress}
              onChange={handleChange}
              placeholder="0x0000 or foobar.eth"
              className="address-search bg-background ring-green-400   rounded-2xl ring-4 p-6 text-green-300"
            ></input>
          </div>
          <h1 className="text-white font-bold text-2xl text-center mt-16">
            To see portfolio
          </h1>
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={handleSumbit}
              className="text-center rounded-2xl  py-2 px-6 mt-20 bg-primary "
              href="/"
            >
              Go!
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .address-search {
          outline: none;
        }
      `}</style>

      <section className="mt-16 bg-bg-light">
        <Footer />
      </section>
      <BackgroundMagic />
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      time: new Date().toISOString(),
    },
  };
}
export default HomePage;
