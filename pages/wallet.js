import React, { useEffect, useState } from "react";

import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

import Head from "next/head";

const wallet = (props) => {
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
            <div className=""></div>
          </div>
        </section>

        <Footer></Footer>
      </div>
    </div>
  );
};

export default wallet;
