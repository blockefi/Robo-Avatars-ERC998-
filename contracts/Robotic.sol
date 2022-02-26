// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2; // required to accept structs as function parameters


import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "contracts/draft-EIP712.sol";
import "contracts/upgradeability/CustomOwnable.sol";
import "contracts/Torso.sol";
import "contracts/Item.sol";

import "hardhat/console.sol";

contract Robotic  is CustomOwnable, ReentrancyGuard, EIP712("LazyNFT-Voucher", "1") {
    bool internal isInitialized;
    bool internal session;
    uint public parentPrice;
    uint public childPrice;
    mapping (uint => uint) public childCount; 
    mapping (uint => mapping(uint => uint)) public parentToChild; //parent id => children ids array
    Item public items; 
    Torso public torso;

    /// @notice Represents an un-minted NFT, which has not yet been recorded into the blockchain. A signed voucher can be redeemed for a real NFT using the redeem function.
  struct NFTVoucher {
    uint256 tokenId;
    uint160 wallet;
    string uri;
    bytes signature;
  }
 
    /**
     * @dev !!!Important initialize needs to be called through proxy and it can be called only once
     * @param _owner set as contract's owner
     * @param _torso refers to the ERC721 contract that'll act as parent/core for all wearables
     * @param _item refers to ERC1155 contract that'll act as child/wearable to all the parents
     * @param _parentPrice price of each parent
     * @param _item price of each item/wearable
     */
    function initialize(address _owner, address _torso, address _item, uint _parentPrice, uint _childPrice) public {
        require(!isInitialized,"Robotic: Already initialized");
        _setOwner(_owner);
        torso = Torso(_torso);
        items = Item(_item);
        isInitialized = true;
        parentPrice = _parentPrice;
        childPrice = _childPrice;
    }

    /**
     * @dev Please note that the owner of the contract will have the capability to mint the parent torso (ERC721)
     *      through createTorso functionality, only current owner of the contract has access to this
     * @param torsoURI refers to the metadata of all the parents minted
     */
 
    function createTorso(uint[] calldata tokenId, string[] calldata torsoURI) external onlyOwner {
        require(tokenId.length == torsoURI.length,"Robotic: Length mismatch");
        require(torsoURI.length > 0, "Robotic: Invalid length");
        for(uint i = 0; i < torsoURI.length; i++){
            torso.mint(msg.sender, tokenId[i], torsoURI[i]);
        }
    }

    /**
     * @dev Please note that the owner of the contract will have the capability to mint the wearable items (ERC1155)
     *      through createItems functionality, only current owner of the owner has access to this
     * @param itemAmounts amount of a specific item/wearable to be created
     * @param itemURI refers to the metadata of all the wearables created by the owner
     */

    function createItems(uint[] calldata tokenId, uint[] calldata itemAmounts, string[] calldata itemURI) external onlyOwner {
        require(itemAmounts.length > 0, "Robotic: Invalid length");
        require(itemAmounts.length == itemURI.length && itemURI.length == tokenId.length, "Robotic: Length mismatch");
        for(uint i = 0; i < itemAmounts.length; i++){
            items.mint(msg.sender, tokenId[i], itemAmounts[i], itemURI[i]);
        }
    }

    /**
    * @dev let user to redeem torso/body/core by paying Eth
    * @param voucher contain receiver's wallet address, tokenId, uri and signature
     */

    function redeemTorso(NFTVoucher[] calldata voucher) external payable{
        require(session,"Robotic: session is over");
        require(msg.value >= parentPrice * (voucher.length), "Robotic: Invalid Amount");
        for(uint i = 0; i < voucher.length; i++){
            require(owner() == _verify(voucher[i]),"Robotic: Signature invalid or unauthorized");
            require(msg.sender == address(voucher[i].wallet),"Robotic: invalid address");
            torso.mint(address(voucher[i].wallet), voucher[i].tokenId, voucher[i].uri);
        }
        //ToDo: transfer eth
    }

     /**
    * @dev let user to redeem item/child by paying Eth
    * @param voucher contain receiver's wallet address, tokenId, uri and signature
     */

    function redeemItems(NFTVoucher[] calldata voucher) external payable{
        require(session,"Robotic: session is over");
        require(msg.value >= childPrice*(voucher.length), "Robotic: Invalid Amount");
        for(uint i = 0; i < voucher.length; i++){
            require(owner() == _verify(voucher[i]),"Robotic: Signature invalid or unauthorized");
            require(msg.sender == address(voucher[i].wallet),"Robotic: invalid address");
            items.mint(address(voucher[i].wallet), voucher[i].tokenId, 1, voucher[i].uri);
        }
        //ToDo: transfer eth
    }


     /**
     * @dev this lets owner of a core/body/torso equip more wearables (items) to create a complete robo avatar
     * !!!Important Note: caller must be the owner of both body/torso and item being equipped
     * @param equippeditems array of tokenIds of the item/child which is being equipped with the parent body/torso
     */

    function addItems(uint _parentId, uint[] calldata equippeditems) external {
        require(torso.ownerOf(_parentId) == msg.sender,"Robotic: Only Robot owner can add");
        require(equippeditems.length > 0, "Robotic: Invalid length");

        for(uint i = 0; i < equippeditems.length; i++){
            childCount[_parentId]++;
            items.safeTransferFrom(msg.sender, address(this), equippeditems[i], 1, "");
            parentToChild[_parentId][childCount[_parentId]] = equippeditems[i];
        }
    }


    /**
     * @dev this lets the parent unequip/remove any child/item/wearable
     * !!!Important Note: caller must be the owner of both body and item being equipped
     * @param unequippedItems array of tokenIds of the item/child which is being unequipped from the parent
     */

    function removeItems(uint _parentId, uint[] calldata unequippedItems) external {
        require(torso.ownerOf(_parentId) == msg.sender,"Robotic: Only Robot owner can remove");
        require(unequippedItems.length > 0, "Robotic: Invalid length");

        for(uint i = 0; i < unequippedItems.length; i++){
            for(uint j = 1; j <= childCount[_parentId]; j++){
                if(unequippedItems[i] == parentToChild[_parentId][j]){
                    items.safeTransferFrom(address(this), msg.sender, unequippedItems[i], 1, "");
                    parentToChild[_parentId][j] = parentToChild[_parentId][childCount[_parentId]];
                    delete parentToChild[_parentId][childCount[_parentId]];
                    childCount[_parentId]--;
                    continue;  
                }
            }
        }
    }

    /**
    * @dev transfer core/body 
    * @param to receiver address
    * @param _parentId core/body ID to transfer
     */

    function transferTorso(address to, uint _parentId) external {
        torso.transferFrom(msg.sender, to, _parentId);
    }

    /**
    * @dev transfer child/item/wearable 
    * @param to receiver address
    * @param _childId child/item/wearable ID to transfer
    * @param amount amount of child/item/wearable to transfer
     */

    function transferItem(address to, uint _childId, uint amount) external {
        items.safeTransferFrom(msg.sender, to, _childId, amount, "");
    }

    /**
    * @dev transfer child/item/wearable in batch
    * @param to receiver address
    * @param ids children/items/wearables ID to transfer
    * @param amounts amount of child/item/wearable to transfer
     */

    function transferItemsInBatch(address to, uint[] calldata ids, uint[] calldata amounts) external {
        items.safeBatchTransferFrom(msg.sender, to, ids, amounts, "");
    }
    
    /**
    * @dev change uri of core/body
    * @param id core/body's id
    * @param uri_ new uri to replace
     */

    function setItemURI(uint id, string memory uri_) external onlyOwner {
        items.setURI(id, uri_);
    }

    /**
    * @dev change uri of child/item/wearable
    * @param id child/item/wearable's id
    * @param uri_ new uri to replace
     */

    function setTorsoURI(uint id, string memory uri_) external onlyOwner {
        torso.setURI(id, uri_);
    }

     /**
     * @dev this lets owner of the contract set a common primary market price for all the parent bodies
     * @param value is value of price being set
     */

    function setTorsoPrice(uint value) public onlyOwner {
        parentPrice = value;
    }

    /**
     * @dev this lets owner of the contract set a common primary market price for all the item/wearables bodies
     * @param value is value of price being set
     */

    function setItemPrice(uint value) public onlyOwner {
        childPrice = value;
    }

    /**
     * @dev this lets owner of the contract change the address for body or item contract address
     * @param id used to determine if we're updating body or item
     * @param _changedAddress new address for item or body
     */

    function changeAddresses(uint id, address _changedAddress) external onlyOwner {
        require(id > 0 && id < 3," Robotic: Wrong Id");
        require(_changedAddress != address(0), "Robotic: Non-zero address");

        if(id == 1) {
            items = Item(_changedAddress);
        } else if(id == 2){
            torso = Torso(_changedAddress);
        }
    }

    /**
    * @notice Returns a hash of the given NFTVoucher, prepared using EIP712 typed data hashing rules.
    * @param voucher An NFTVoucher to hash.
     */ 
    function _hash(NFTVoucher calldata voucher) public view returns (bytes32) {
        return _hashTypedDataV4(keccak256(abi.encode(
        keccak256("NFTVoucher(uint256 tokenId,uint160 wallet,string uri)"),
        voucher.tokenId,
        voucher.wallet,
        keccak256(bytes(voucher.uri))
        )));
    }

    /**
    * @notice Verifies the signature for a given NFTVoucher, returning the address of the signer.
    * @dev Will revert if the signature is invalid. Does not verify that the signer is authorized to mint NFTs.
    * @param voucher An NFTVoucher describing an unminted NFT.
     */
    function _verify(NFTVoucher calldata voucher) internal view returns (address) {
        bytes32 digest = _hash(voucher);
        return ECDSA.recover(digest, voucher.signature);
    }

    /**
    * @dev return chainId of the network
     */
    function getChainID() external view returns (uint256) {
    uint256 id;
    assembly {
        id := chainid()
    }
    return id;
  }

    /**
    * @dev typeCase address to uint160
    * @notice used in signing the message
     */
    function conversion(address to) public pure returns(uint160){
        return(uint160(to));
    }

    /**
    * @dev manage session flag
     */
    function setSession(bool flag) external{
        session = flag;
    }
} 






