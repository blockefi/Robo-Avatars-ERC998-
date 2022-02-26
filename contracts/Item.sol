// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "contracts/ERC1155/ERC1155.sol";
import "contracts/MinterRole.sol";

contract Item is Ownable ,ReentrancyGuard, ERC1155("Robot"), MinterRole { 
 
    // Reads the last stored value
    function mint(address account, uint256 id, uint256 amount, string memory uri_) external onlyMinter {
        _mint(account, id, amount, "");
        _setURI(id,uri_);
    }

    function setURI(uint id, string memory uri_) external onlyMinter {
        _setURI(id, uri_);
    } 
}