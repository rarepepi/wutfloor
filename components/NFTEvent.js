import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import { ethers } from "ethers";
const NFTEvent = (props) => {

    const [tooltipStatus, setTooltipStatus] = useState(0);
    return (
        <div className="flex flex-row justify-evenly shadow-2xl">
            <Fade>
                <>
                    <div className="flex flex-row flex-wrap text-left justify-evenly space-x-24  text-white w-full h-full rounded-xl lg:pt-8 p-4">
                        <div classname="flex">
                            <img className="w-8 h-8 rounded-full" src={props.event.asset.image_url}></img>
                        </div>
                        <div className="flex align-middle w-32">
                            <h1 className="text-white text-xs text-left ml-2  overflow-ellipsis">{props.event.asset.collection.name}</h1>
                        </div>
                        <div className="flex space-x-8">
                            <img src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" className="h-4 w-4" />
                            <p className="text-white text-left w-16">{Math.round(ethers.utils.formatEther(props.event.total_price) * 100) / 100}</p>
                            <p className="text-gray-400 w-16 text-xs">${parseInt((ethers.utils.formatEther(props.event.total_price) * props.ethPrice))}</p>
                        </div>

                        <div className="flex rounded-2xl bg-primary h-8 p-2">
                            <p className="text-white text-sm">{props.event.event_type == "successful" && <p>Sale</p>}</p>
                        </div>

                        <div className="flex" >
                            {/* <h1 className="text-white text-xs">{props.event.listing_time}</h1> */}
                            <a href={props.event.asset.permalink} target="_blank">
                                <i className="fa fa-external-link-alt"></i>
                            </a>
                        </div>

                        {/* 
                        <h1 className="text-white">{props.event.asset.collection.slug && props.event.asset.collection.slug}</h1>

                        <h1 className="text-white">{props.event.contract_address && props.event.contract_address}</h1>
                        <h1 className="text-white">{props.event.transaction.transaction_hash && props.event.transaction.transaction_hash}</h1>
                        <h1 className="text-white">{props.event.transaction.from_account.user && props.event.transaction.from_account.user.username}</h1>
                        <h1 className="text-white">{props.event.transaction.from_account.profile_img_url && <img className="w-16 h-16" src={props.event.transaction.from_account.profile_img_url}></img>}</h1>

                        <h1 className="text-white">{props.event.transaction.from_account.address && props.event.transaction.from_account.address}</h1>
                        <h1 className="text-white">{props.event.transaction.to_account.user && props.event.transaction.to_account.user.username}</h1>
                        <h1 className="text-white">{props.event.transaction.to_account.profile_img_url && <img className="w-16 h-16" src={props.event.transaction.to_account.profile_img_url}></img>}</h1>
                        <h1 className="text-white">{props.event.transaction.to_account.address && props.event.transaction.to_account.address}</h1>
                        <h1 className="text-white">{props.event.collection_slug && props.event.collection_slug}</h1>
                        <h1 className="text-white">{props.event.asset.contract_address && props.event.asset.contract_address}</h1> */}


                    </div>
                </>
            </Fade >
        </div >
    );
};

export default NFTEvent;

