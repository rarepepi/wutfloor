import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import axios from "axios";
import Web3 from "web3";
const request = rateLimit(axios.create(), { maxRequests: 5, perMilliseconds: 1000, maxRPS: 5 });
import ENS, { getEnsAddress } from '@ensdomains/ensjs';
import rateLimit from 'axios-rate-limit';
import NFTAsset from "../components/NFTAsset";
import TopNav from "../components/TopNav";


const getOpenSeaData = async (address) => {
    console.log(address);
    if (address.endsWith('.eth')) {
        const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/558cd10a65b84096b34dc0ab71eb6ef7");
        const ens = new ENS({ provider, ensAddress: getEnsAddress('1') });
        address = await ens.name(address).getAddress();
    }
    else {
        // this.setState({ ethAddress: this.state.userAddress });
    }

    if (!Web3.utils.isAddress(address)) {
        // this.setState({ wrongAddress: true });
        return;
    }

    const data = await request.get(`https://api.opensea.io/api/v1/assets?limit=50&owner=${address}`, { crossdomain: true });
    if (!data) return;

    let assets = data.data.assets;
    let total_eth_value = 0;
    const newAssets = [];
    console.log(`There are ${assets.length} assets`);
    await Promise.all(assets.map(async (item, i) => {
        const collectionSlug = item.collection.slug;
        const data = await request.get(`https://api.opensea.io/api/v1/collection/${collectionSlug}`, { crossdomain: true });
        if (data.data.collection.stats.floor_price > 0.01) {
            total_eth_value += data.data.collection.stats.floor_price;
            item.floor_price = data.data.collection.stats.floor_price;
            if (item.image_url.length < 1) {
                item.image_url = data.data.collection.image_url;
            }
            newAssets.push(item);
        }
    }));
    return { assets: newAssets, totalETHValue: total_eth_value, address: address };
};

const Account = (props) => {
    const router = useRouter();
    const queryAddress = router.query.address;
    const [ethPrice, setETHPrice] = useState(0);
    const [totalETHValue, setTotalETHValue] = useState(0);
    const [accountAssets, setAccountAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ethAddress, setETHAddress] = useState("");
    useEffect(async () => {
        if (router.asPath !== router.route) {
            const getData = async () => {
                const data = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
                setETHPrice(data.data.USD);
                const results = await getOpenSeaData(queryAddress);
                setAccountAssets(results.assets);
                setTotalETHValue(results.totalETHValue);
                setETHAddress(results.address);
                setLoading(false);
            };
            await getData();
        }
    }, [router]);

    return (
        <div className="font-press-start">
            {loading ? <div className="flex flex-col h-screen justify-center items-center"><>

                <p className="text-white p-8">Loading...</p> </></div> :
                <div>
                    <div className="shadow-lg">
                        <TopNav />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-purple-500 mt-4 text-center mb-8">{ethAddress.slice(0, 5) +
                            "..." +
                            ethAddress.slice(ethAddress.length - 4, ethAddress.length)}</h1>

                        <div className="flex flew-row flex-wrap justify-evenly p-8">
                            <div className="flex flex-col justify-center text-center p-8">
                                <h1 className="text-white text-lg">ETH Price</h1>
                                <p className=" text-green-400 mt-4">${ethPrice}</p>
                            </div>
                            <div className="flex flex-col justify-center text-center p-8">
                                <h1 className=" text-white text-lg">Total Assets</h1>
                                <p className="text-green-400 mt-4">{accountAssets.length}</p>
                            </div>
                            <div className="flex flex-col justify-center text-center p-8">
                                <h1 className=" text-white text-lg">Total Value</h1>
                                <div className="flex flex-row jusitfy-center text-center space-x-2">
                                    <p className="text-green-400 mt-4">Ξ{Math.round(totalETHValue * 100) / 100}</p>
                                    <p className="text-green-400 mt-4">(${Math.round((totalETHValue * ethPrice) * 100) / 100})</p>
                                </div>

                            </div>
                            <div className="flex flex-col justify-center text-center p-8">
                                <h1 className="text-white text-lg">Total Cost</h1>
                                <p className="text-green-400 mt-4">Soon..</p>

                            </div>
                        </div>
                    </div>

                    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 justify-center align-middle px-16">
                        {accountAssets.map((asset, i) => {
                            return (
                                <>
                                    <NFTAsset key={i} asset={asset} ethPrice={ethPrice} />
                                </>
                            );
                        })}
                    </div>
                </div>
            }
        </div>

    );
};

export default Account;
