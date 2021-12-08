import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import Image from 'next/image';

const NFTAsset = (props) => {
    return (
        <div className="flex px-4">
            <Fade>
            <div className="flex flex-col justify-center text-center text-white">
                <img src={props.asset.image_url} className="w-48 h-48" />
                <p className="text-xs">{props.asset.name}</p>
                <p className="text-xs">{props.asset.floor_price}</p>
            </div>
            </Fade>
        </div>
    );
};

export default NFTAsset;
