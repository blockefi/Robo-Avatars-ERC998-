/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { Torso } from "../Torso";

export class Torso__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Torso> {
    return super.deploy(overrides || {}) as Promise<Torso>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Torso {
    return super.attach(address) as Torso;
  }
  connect(signer: Signer): Torso__factory {
    return super.connect(signer) as Torso__factory;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Torso {
    return new Contract(address, _abi, signerOrProvider) as Torso;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "MinterAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "MinterRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "addMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isMinter",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_tokenURI",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "uri_",
        type: "string",
      },
    ],
    name: "setURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600781526020017f526f626f746963000000000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f524f4200000000000000000000000000000000000000000000000000000000008152506000620000906200018060201b60201c565b9050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3506001808190555081600290805190602001906200014d92919062000282565b5080600390805190602001906200016692919062000282565b5050506200017a336200018860201b60201c565b62000397565b600033905090565b620001a3816009620001e960201b620010e91790919060201c565b8073ffffffffffffffffffffffffffffffffffffffff167f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f660405160405180910390a250565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156200022457600080fd5b60018260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b828054620002909062000332565b90600052602060002090601f016020900481019282620002b4576000855562000300565b82601f10620002cf57805160ff191683800117855562000300565b8280016001018555821562000300579182015b82811115620002ff578251825591602001919060010190620002e2565b5b5090506200030f919062000313565b5090565b5b808211156200032e57600081600090555060010162000314565b5090565b600060028204905060018216806200034b57607f821691505b6020821081141562000362576200036162000368565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b61327880620003a76000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c80638da5cb5b116100b8578063aa271e1a1161007c578063aa271e1a14610312578063b88d4fde14610342578063c87b56dd1461035e578063d3fc98641461038e578063e985e9c5146103aa578063f2fde38b146103da57610137565b80638da5cb5b1461029457806395d89b41146102b2578063983b2d56146102d057806398650275146102ec578063a22cb465146102f657610137565b806342842e0e116100ff57806342842e0e146101f25780636352211e1461020e57806370a082311461023e578063715018a61461026e578063862440e21461027857610137565b806301ffc9a71461013c57806306fdde031461016c578063081812fc1461018a578063095ea7b3146101ba57806323b872dd146101d6575b600080fd5b610156600480360381019061015191906122d2565b6103f6565b6040516101639190612b90565b60405180910390f35b6101746104d8565b6040516101819190612bab565b60405180910390f35b6101a4600480360381019061019f9190612324565b61056a565b6040516101b19190612b29565b60405180910390f35b6101d460048036038101906101cf919061222f565b6105ef565b005b6101f060048036038101906101eb9190612129565b610707565b005b61020c60048036038101906102079190612129565b610767565b005b61022860048036038101906102239190612324565b610787565b6040516102359190612b29565b60405180910390f35b610258600480360381019061025391906120c4565b610839565b6040516102659190612e0d565b60405180910390f35b6102766108f1565b005b610292600480360381019061028d919061234d565b610a2b565b005b61029c610a4b565b6040516102a99190612b29565b60405180910390f35b6102ba610a74565b6040516102c79190612bab565b60405180910390f35b6102ea60048036038101906102e591906120c4565b610b06565b005b6102f4610b24565b005b610310600480360381019061030b91906121f3565b610b2f565b005b61032c600480360381019061032791906120c4565b610cb0565b6040516103399190612b90565b60405180910390f35b61035c60048036038101906103579190612178565b610ccd565b005b61037860048036038101906103739190612324565b610d2f565b6040516103859190612bab565b60405180910390f35b6103a860048036038101906103a3919061226b565b610e81565b005b6103c460048036038101906103bf91906120ed565b610eac565b6040516103d19190612b90565b60405180910390f35b6103f460048036038101906103ef91906120c4565b610f40565b005b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806104c157507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806104d157506104d082611181565b5b9050919050565b6060600280546104e79061306d565b80601f01602080910402602001604051908101604052809291908181526020018280546105139061306d565b80156105605780601f1061053557610100808354040283529160200191610560565b820191906000526020600020905b81548152906001019060200180831161054357829003601f168201915b5050505050905090565b6000610575826111eb565b6105b4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105ab90612d4d565b60405180910390fd5b6006600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006105fa82610787565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561066b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161066290612dcd565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1661068a611257565b73ffffffffffffffffffffffffffffffffffffffff1614806106b957506106b8816106b3611257565b610eac565b5b6106f8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106ef90612c8d565b60405180910390fd5b610702838361125f565b505050565b610718610712611257565b82611318565b610757576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161074e90612ded565b60405180910390fd5b6107628383836113f6565b505050565b61078283838360405180602001604052806000815250610ccd565b505050565b6000806004600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610830576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082790612ccd565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156108aa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108a190612cad565b60405180910390fd5b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6108f9611257565b73ffffffffffffffffffffffffffffffffffffffff16610917610a4b565b73ffffffffffffffffffffffffffffffffffffffff161461096d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161096490612d6d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a360008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b610a3433610cb0565b610a3d57600080fd5b610a478282611652565b5050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060038054610a839061306d565b80601f0160208091040260200160405190810160405280929190818152602001828054610aaf9061306d565b8015610afc5780601f10610ad157610100808354040283529160200191610afc565b820191906000526020600020905b815481529060010190602001808311610adf57829003601f168201915b5050505050905090565b610b0f33610cb0565b610b1857600080fd5b610b21816116c6565b50565b610b2d33611720565b565b610b37611257565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610ba5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b9c90612c4d565b60405180910390fd5b8060076000610bb2611257565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff16610c5f611257565b73ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610ca49190612b90565b60405180910390a35050565b6000610cc682600961177a90919063ffffffff16565b9050919050565b610cde610cd8611257565b83611318565b610d1d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d1490612ded565b60405180910390fd5b610d298484848461180c565b50505050565b6060610d3a826111eb565b610d79576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d7090612d2d565b60405180910390fd5b6000600860008481526020019081526020016000208054610d999061306d565b80601f0160208091040260200160405190810160405280929190818152602001828054610dc59061306d565b8015610e125780601f10610de757610100808354040283529160200191610e12565b820191906000526020600020905b815481529060010190602001808311610df557829003601f168201915b505050505090506000610e23611868565b9050600081511415610e39578192505050610e7c565b600082511115610e6e578082604051602001610e56929190612b05565b60405160208183030381529060405292505050610e7c565b610e778461187f565b925050505b919050565b610e8a33610cb0565b610e9357600080fd5b610e9d8383611926565b610ea78282611652565b505050565b6000600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b610f48611257565b73ffffffffffffffffffffffffffffffffffffffff16610f66610a4b565b73ffffffffffffffffffffffffffffffffffffffff1614610fbc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fb390612d6d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561102c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161102390612bed565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561112357600080fd5b60018260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166004600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b600033905090565b816006600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff166112d283610787565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000611323826111eb565b611362576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161135990612c6d565b60405180910390fd5b600061136d83610787565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614806113dc57508373ffffffffffffffffffffffffffffffffffffffff166113c48461056a565b73ffffffffffffffffffffffffffffffffffffffff16145b806113ed57506113ec8185610eac565b5b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff1661141682610787565b73ffffffffffffffffffffffffffffffffffffffff161461146c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161146390612d8d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156114dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114d390612c2d565b60405180910390fd5b6114e7838383611af4565b6114f260008261125f565b6001600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546115429190612f83565b925050819055506001600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546115999190612efc565b92505081905550816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b61165b826111eb565b61169a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161169190612ced565b60405180910390fd5b806008600084815260200190815260200160002090805190602001906116c1929190611ee8565b505050565b6116da8160096110e990919063ffffffff16565b8073ffffffffffffffffffffffffffffffffffffffff167f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f660405160405180910390a250565b611734816009611af990919063ffffffff16565b8073ffffffffffffffffffffffffffffffffffffffff167fe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb6669260405160405180910390a250565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156117b557600080fd5b8260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6118178484846113f6565b61182384848484611b91565b611862576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161185990612bcd565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b606061188a826111eb565b6118c9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118c090612dad565b60405180910390fd5b60006118d3611868565b905060008151116118f3576040518060200160405280600081525061191e565b806118fd84611d28565b60405160200161190e929190612b05565b6040516020818303038152906040525b915050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611996576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161198d90612d0d565b60405180910390fd5b61199f816111eb565b156119df576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119d690612c0d565b60405180910390fd5b6119eb60008383611af4565b6001600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611a3b9190612efc565b92505081905550816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611b3357600080fd5b60008260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b6000611bb28473ffffffffffffffffffffffffffffffffffffffff16611ed5565b15611d1b578373ffffffffffffffffffffffffffffffffffffffff1663150b7a02611bdb611257565b8786866040518563ffffffff1660e01b8152600401611bfd9493929190612b44565b602060405180830381600087803b158015611c1757600080fd5b505af1925050508015611c4857506040513d601f19601f82011682018060405250810190611c4591906122fb565b60015b611ccb573d8060008114611c78576040519150601f19603f3d011682016040523d82523d6000602084013e611c7d565b606091505b50600081511415611cc3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611cba90612bcd565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050611d20565b600190505b949350505050565b60606000821415611d70576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050611ed0565b600082905060005b60008214611da2578080611d8b9061309f565b915050600a82611d9b9190612f52565b9150611d78565b60008167ffffffffffffffff811115611de4577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015611e165781602001600182028036833780820191505090505b5090505b60008514611ec957600182611e2f9190612f83565b9150600a85611e3e91906130e8565b6030611e4a9190612efc565b60f81b818381518110611e86577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a85611ec29190612f52565b9450611e1a565b8093505050505b919050565b600080823b905060008111915050919050565b828054611ef49061306d565b90600052602060002090601f016020900481019282611f165760008555611f5d565b82601f10611f2f57805160ff1916838001178555611f5d565b82800160010185558215611f5d579182015b82811115611f5c578251825591602001919060010190611f41565b5b509050611f6a9190611f6e565b5090565b5b80821115611f87576000816000905550600101611f6f565b5090565b6000611f9e611f9984612e59565b612e28565b905082815260208101848484011115611fb657600080fd5b611fc184828561302b565b509392505050565b6000611fdc611fd784612e89565b612e28565b905082815260208101848484011115611ff457600080fd5b611fff84828561302b565b509392505050565b600081359050612016816131e6565b92915050565b60008135905061202b816131fd565b92915050565b60008135905061204081613214565b92915050565b60008151905061205581613214565b92915050565b600082601f83011261206c57600080fd5b813561207c848260208601611f8b565b91505092915050565b600082601f83011261209657600080fd5b81356120a6848260208601611fc9565b91505092915050565b6000813590506120be8161322b565b92915050565b6000602082840312156120d657600080fd5b60006120e484828501612007565b91505092915050565b6000806040838503121561210057600080fd5b600061210e85828601612007565b925050602061211f85828601612007565b9150509250929050565b60008060006060848603121561213e57600080fd5b600061214c86828701612007565b935050602061215d86828701612007565b925050604061216e868287016120af565b9150509250925092565b6000806000806080858703121561218e57600080fd5b600061219c87828801612007565b94505060206121ad87828801612007565b93505060406121be878288016120af565b925050606085013567ffffffffffffffff8111156121db57600080fd5b6121e78782880161205b565b91505092959194509250565b6000806040838503121561220657600080fd5b600061221485828601612007565b92505060206122258582860161201c565b9150509250929050565b6000806040838503121561224257600080fd5b600061225085828601612007565b9250506020612261858286016120af565b9150509250929050565b60008060006060848603121561228057600080fd5b600061228e86828701612007565b935050602061229f868287016120af565b925050604084013567ffffffffffffffff8111156122bc57600080fd5b6122c886828701612085565b9150509250925092565b6000602082840312156122e457600080fd5b60006122f284828501612031565b91505092915050565b60006020828403121561230d57600080fd5b600061231b84828501612046565b91505092915050565b60006020828403121561233657600080fd5b6000612344848285016120af565b91505092915050565b6000806040838503121561236057600080fd5b600061236e858286016120af565b925050602083013567ffffffffffffffff81111561238b57600080fd5b61239785828601612085565b9150509250929050565b6123aa81612fb7565b82525050565b6123b981612fc9565b82525050565b60006123ca82612eb9565b6123d48185612ecf565b93506123e481856020860161303a565b6123ed816131d5565b840191505092915050565b600061240382612ec4565b61240d8185612ee0565b935061241d81856020860161303a565b612426816131d5565b840191505092915050565b600061243c82612ec4565b6124468185612ef1565b935061245681856020860161303a565b80840191505092915050565b600061246f603283612ee0565b91507f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008301527f63656976657220696d706c656d656e74657200000000000000000000000000006020830152604082019050919050565b60006124d5602683612ee0565b91507f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008301527f64647265737300000000000000000000000000000000000000000000000000006020830152604082019050919050565b600061253b601c83612ee0565b91507f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006000830152602082019050919050565b600061257b602483612ee0565b91507f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008301527f72657373000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b60006125e1601983612ee0565b91507f4552433732313a20617070726f766520746f2063616c6c6572000000000000006000830152602082019050919050565b6000612621602c83612ee0565b91507f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860008301527f697374656e7420746f6b656e00000000000000000000000000000000000000006020830152604082019050919050565b6000612687603883612ee0565b91507f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760008301527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006020830152604082019050919050565b60006126ed602a83612ee0565b91507f4552433732313a2062616c616e636520717565727920666f7220746865207a6560008301527f726f2061646472657373000000000000000000000000000000000000000000006020830152604082019050919050565b6000612753602983612ee0565b91507f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460008301527f656e7420746f6b656e00000000000000000000000000000000000000000000006020830152604082019050919050565b60006127b9602e83612ee0565b91507f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60008301527f6578697374656e7420746f6b656e0000000000000000000000000000000000006020830152604082019050919050565b600061281f602083612ee0565b91507f4552433732313a206d696e7420746f20746865207a65726f20616464726573736000830152602082019050919050565b600061285f603183612ee0565b91507f45524337323155524953746f726167653a2055524920717565727920666f722060008301527f6e6f6e6578697374656e7420746f6b656e0000000000000000000000000000006020830152604082019050919050565b60006128c5602c83612ee0565b91507f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860008301527f697374656e7420746f6b656e00000000000000000000000000000000000000006020830152604082019050919050565b600061292b602083612ee0565b91507f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726000830152602082019050919050565b600061296b602983612ee0565b91507f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960008301527f73206e6f74206f776e00000000000000000000000000000000000000000000006020830152604082019050919050565b60006129d1602f83612ee0565b91507f4552433732314d657461646174613a2055524920717565727920666f72206e6f60008301527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006020830152604082019050919050565b6000612a37602183612ee0565b91507f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008301527f72000000000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612a9d603183612ee0565b91507f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60008301527f776e6572206e6f7220617070726f7665640000000000000000000000000000006020830152604082019050919050565b612aff81613021565b82525050565b6000612b118285612431565b9150612b1d8284612431565b91508190509392505050565b6000602082019050612b3e60008301846123a1565b92915050565b6000608082019050612b5960008301876123a1565b612b6660208301866123a1565b612b736040830185612af6565b8181036060830152612b8581846123bf565b905095945050505050565b6000602082019050612ba560008301846123b0565b92915050565b60006020820190508181036000830152612bc581846123f8565b905092915050565b60006020820190508181036000830152612be681612462565b9050919050565b60006020820190508181036000830152612c06816124c8565b9050919050565b60006020820190508181036000830152612c268161252e565b9050919050565b60006020820190508181036000830152612c468161256e565b9050919050565b60006020820190508181036000830152612c66816125d4565b9050919050565b60006020820190508181036000830152612c8681612614565b9050919050565b60006020820190508181036000830152612ca68161267a565b9050919050565b60006020820190508181036000830152612cc6816126e0565b9050919050565b60006020820190508181036000830152612ce681612746565b9050919050565b60006020820190508181036000830152612d06816127ac565b9050919050565b60006020820190508181036000830152612d2681612812565b9050919050565b60006020820190508181036000830152612d4681612852565b9050919050565b60006020820190508181036000830152612d66816128b8565b9050919050565b60006020820190508181036000830152612d868161291e565b9050919050565b60006020820190508181036000830152612da68161295e565b9050919050565b60006020820190508181036000830152612dc6816129c4565b9050919050565b60006020820190508181036000830152612de681612a2a565b9050919050565b60006020820190508181036000830152612e0681612a90565b9050919050565b6000602082019050612e226000830184612af6565b92915050565b6000604051905081810181811067ffffffffffffffff82111715612e4f57612e4e6131a6565b5b8060405250919050565b600067ffffffffffffffff821115612e7457612e736131a6565b5b601f19601f8301169050602081019050919050565b600067ffffffffffffffff821115612ea457612ea36131a6565b5b601f19601f8301169050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b6000612f0782613021565b9150612f1283613021565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612f4757612f46613119565b5b828201905092915050565b6000612f5d82613021565b9150612f6883613021565b925082612f7857612f77613148565b5b828204905092915050565b6000612f8e82613021565b9150612f9983613021565b925082821015612fac57612fab613119565b5b828203905092915050565b6000612fc282613001565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b8381101561305857808201518184015260208101905061303d565b83811115613067576000848401525b50505050565b6000600282049050600182168061308557607f821691505b6020821081141561309957613098613177565b5b50919050565b60006130aa82613021565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156130dd576130dc613119565b5b600182019050919050565b60006130f382613021565b91506130fe83613021565b92508261310e5761310d613148565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b6131ef81612fb7565b81146131fa57600080fd5b50565b61320681612fc9565b811461321157600080fd5b50565b61321d81612fd5565b811461322857600080fd5b50565b61323481613021565b811461323f57600080fd5b5056fea264697066735822122033a1943d8b39700c978fb060353ab29d4b1ce37d6394ee2288f9c573c7a9de6864736f6c63430008000033";