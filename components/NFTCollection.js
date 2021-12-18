import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import { ethers } from "ethers";
import Link from 'next/link';
const NFTCollection = (props) => {

    const [tooltipStatus, setTooltipStatus] = useState(0);
    return (
        <div className="flex flex-row justify-start shadow-2xl">
            <Fade>
                <>
                    <div className="flex flex-row text-left justify-evenly space-x-32  text-white w-full h-full rounded-xl lg:pt-8 p-4">
                        <div className="flex align-middle  w-16 hover:cursor-pointer">
                            <img className="w-8 h-8 rounded-full" src={props.collection.image_url}></img>
                            <Link href={'/c/' + props.collection.slug} className="">
                                <h1 className="text-white hover:text-green-300 hover:cursor-pointer text-xs ml-3  pt-2 text-left overflow-ellipsis">{props.collection.name}</h1>
                            </Link>
                        </div>
                        <div className="flex align-middle flex-col ">
                            <p className="text-white text-left ">
                                <img src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" className="h-4 w-4" />
                                {Math.round((props.collection.stats.floor_price) * 100) / 100}</p>
                            <p className="text-gray-400 text-xs">${parseInt(((props.collection.stats.floor_price) * props.ethPrice))}</p>
                        </div>
                        <div className="flex align-middle flex-col ">
                            <p className="text-white text-left ">
                                <img src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" className="h-4 w-4" />{
                                    Math.round((props.collection.stats.average_price) * 100) / 100}</p>
                            <p className="text-gray-400text-xs">${parseInt(((props.collection.stats.average_price) * props.ethPrice))}</p>
                        </div>
                        <div className="flex flex-col ">
                            <p className="text-white text-left">
                                <img src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" className="h-4 w-4" />
                                {Math.round((props.collection.stats.one_day_volume) * 100) / 100}</p>
                            <p className="text-gray-400 text-xs">${parseInt(((props.collection.stats.one_day_volume) * props.ethPrice))}</p>
                        </div>
                        <div className="flex flex-col ">
                            <p className="text-white text-left ">
                                <img src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" className="h-4 w-4" />
                                {Math.round((props.collection.stats.one_day_sales) * 100) / 100}</p>
                            <p className="text-gray-400 text-xs">${parseInt(((props.collection.stats.one_day_sales) * props.ethPrice))}</p>
                        </div>
                        <div className="flex flex-col ">
                            <p className="text-white text-left ">
                                <img src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" className="h-4 w-4" />
                                {Math.round((props.collection.stats.total_supply * props.collection.stats.average_price) * 100) / 100}</p>
                            <p className="text-gray-400 text-xs">${parseInt(Math.round((props.collection.stats.total_supply * props.collection.stats.average_price) * 100) / 100 * props.ethPrice)}</p>
                        </div>
                        <div className="flex ">
                            {props.collection.stats.one_day_change >= 0 ? <p className="text-white text-sm bg-primary  rounded-2xl h-8 p-2">{Math.round(props.collection.stats.one_day_change * 100) / 100}%</p>
                                : <p className="bg-danger text-white text-sm rounded-2xl h-8 p-2">{Math.round(props.collection.stats.one_day_change * 100) / 100}%</p>}
                        </div>

                        <div className="flex " >
                            <Link href={'/c/' + props.collection.slug} target="_blank" className="hover:cursor-pointer hover:text-green-300">
                                <i className="fa fa-external-link-alt"></i>
                            </Link>
                        </div>
                    </div>
                </>
            </Fade >
        </div >
    );
};

export default NFTCollection;

