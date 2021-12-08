import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Zoom, Fade, Flip, Slide } from "react-reveal";

const MainContent = () => {
  return (
    <div id="Why" className="space-y-12 ">
      <Fade>
        <h1 className="xl:text-4xl text-2xl font-bold text-white mt-16 px-8 text-center">
          Why this exist?
        </h1>
        <div className="text-center flex justify-center flex-row flex-wrap  py-16">
          <div className="lg:mt-16 motion-safe:hover:scale-110">
            <img src="https://www.kapwing.com/resources/content/images/2021/02/final_6039a4b26a140a00a1cffbd3_143170.gif" width={300} height={300} />
          </div>
          <div className="text-white flex flex-col justify-center max-w-md rounded-lg p-12 motion-safe:hover:scale-110">
            <p>
              Not sure what the value or your <span className="text-green-300">NFT</span> portfolio is? Dont worry we got you covered.
              <span className="text-purple-500"> <br/>wutfloor.xyz<br/></span> is here for you and all the "wuts the floor" questions you have.
              
            </p>
          </div>
        </div>
      </Fade >
    </div >
  );
};

export default MainContent;
