import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import Image from 'next/image';

const NFTAsset = (props) => {
    return (
        <div className="flex px-4 justify-center">
            <Fade>
            <div className="flex flex-col justify-center text-center text-white w-64 h-64 motion-safe:hover:scale-110 border-2 border-purple-400 rounded-xl my-8">
                
                <img src={props.asset.image_url} className="w-36 h-36 mx-auto mb-4 rounded-xl" />
                <p className="text-xs px-8">{props.asset.name}</p>
                <p className="mt-2 text-xs px-8 text-green-300">{props.asset.floor_price}</p>
            </div>
            </Fade>
        </div>
    );
};

export default NFTAsset;
