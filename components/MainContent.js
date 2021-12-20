import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Zoom, Fade, Flip, Slide } from "react-reveal";

const MainContent = () => {
  return (
    <div id="Why" className="space-y-12 ">
      <Fade>
        <div className="flex flex-col justify-center shadow-2xl p-8">
          <h1 className="xl:text-4xl text-2xl font-bold text-white mt-16 px-2 text-center">
            Everything you need to research NFTs
          </h1>
          <h2 className="text-gray-300 text-center mt-4">
            Built for apes, by apes.
          </h2>
          <div className="flex flex-row flex-wrap justify-center mt-8 space-x-6">
            <button
              className=" p-3 motion-safe:hover:scale-110 flex text-white  bg-bg-light rounded-xl"
              type="submit"
              onClick={() => Router.push("/top")}
            >
              See Top Collections
            </button>
            <button
              className=" p-3 motion-safe:hover:scale-110 flex text-white bg-bg-light rounded-xl"
              type="submit"
              onClick={() => Router.push("/hot")}
            >
              View Hot Collections
            </button>
          </div>
        </div>

        <div className="text-center flex justify-center flex-row flex-wrap  py-8 shadow-2xl md:space-x-12">
          <div className="text-white flex flex-col justify-center rounded-lg p-4 motion-safe:hover:scale-110  w-96">
            <h2 className="text-white text-center font-bold text-2xl">📊</h2>
            <h2 className="text-white text-center font-bold text-xl">
              Floor Prices + Volume
            </h2>

            <p className="pt-4">
              Research floor, volume, and sales trends and charts on
              <span className="text-green-300"> any </span>
              collection you wish! Gain
              <span className="text-purple-500"> alpha </span> by discovering
              hidden data.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <img
              src="https://media2.giphy.com/media/6DdzrWQZ97PmQVy6oi/giphy.gif?cid=ecf05e47ph9gjjzom4dihhoy53yt1jqbrbb58eozklif2d5x&rid=giphy.gif&ct=g"
              width={300}
              height={300}
            />
          </div>
        </div>

        <div className="text-center flex justify-center flex-row flex-wrap  py-8 shadow-2xl md:space-x-12">
          <div className="pt-4 motion-safe:hover:scale-110">
            <img
              src="https://media0.giphy.com/media/14SAx6S02Io1ThOlOY/200.gif"
              width={300}
              height={300}
            />
          </div>
          <div className="text-white flex flex-col justify-center rounded-lg p-4 motion-safe:hover:scale-110  w-96">
            <h2 className="text-white text-center font-bold text-2xl">🕵️</h2>

            <h2 className="text-white text-center font-bold text-xl">
              NFT Portfolio Analysis
            </h2>

            <p className="pt-4">
              Not sure what the value of your{" "}
              <span className="text-green-300">NFT portfolio </span> is? Dont
              worry we got you covered. With our
              <span className="text-purple-500"> wallet</span> profiler.
            </p>
          </div>
        </div>

        <div className="text-center flex justify-center flex-row flex-wrap  py-8 shadow-2xl md:space-x-12">
          <div className="text-white flex flex-col justify-center rounded-lg p-4 motion-safe:hover:scale-110 w-96">
            <h2 className="text-white text-center font-bold text-2xl">🤓</h2>

            <h2 className="text-white text-center font-bold text-xl">
              Collection Stats
            </h2>

            <p className="pt-4">
              We got hourly, daily, monthly, and all time data
              <span className="text-green-300"> statistics </span> you could
              dream of. Check out a
              <span className="text-purple-500"> collection or wallet</span> to
              see all kinds of alpha stats.
            </p>
          </div>
          <div className="pt-4 motion-safe:hover:scale-110">
            <img
              src="https://media2.giphy.com/media/3owzW5c1tPq63MPmWk/200.gif"
              width={300}
              height={300}
            />
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default MainContent;
