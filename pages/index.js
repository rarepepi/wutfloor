import React, { useContext } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Zoom, Fade, Flip, Slide } from "react-reveal";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import MainContent from "../components/MainContent";
import FAQ from '../components/FAQ';
import ENS, { getEnsAddress } from '@ensdomains/ensjs'
const Web3 = require('web3');
// const provider = new Web3.providers.HttpProvider();
import detectEthereumProvider from '@metamask/detect-provider';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      signedIn: false,
      userAddress: "",
      ethAddress: "",

    };
    this.updatePredicate = this.updatePredicate.bind(this);
    this.myRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);

  }

  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);

    sleep(2000).then(() => {
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ isMobile: window.innerWidth <= 600 });
  }

  handleChange(event) {
    this.setState({userAddress: event.target.value});
  }

  async handleSumbit(event) {
    const provider = await detectEthereumProvider();

    const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })
    this.setState({ethAddress: await ens.name(this.state.userAddress).getAddress()});
  }


  render() {
    return (
      <div className="font-press-start overflow-auto">
        <Fade>
          <div className="shadow-2xl">
            <TopNav />
          </div>
          <section className="flex flex-col h-screen justify-center items-center">
            <div className="flex flex-row justify-center space-x-8 mt-20 ">
            <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              Eth Address
            </label>
          </div>
          <div class="md:w-2/3">
            <input class="bg-gray-800 appearance-none border-4 border-green-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="vb.eth or 0x..." id="inline-full-name" type="text" value={this.state.userAddress} onChange={this.handleChange}/>
            <button className="bg-green-200 text-white" onClick={this.handleSumbit}>Go</button>
          </div>
          {this.state.ethAddress.length > 0 &&
          <div>
              <h1>{this.state.ethAddress}</h1>
            </div>
          }
        </div>
            </div>
          </section>
        </Fade>
        <section className="mt-16 shadow-2xl p-16">
          <MainContent />
        </section>        
          <section className="mt-16 shadow-2xl p-16">
            <FAQ />
          </section>
        <section className="mt-16 shadow-2xl">
          <Footer />
        </section>
      </div >
    );
  }
}
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      time: new Date().toISOString(),
    },
  };
}
export default HomePage;
