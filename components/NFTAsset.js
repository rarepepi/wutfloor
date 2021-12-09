import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
const NFTAsset = (props) => {
    const url = `https://opensea.io/collection/${props.asset.collection.slug}`;
    const url2 = `${props.asset.permalink}`;

    const [tooltipStatus, setTooltipStatus] = useState(0);
    return (
        <div className="flex justify-center px-2">
            <Fade>
                <div className="flex flex-col justify-center text-center text-white w-64 border-2 border-purple-500 rounded-xl mb-8 p-4 pb-2">
                    <div className="cursor-pointer ">
                        <a href={url2} target="_blank">

                            <img src={props.asset.image_url} className="w-full mx-auto  ring-purple-400 ring-2 rounded-2xl mb-12 " />
                        </a>
                    </div>

                    <a href={url} target="_blank">
                        <p className="text-xs px-8 hover:text-blue-300">{props.asset.name}</p>
                    </a>
                    <p className="mt-2 text-xs px-8 text-green-300">Ξ{Math.round(props.asset.floor_price * 100) / 100}</p>
                    <p className="mt-2 text-xs px-8 text-green-300 ">(${(Math.round((props.asset.floor_price * props.ethPrice) * 100) / 100).toLocaleString()})</p>
                    <div className="relative text-xs mb-8 mt-2 text-purple-400" onMouseEnter={() => setTooltipStatus(1)} onMouseLeave={() => setTooltipStatus(0)}>
                        {tooltipStatus == 1 && (
                            <div role="tooltip" className="z-20 w-54 -top-96 mt-2 absolute transition duration-150 ease-in-out shadow-lg bg-white p-4 border-2 border-purple-400 rounded bg-background bg-opacity-100">
                                <p className="text-xs ">Total Supply <span className="mb-2 text-green-200 block" >{Math.round(props.asset.total_supply * 100) / 100}</span></p>
                                <p className="text-xs ">Owners <span className="mb-2 text-green-200 block" >{Math.round(props.asset.num_owners * 100) / 100}</span></p>
                                <p className="text-xs text-purple-400e">Market Cap <span className=" block text-green-200" >Ξ{(Math.round(props.asset.market_cap * 100) / 100).toLocaleString()}</span><span className="block text-green-200 mb-4"  >(${(Math.round((props.asset.market_cap * props.ethPrice) * 100) / 100).toLocaleString()})</span></p>
                                <p className="text-xs text-purple-400">Total Volume <span className="block text-green-200"  >Ξ{(Math.round(props.asset.total_volume * 100) / 100).toLocaleString()}</span><span className="block text-green-200 mb-4"  >(${(Math.round((props.asset.total_volume * props.ethPrice) * 100) / 100).toLocaleString()})</span></p>
                                <p className="text-xs leading-4 text-gray-600 pb-3">Please feel free to connect and share a favorite indicator you want listed</p>
                            </div>
                        )}More Info
                    </div>
                    <div className="divide-y-4 divide-solid divide-purple-500 divide-opacity-75 space-y-2">
                        <p className="text-xs p-1 text-gray-400">1 Day Change <span className="text-green-200 block mt-1">{Math.round(props.asset.one_day_change * 10000) / 100}%</span></p>
                        <p className="text-xs p-1 text-gray-400">7 Day Change <span className="text-green-200 block mt-1" >{Math.round(props.asset.seven_day_change * 10000) / 100}%</span></p>
                        <p className="text-xs p-1 text-gray-400">30 Day Change <span className="text-green-200 block mt-1" >{Math.round(props.asset.thirty_day_change * 10000) / 100}%</span></p>
                        {/* <p className="text-xs ">One Day Vol <span className="text-green-200 block" >Ξ{Math.round(props.asset.one_day_volume * 100) / 100}</span></p> */}
                        <p className="text-xs p-1 text-gray-400">1 Day Sales <span className="text-green-200 block" mt-1 >{Math.round(props.asset.one_day_sales * 100) / 100}</span></p>
                        <p className="text-xs p-1 text-gray-400">1 Day Avg Price <span className="text-green-200 block mt-1">Ξ{Math.round(props.asset.one_day_average_price * 100) / 100}</span></p>
                        <p className="text-xs p-1 text-gray-400">7 Day Avg Price <span className="text-green-200 block mt-1" >Ξ{Math.round(props.asset.seven_day_average_price * 100) / 100}</span></p>
                        <p className="text-xs p-1 text-gray-400">30 Day Avg Price <span className="text-green-200 block mt-1" >Ξ{Math.round(props.asset.thirty_day_average_price * 100) / 100}</span></p>
                    </div>
                </div>
            </Fade >
        </div >
    );
};

export default NFTAsset;
