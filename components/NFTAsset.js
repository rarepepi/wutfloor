import { useState } from "react";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import Link from "next/link";
const NFTAsset = (props) => {
  const url = `https://opensea.io/collection/${props.asset.collection.slug}`;
  const url2 = `${props.asset.permalink}`;

  const [tooltipStatus, setTooltipStatus] = useState(0);
  return (
    <div className="flex justify-center px-2 mb-16 ">
      <Fade>
        {/* <h1 className="text-white text-center -top-5 left-2 z-20 relative ring-2 ring-green-300 h-8 p-2 rounded-full ">{props.number + 1}</h1> */}
        <Link href={"/c/" + props.asset.collection.slug} target="_blank">
          <div className="flex flex-col justify-center hover:bg-bg-light cursor-pointer text-center text-white w-64 border-2 border-purple-500 rounded-xl lg:pt-8 pt-4">
            <div className="cursor-pointer w-32 h-32 mx-auto mb-4">
              <Link href={"/c/" + props.asset.collection.slug} target="_blank">
                <img
                  src={props.asset.image_url}
                  className="rounded-2xl mb-4  w-32 h-32 "
                />
              </Link>
            </div>
            <a
              href={"/c/" + props.asset.collection.slug}
              target="_blank"
              className="p-2 text-white h-16"
            >
              <p className="font-bold px-8 hover:text-green-300">
                {props.asset.name}
              </p>
            </a>
            <p className="mt-2 text-xs px-8 text-green-300">
              Ξ{Math.round(props.asset.floor_price * 100) / 100}
            </p>
            <p className="mt-2 text-xs px-8 text-green-300 ">
              ($
              {(
                Math.round(props.asset.floor_price * props.ethPrice * 100) / 100
              ).toLocaleString()}
              )
            </p>
            <div
              className="relative text-xs mb-8 mt-2 text-purple-400 cursor-pointer"
              onMouseEnter={() => setTooltipStatus(1)}
              onMouseLeave={() => setTooltipStatus(0)}
            >
              {tooltipStatus == 1 && (
                <div
                  role="tooltip"
                  className="z-20 w-54 -top-96 mt-2 absolute transition duration-150 ease-in-out shadow-lg bg-white p-4 border-2 border-purple-400 rounded bg-background bg-opacity-100"
                >
                  <p className="text-xs ">
                    Days Deployed{" "}
                    <span className="mb-2 text-green-200 block">
                      {parseInt(
                        (new Date() - new Date(props.asset.created_date)) /
                          (1000 * 3600 * 24)
                      )}
                    </span>
                  </p>

                  <p className="text-xs ">
                    Total Supply{" "}
                    <span className="mb-2 text-green-200 block">
                      {Math.round(props.asset.total_supply * 100) / 100}
                    </span>
                  </p>
                  <p className="text-xs ">
                    Owners{" "}
                    <span className="mb-2 text-green-200 block">
                      {Math.round(props.asset.num_owners * 100) / 100}
                    </span>
                  </p>
                  <p className="text-xs text-purple-400e">
                    Market Cap{" "}
                    <span className=" block text-green-200">
                      <img
                        src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                        className="h-4 w-4 inline mr-2"
                      />
                      {(
                        Math.round(props.asset.market_cap * 100) / 100
                      ).toLocaleString()}
                    </span>
                    <span className="block text-green-200 mb-4">
                      ($
                      {(
                        Math.round(
                          props.asset.market_cap * props.ethPrice * 100
                        ) / 100
                      ).toLocaleString()}
                      )
                    </span>
                  </p>
                  <p className="text-xs text-purple-400">
                    Total Volume{" "}
                    <span className="block text-green-200">
                      <img
                        src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                        className="h-4 w-4 inline mr-2"
                      />
                      {(
                        Math.round(props.asset.total_volume * 100) / 100
                      ).toLocaleString()}
                    </span>
                    <span className="block text-green-200 mb-4">
                      ($
                      {(
                        Math.round(
                          props.asset.total_volume * props.ethPrice * 100
                        ) / 100
                      ).toLocaleString()}
                      )
                    </span>
                  </p>
                  <p className="text-xs leading-4 text-gray-600 pb-3">
                    Please feel free to connect and share a favorite indicator
                    you want listed
                  </p>
                </div>
              )}
              More Info
            </div>
            <div className="divide-y-4 divide-solid divide-purple-500 divide-opacity-75 space-y-2">
              <p className="text-xs p-1 text-gray-400">
                1 Day Change{" "}
                <span className="text-green-200 block mt-1">
                  {Math.round(props.asset.one_day_change * 10000) / 100}%
                </span>
              </p>
              <p className="text-xs p-1 text-gray-400">
                7 Day Change{" "}
                <span className="text-green-200 block mt-1">
                  {Math.round(props.asset.seven_day_change * 10000) / 100}%
                </span>
              </p>
              <p className="text-xs p-1 text-gray-400">
                30 Day Change{" "}
                <span className="text-green-200 block mt-1">
                  {Math.round(props.asset.thirty_day_change * 10000) / 100}%
                </span>
              </p>
              {/* <p className="text-xs ">One Day Vol <span className="text-green-200 block" ><img src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" className="h-4 w-4 inline mr-2"  />{Math.round(props.asset.one_day_volume * 100) / 100}</span></p> */}
              <p className="text-xs p-1 text-gray-400">
                1 Day Sales{" "}
                <span className="text-green-200 block" mt-1>
                  {Math.round(props.asset.one_day_sales * 100) / 100}
                </span>
              </p>
              <p className="text-xs p-1 text-gray-400">
                1 Day Avg Price{" "}
                <span className="text-green-200 block mt-1">
                  <img
                    src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                    className="h-4 w-4 inline mr-2"
                  />
                  {Math.round(props.asset.one_day_average_price * 100) / 100}
                </span>
              </p>
              <p className="text-xs p-1 text-gray-400">
                7 Day Avg Price{" "}
                <span className="text-green-200 block mt-1">
                  <img
                    src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                    className="h-4 w-4 inline mr-2"
                  />
                  {Math.round(props.asset.seven_day_average_price * 100) / 100}
                </span>
              </p>
              <p className="text-xs p-1 text-gray-400">
                30 Day Avg Price{" "}
                <span className="text-green-200 block mt-1">
                  <img
                    src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                    className="h-4 w-4 inline mr-2"
                  />
                  {Math.round(props.asset.thirty_day_average_price * 100) / 100}
                </span>
              </p>
            </div>
          </div>
        </Link>
      </Fade>
    </div>
  );
};

export default NFTAsset;
