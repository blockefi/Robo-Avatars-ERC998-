import { ethers } from "hardhat";
import {
  MyContract,
  MyContract__factory,
  OwnedUpgradeabilityProxy__factory,
  OwnedUpgradeabilityProxy,
} from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
let impl: MyContract;
let myContract: MyContract;
let owner: SignerWithAddress;
let signers: SignerWithAddress[];
let proxy: OwnedUpgradeabilityProxy;

async function main() {
  signers = await ethers.getSigners();
  owner = signers[0];

  proxy = await new OwnedUpgradeabilityProxy__factory(owner).deploy();
  impl = await new MyContract__factory(owner).deploy();
  myContract = await new MyContract__factory(owner).attach(proxy.address);
  const initializeData = await impl.interface.encodeFunctionData("initialize", [
    42,
  ]);
  await proxy.upgradeToAndCall(impl.address, initializeData);

  console.log(`Proxy deployed at : ${proxy.address} `);
  console.log(`Contract deployed at : ${impl.address} `);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
//npx hardhat run --network rinkeby  scripts/deploy.ts
