import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Zoom, Fade, Flip, Slide } from "react-reveal";

const MainContent = () => {
  return (
    <div id="Why" className="space-y-12 ">
      <Fade>
        <div>
          <h1 className="xl:text-4xl text-2xl font-bold text-white mt-16 px-2 text-center">
            Everything you need to evaluate NFTs
          </h1>
          <h2 className="text-white text-center">
            We love and believe in the NFT space and we're constantly adding new
            tools to evaluate projects.
          </h2>
        </div>

        <div className="text-center flex justify-center flex-row flex-wrap  py-8 shadow-2xl space-x-12">
          <div className="text-white flex flex-col justify-center rounded-lg p-4 motion-safe:hover:scale-110  w-96">
            <h2 className="text-white text-center font-bold text-2xl">📊</h2>
            <h2 className="text-white text-center font-bold text-xl">
              Floor Prices + Volume
            </h2>

            <p className="pt-4">
              Not sure what the value of your{" "}
              <span className="text-green-300">NFT portfolio </span> is? Dont
              worry we got you covered.
              <span className="text-purple-500">
                {" "}
                <br />
                wutfloor.xyz
                <br />
              </span>{" "}
              is here for you and all the "wuts the floor" questions you have.
            </p>
          </div>
          <div className="pt-4 motion-safe:hover:scale-110">
            <img
              src="https://media2.giphy.com/media/6DdzrWQZ97PmQVy6oi/giphy.gif?cid=ecf05e47ph9gjjzom4dihhoy53yt1jqbrbb58eozklif2d5x&rid=giphy.gif&ct=g"
              width={300}
              height={300}
            />
          </div>
        </div>

        <div className="text-center flex justify-center flex-row flex-wrap  py-8 shadow-2xl space-x-12">
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
              worry we got you covered.
              <span className="text-purple-500">
                {" "}
                <br />
                wutfloor.xyz
                <br />
              </span>{" "}
              is here for you and all the "wuts the floor" questions you have.
            </p>
          </div>
        </div>

        <div className="text-center flex justify-center flex-row flex-wrap  py-8 shadow-2xl space-x-12">
          <div className="text-white flex flex-col justify-center rounded-lg p-4 motion-safe:hover:scale-110 w-96">
            <h2 className="text-white text-center font-bold text-2xl">🤓</h2>

            <h2 className="text-white text-center font-bold text-xl">
              Collection Stats
            </h2>

            <p className="pt-4">
              Not sure what the value of your{" "}
              <span className="text-green-300">NFT portfolio </span> is? Dont
              worry we got you covered.
              <span className="text-purple-500">
                {" "}
                <br />
                wutfloor.xyz
                <br />
              </span>{" "}
              is here for you and all the "wuts the floor" questions you have.
            </p>
          </div>
          <div className="pt-4 motion-safe:hover:scale-110">
            <img
              src="https://c.tenor.com/CowGNQSUsOYAAAAC/confused-math.gif"
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
