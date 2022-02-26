import { ethers } from "hardhat";
import { BigNumber } from 'ethers';

const abi = require("ethereumjs-abi");
const AbiCoder = ethers.utils.AbiCoder;
const ADDRESS_PREFIX_REGEX = /^(41)/;

export async function mineBlocks(
  provider: typeof ethers.provider,
  count: number
): Promise<void> {
  for (let i = 1; i < count; i++) {
    await provider.send("evm_mine", []);
  }
}

export function expandTo18Decimals(n: number): BigNumber {
  return BigNumber.from(n).mul(BigNumber.from(10).pow(18));
}
