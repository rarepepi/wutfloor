import { Fade } from "react-reveal";
import { ethers } from "ethers";
import Link from "next/link";
const NFTEvent = (props) => {
  return (
    <div className="flex flex-row justify-evenly shadow-2xl">
      <Fade>
        <>
          <div className="flex flex-row flex-wrap text-left justify-evenly space-x-24  text-white w-full h-full rounded-xl lg:pt-8 p-4">
            <div className="flex">
              <img
                className="w-8 h-8 rounded-full"
                src={props.event.asset.image_url}
              ></img>
            </div>
            <div className="flex align-middle w-32 hover:cursor-pointer">
              <Link
                href={"/c/" + props.event.asset.collection.slug}
                className=""
              >
                <h1 className="text-white hover:text-green-300 hover:cursor-pointer text-xs text-left ml-2 overflow-ellipsis">
                  {props.event.asset.collection.name}
                </h1>
              </Link>
            </div>
            <div className="flex space-x-8">
              <img
                src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                className="h-4 w-4"
              />
              <p className="text-white text-left w-16">
                {Math.round(
                  ethers.utils.formatEther(props.event.total_price) * 100
                ) / 100}
              </p>
              <p className="text-gray-400 w-16 text-xs">
                $
                {parseInt(
                  ethers.utils.formatEther(props.event.total_price) *
                    props.ethPrice
                )}
              </p>
            </div>

            <div className="flex rounded-2xl bg-primary h-8 p-2">
              <p className="text-white text-sm">
                {props.event.event_type == "successful" && <p>Sale</p>}
              </p>
            </div>

            <div className="flex">
              <Link
                href={"/c/" + props.event.asset.collection.slug}
                target="_blank"
                className="hover:cursor-pointer hover:text-green-300"
              >
                <i className="fa fa-external-link-alt"></i>
              </Link>
            </div>
          </div>
        </>
      </Fade>
    </div>
  );
};

export default NFTEvent;
