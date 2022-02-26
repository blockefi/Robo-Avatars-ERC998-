// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "contracts/MinterRole.sol";

contract Torso is Ownable ,ReentrancyGuard, ERC721URIStorage, MinterRole {

    constructor() ERC721("Robotic", "ROB"){
    }
    function mint(address _to, uint _tokenId, string memory _tokenURI) external onlyMinter {
      _mint(_to, _tokenId);
       _setTokenURI(_tokenId, _tokenURI);
    }

    function setURI(uint id, string memory uri_) external onlyMinter {
        _setTokenURI(id, uri_);
    } 
} 