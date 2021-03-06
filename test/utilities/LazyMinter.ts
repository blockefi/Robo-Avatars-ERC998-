import { BigNumberish, BytesLike, ethers, Wallet } from "ethers"
import { formatBytes32String } from "ethers/lib/utils";
import { encode } from "querystring";

// const ethers = require('ethers')

// These constants must match the ones used in the smart contract.
const SIGNING_DOMAIN_NAME = "LazyNFT-Voucher"
const SIGNING_DOMAIN_VERSION = "1"

/**
 * JSDoc typedefs.
 * 
 * @typedef {object} NFTVoucher
 * @property {ethers.BigNumber | number} tokenId the id of the un-minted NFT
 * @property {ethers.BigNumber | number} minPrice the minimum price (in wei) that the creator will accept to redeem this NFT
 * @property {string} uri the metadata URI to associate with this NFT
 * @property {ethers.BytesLike} signature an EIP-712 signature of all fields in the NFTVoucher, apart from signature itself.
 */

/**
 * LazyMinter is a helper class that creates NFTVoucher objects and signs them, to be redeemed later by the LazyNFT contract.
 */
class LazyMinter {

  /**
   * Create a new LazyMinter targeting a deployed instance of the LazyNFT contract.
   * 
   * @param {Object} options
   * @param {ethers.Contract} contract an ethers Contract that's wired up to the deployed contract
   * @param {ethers.Signer} signer a Signer whose account is authorized to mint NFTs on the deployed contract
   */

  public contract : any;
  public signer : any;
  public _domain : any;

  constructor(data:any ) {
    const {_contract, _signer} =data;
    this.contract = _contract
    this.signer = _signer
  }

  /**
   * Creates a new NFTVoucher object and signs it using this LazyMinter's signing key.
   * 
   * @param {ethers.BigNumber | number} tokenId the id of the un-minted NFT
   * @param {string} uri the metadata URI to associate with this NFT
   * 
   * @returns {NFTVoucher}
   */
   async createVoucher(tokenId: any, uri: any, wallet: any) {
    const voucher = { tokenId, uri, wallet }
    const domain = await this._signingDomain()
    const types = {
      NFTVoucher: [
        {name: "tokenId", type: "uint256"},
        {name: "wallet", type: "uint160"},
        {name: "uri", type: "string"},  
      ]
    }
    const signature = await this.signer._signTypedData(domain, types, voucher)
    return {
      ...voucher,
      signature,
    }
  }

  /**
   * @private
   * @returns {object} the EIP-721 signing domain, tied to the chainId of the signer
   */
  async _signingDomain() {
    if (this._domain != null) {
      return this._domain
    }
    const chainId = await this.contract.getChainID()
    this._domain = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contract.address,
      chainId,
    }
    return this._domain
  }
}

export default LazyMinter;