import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import Image from 'next/image';

const NFTAsset = (props) => {
    return (
        <div className="w-full px-4">
            <Fade>
            <div className="flex flex-col justify-center text-center text-white">
                <img src={props.asset.image_url} className="w-96 h-96 mx-auto" />
                <p>{props.asset.name}</p>
                <p>{props.asset.token_id}</p>
                <p>{props.asset.floor_price}</p>

            </div>
            </Fade>
        </div>
    );
};

export default NFTAsset;
