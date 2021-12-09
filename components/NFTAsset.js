import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
const NFTAsset = (props) => {

    return (
        <div className="flex px-4 justify-center">
            <Fade>
                <div className="flex flex-col justify-center text-center text-white w-64 h-72 motion-safe:hover:scale-110 border-2 border-purple-400 rounded-xl my-8">

                    <img src={props.asset.image_url} className="w-36 h-36 mx-auto my-4 rounded-2xl p-2" />
                    <p className="text-xs px-8">{props.asset.name}</p>
                    <p className="mt-2 text-xs px-8 text-green-300">Ξ{Math.round(props.asset.floor_price * 100) / 100}</p>

                    <p className="mt-2 text-xs px-8 text-green-300 mb-8">(${Math.round((props.asset.floor_price * props.ethPrice) * 100) / 100})</p>
                </div>
            </Fade>
        </div>
    );
};

export default NFTAsset;
