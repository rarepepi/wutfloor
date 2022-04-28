import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import MainContent from "../components/MainContent";
import FAQ from "../components/FAQ";
import Head from "next/head";

const features = (props) => {
  return (
    <div className="">
      <Fade>
        <Head>
          <title>Wutfloor</title>
          <meta
            name="description"
            content="View the hottest NFTs ranked by volume, floor price, and more. Including additional statistics and alpha tools."
          />
        </Head>
        <div className="w-full">
          <div className="shadow-lg">
            <TopNav />
          </div>
          <section className="-mt-6 p-16 ">
            <MainContent />
          </section>
          <section className="mt-16 p-16">
            <FAQ />
          </section>
          <section className="mt-16 bg-bg-light">
            <Footer />
          </section>
        </div>
      </Fade>
    </div>
  );
};

export default features;
