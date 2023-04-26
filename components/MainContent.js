import { Fade } from "react-reveal";
import Router from "next/router";

const MainContent = () => {
  return (
    <div id="Why" className="space-y-12 ">
      <Fade>
        <div className="flex flex-col justify-center p-8">
          <h1 className="xl:text-6xl text-4xl font-bold text-white  px-2 text-center">
            Everything you need to research NFTs
          </h1>
          <h2 className="text-gray-300 text-center mt-4">
            Built for apes, by apes.
          </h2>
          <div className="flex flex-row flex-wrap justify-center mt-8 sm:space-x-6 sm:space-y-0 space-y-4">
            <button
              className=" p-3 motion-safe:hover:scale-110 flex text-white  bg-bg-light rounded-xl"
              type="submit"
              onClick={() => Router.push("/top")}
            >
              See Top Collections
            </button>
            <button
              className=" p-3 motion-safe:hover:scale-110 flex text-white bg-bg-light rounded-xl"
              type="submit"
              onClick={() => Router.push("/hot")}
            >
              View Hot Collections
            </button>
          </div>
        </div>

        <div className="text-center flex justify-center flex-row flex-wrap  py-8 shadow-2xl md:space-x-12">
          <div className="text-white flex flex-col justify-center rounded-lg p-4 motion-safe:hover:scale-110  w-96">
            <h2 className="text-white text-center font-bold text-2xl">📊</h2>
            <h2 className="text-white text-center font-bold text-xl">
              Floor Prices + Volume
            </h2>

            <p className="pt-4">
              Research floor, volume, and sales trends and charts on any
              <span className="text-green-300"> collection </span>
              you wish! Gain
              <span className="text-purple-500"> alpha </span> by discovering
              special data.
            </p>
          </div>
          <div className="flex flex-col justify-center motion-safe:hover:scale-110">
            <img
              src="https://media2.giphy.com/media/6DdzrWQZ97PmQVy6oi/giphy.gif?cid=ecf05e47ph9gjjzom4dihhoy53yt1jqbrbb58eozklif2d5x&rid=giphy.gif&ct=g"
              width={300}
              height={300}
            />
          </div>
        </div>

        <div className="text-center flex justify-center flex-row flex-wrap  py-8 shadow-2xl md:space-x-12">
          <div className="pt-4 motion-safe:hover:scale-110">
            <img
              src="https://media0.giphy.com/media/14SAx6S02Io1ThOlOY/200.gif"
              width={300}
              height={300}
            />
          </div>
          <div className="text-white flex flex-col justify-center rounded-lg p-4 motion-safe:hover:scale-110  w-96">
            <h2 className="text-white text-center font-bold text-2xl">🕵️</h2>

            <h2 className="text-white text-center font-bold text-xl">
              NFT Portfolio Analysis
            </h2>

            <p className="pt-4">
              Not sure what the value of your{" "}
              <span className="text-green-300">NFT portfolio </span> is? Dont
              worry we got you covered. With our
              <span className="text-purple-500"> wallet</span> profiler.
            </p>
          </div>
        </div>

        <div className="text-center flex justify-center flex-row flex-wrap  py-8 shadow-2xl md:space-x-12">
          <div className="text-white flex flex-col justify-center rounded-lg p-4 motion-safe:hover:scale-110 w-96">
            <h2 className="text-white text-center font-bold text-2xl">🤓</h2>

            <h2 className="text-white text-center font-bold text-xl">
              Collection Stats
            </h2>

            <p className="pt-4">
              Get hourly, daily, monthly, and all time data
              <span className="text-green-300"> statistics </span> you've ever
              dreamed of. Check out a collection or wallet to see all kinds of{" "}
              <span className="text-purple-500">alpha stats.</span>
            </p>
          </div>
          <div className="pt-4 motion-safe:hover:scale-110">
            <img
              src="https://media2.giphy.com/media/3owzW5c1tPq63MPmWk/200.gif"
              width={300}
              height={300}
            />
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default MainContent;
