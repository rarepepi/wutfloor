import React, { useEffect, useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";

const NFTEvent = (props) => {

    const [tooltipStatus, setTooltipStatus] = useState(0);
    return (
        <div className="flex justify-center px-2 mb-16">

            <Fade>
                {/* <h1 className="text-white text-center -top-5 left-2 z-20 relative ring-2 ring-green-300 h-8 p-2 rounded-full ">{props.number + 1}</h1> */}
                <div className="flex flex-col justify-center text-center text-white w-64 border-2 border-purple-500 rounded-xl lg:pt-8 pt-4">
                    <h1 className="text-white">{props.event.asset.name}</h1>
                </div>
            </Fade >
        </div >
    );
};

export default NFTEvent;

