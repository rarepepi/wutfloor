const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FountainNFTs", function () {
  it("Should create and execute fridge claims", async function () {

    const Color = await ethers.getContractFactory("Color")
    const color = await Color.deploy()
    await color.deployed()
    const colorAddress = color.address

    const YieldToken = await ethers.getContractFactory("YieldToken")
    const yieldtoken = await YieldToken.deploy(colorAddress)
    await yieldtoken.deployed()
    const yieldtokenAddress = yieldtoken.address
    await color.setYieldToken(yieldtokenAddress)

    const mintPrice = ethers.utils.parseUnits('0.26664', 'ether')
    
    const [owner] = await ethers.getSigners()  
    await color.connect(owner).preMintMint(20)

    // const addy = ethers.utils.getAddress("0xeBf3b5f4C77F99f8251a0BbD43101169bCffE793")
    // console.log(owner.address)

    // expect(await color.balanceOf(owner.address)).to.equal(3)

    // await color.connect(owner).getReward()
    // // await color.connect(owner).breed(1, 2)
    // expect(await color.balanceOf(owner.address)).to.equal(4)
    // // await color.connect(owner).changeName(1, "REEDD")
    // console.log(await color.connect(owner).tokenNameByIndex(1))
  })
})