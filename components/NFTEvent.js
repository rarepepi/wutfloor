import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import { ethers } from "ethers";
const NFTEvent = (props) => {

    const [tooltipStatus, setTooltipStatus] = useState(0);
    return (
        <div className="flex flex-row justify-evenly shadow-2xl">

            <Fade>
                <>
                    <div className="flex flex-row justify-evenly space-x-32  text-center text-white w-full h-full rounded-xl lg:pt-8 pt-4">
                        <div classname="flex justify-center flex-row">
                            <img className="w-12 h-12 rounded-full" src={props.event.asset.image_url}></img>
                            <h1 className="text-white text-xs text-center ml-2 truncate">{props.event.asset.name}</h1>
                        </div>

                        <div className="flex justify-center flex-row">
                            <span className="text-white w-16"><img src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" className="h-6 w-6 inline mr-2" />{ethers.utils.formatEther(props.event.total_price)}</span>
                            <p className="text-white w-16">${(ethers.utils.formatEther(props.event.total_price) * props.ethPrice).toLocaleString()}</p>

                        </div>
                        <div className="flex justify-center flex-row">
                            <span className="text-white w-16"><img src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" className="h-6 w-6 inline mr-2" />{ethers.utils.formatEther(props.event.total_price)}</span>
                            <p className="text-white w-16">${(ethers.utils.formatEther(props.event.total_price) * props.ethPrice).toLocaleString()}</p>

                        </div>

                        <div className="flex justify-end flex-col " >
                            <h1 className="text-white text-xs">{props.event.listing_time}</h1>
                            <a href={props.event.asset.permalink} target="_blank">

                                <i className="fa fa-water"></i>
                            </a>
                            <h1 className="text-white">{props.event.event_type && props.event.event_type}</h1>

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

