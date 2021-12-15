import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";

const NFTEvent = (props) => {

    const [tooltipStatus, setTooltipStatus] = useState(0);
    return (
        <div className="flex justify-center px-2 mb-16">

            <Fade>
                {props.event.asset && <div className="flex flex-col justify-center text-center text-white w-full h-24 border-2 border-purple-500 rounded-xl lg:pt-8 pt-4">
                    <h1 className="text-white">{props.event.asset.collection.name && props.event.asset.collection.name}</h1>
                    <h1 className="text-white">{props.event.asset.image_url && <img className="w-16 h-16" src={props.event.asset.image_url}></img>}</h1>



                    {/* <h1 className="text-white">{props.event.asset.asset_contract.external_link && props.event.asset.asset_contract.external_link}</h1> */}
                    {/* <h1 className="text-white">{props.event.asset.permalink && props.event.asset.permalink}</h1> */}
                    {/* <h1 className="text-white">{props.event.asset.collection.discord_url && props.event.asset.collection.discord_url}</h1> */}
                    {/* <h1 className="text-white">{props.event.asset.collection.slug && props.event.asset.collection.slug}</h1> */}
                    <h1 className="text-white">{props.event.asset.name && props.event.asset.name}</h1>

                    <h1 className="text-white">{props.event.contract_address && props.event.contract_address}</h1>
                    {/* <h1 className="text-white">{props.event.transaction.transaction_hash && props.event.transaction.transaction_hash}</h1> */}
                    <h1 className="text-white">{props.event.transaction.from_account.user && props.event.transaction.from_account.user.username}</h1>
                    <h1 className="text-white">{props.event.transaction.from_account.profile_img_url && <img className="w-16 h-16" src={props.event.transaction.from_account.profile_img_url}></img>}</h1>

                    <h1 className="text-white">{props.event.transaction.from_account.address && props.event.transaction.from_account.address}</h1>
                    <h1 className="text-white">{props.event.transaction.to_account.user && props.event.transaction.to_account.user.username}</h1>
                    <h1 className="text-white">{props.event.transaction.to_account.profile_img_url && <img className="w-16 h-16" src={props.event.transaction.to_account.profile_img_url}></img>}</h1>
                    <h1 className="text-white">{props.event.transaction.to_account.address && props.event.transaction.to_account.address}</h1>
                    <h1 className="text-white">{props.event.collection_slug && props.event.collection_slug}</h1>
                    <h1 className="text-white">{props.event.asset.contract_address && props.event.asset.contract_address}</h1>

                    <h1 className="text-white">{props.event.event_type && props.event.event_type}</h1>
                    <h1 className="text-white">{props.event.total_price && props.event.total_price}</h1>
                    <h1 className="text-white">{props.event.listing_time && props.event.listing_time}</h1>

                </div>}

            </Fade >
        </div >
    );
};

export default NFTEvent;

