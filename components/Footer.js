import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";

const Footer = () => {
  return (
    <div className="lg:p-12 flex justify-evenly max-w-full p-4 space-x-8">
      <Fade>
        <div className="flex justify-start">
          <p className="text-purple-500 text-sm animate-pulse">
            &copy; Wut Floor <br/><span className="text-xs">by Pepi</span>
          </p>
        </div>
        <div className="flex justify-end text-right">
          <a
            className="text-purple-500 animate-pulse"
            target="_blank"
            href="https://github.com/pepimartinez/wutfloor"
          >
            Github
          </a>
        </div>
      </Fade>
    </div>
  );
};

export default Footer;
