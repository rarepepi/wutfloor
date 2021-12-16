import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import { ethers } from "ethers";
const NFTEvent = (props) => {

    const [tooltipStatus, setTooltipStatus] = useState(0);
    return (
        <div className="flex justify-center px-2 mb-16">

            <Fade>
                <>
                    <div className="flex flex-row space-x-32  text-center text-white w-full h-full border-2 border-purple-500 rounded-xl lg:pt-8 pt-4">


                        <div classname="flex justify-center flex-col w-96">
                            <img className="w-24 h-24" src={props.event.asset.image_url}></img>
                            <h1 className="text-white w-16">{props.event.asset.name}</h1>
                        </div>

                        <div className="flex justify-center w-96 flex-col">
                            <h1 className="text-white ">{ethers.utils.formatEther(props.event.total_price)}</h1>

                        </div>


                        <div className="flex justify-center flex-col w-96 " >
                            <h1 className="text-white text-xs">{props.event.listing_time}</h1>
                            <a href={props.event.asset.permalink} target="_blank">

                                <i className="fa fa-water"></i>
                            </a>
                            <a href={props.event.asset.asset_contract.external_link} target="_blank">

                                <i className="fa fa-water"></i>
                            </a>
                            <a href={props.event.asset.collection.discord_url} target="_blank">

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

