import { useState } from "react";
import Web3 from "web3";
import ENS, { getEnsAddress } from "@ensdomains/ensjs";
import Router from "next/router";
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [wrongAddress, setWrongAddress] = useState(false);

  const [userAddress, setUserAddress] = useState("");

  const handleChange = (event) => {
    setUserAddress(event.target.value);
    setWrongAddress(false);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    let ethAddress = userAddress;
    if (ethAddress.endsWith(".eth")) {
      const provider = new Web3.providers.HttpProvider(
        "https://mainnet.infura.io/v3/558cd10a65b84096b34dc0ab71eb6ef7"
      );
      const ens = new ENS({ provider, ensAddress: getEnsAddress("1") });
      ethAddress = await ens.name(ethAddress).getAddress();
    }

    if (!Web3.utils.isAddress(ethAddress)) {
      setWrongAddress(true);
      return;
    }

    const acct = ethAddress.endsWith(".eth") ? ethAddress : userAddress;

    Router.push(`/${acct}`);
  };
  return (
    <form className="flex justify-center">
      <div>
        <input
          placeholder="vb.eth or 0x..."
          id="inline-full-name"
          type="text"
          value={userAddress}
          onChange={handleChange}
          className="
          px-2
          py-1.5
          mr-4
          
          text-white
          bg-background bg-clip-padding
          rounded
          
          focus:text-purple-500 focus:outline-none"
          id="search"
          placeholder="vb.eth or 0x.."
        />
        {wrongAddress ? (
          <button
            className="p-1 motion-safe:hover:scale-110 text-white bg-danger rounded-xl mx-auto"
            type="submit"
            onClick={handleSumbit}
          >
            Go!
          </button>
        ) : (
          <button
            className="p-1 motion-safe:hover:scale-110 text-white bg-primary rounded-xl mx-auto"
            type="submit"
            onClick={handleSumbit}
          >
            Go!
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
