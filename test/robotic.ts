import {
    Robotic,
    Robotic__factory,
    Item,
    Item__factory,
    Torso,
    Torso__factory,
    OwnedUpgradeabilityProxy__factory,
    OwnedUpgradeabilityProxy,
  } from "../typechain";
  import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
  import { ethers } from "hardhat";
  import { mineBlocks } from "./utilities/utilities";
  import { expect } from "chai";
  import  LazyMinter from "./utilities/LazyMinter";
import { BigNumber } from "ethers";
  
  describe("MyContract_Upgradeable", async () => {
    let impl: Robotic;
    let myContract: Robotic;
    let torso: Torso;
    let item: Item;
    let owner: SignerWithAddress;
    let signers: SignerWithAddress[];
    let proxy: OwnedUpgradeabilityProxy;
  
    beforeEach(async () => {
      signers = await ethers.getSigners();
      owner = signers[0];
  
      proxy = await new OwnedUpgradeabilityProxy__factory(owner).deploy();
      torso = await new Torso__factory(owner).deploy();
      item = await new Item__factory(owner).deploy();
      impl = await new Robotic__factory(owner).deploy();
      myContract = await new Robotic__factory(owner).attach(proxy.address);
      const initializeData = await impl.interface.encodeFunctionData(
        "initialize",
        [owner.address,torso.address,item.address,50,20]
      );
      await proxy.connect(owner).upgradeToAndCall(impl.address, initializeData);
      await torso.addMinter(proxy.address);
      await item.addMinter(proxy.address);
    });
  
    it("retrieve returns a value previously initialized", async function () {
      // Test if the returned value is the same one
      // Note that we need to use strings to compare the 256 bit integers
      await expect(myContract.initialize(owner.address,torso.address,item.address,50,20)).to.be.revertedWith(
        "Already initialized"
      );
    });

    describe("create Robot's torso", async() =>{
        it("Create torso: Success", async() =>{
            await myContract.connect(owner).createTorso([1],["URIii"]);
            let balanceOf = await torso.balanceOf(owner.address);
            expect(balanceOf).to.be.eq(1);
        })

        it("Create torso: fail onlyOwner", async() =>{
            await expect(myContract.connect(signers[1]).createTorso([1],["URIii"])).to.be.revertedWith(
                "CustomOwnable: FORBIDDEN"
            );
        })

    })

    describe("create Robot's Items", async() =>{
        it("Create Items: Success", async() =>{
            await myContract.connect(owner).createItems([1], [10],["URIii"]);
            let balanceOf = await item.balanceOf(owner.address,1);
            expect(balanceOf).to.be.eq(10);
        })

        it("Create Items: fail onlyOwner", async() =>{
            await expect(myContract.connect(signers[1]).createItems([1], [10],["URIii"])).to.be.revertedWith(
                "CustomOwnable: FORBIDDEN"
            );
        })

        it("Check limit of Items Creation", async() =>{
            let amount = []
            let uri : string [] = [] 
            let tokenID = []
            for(let i = 1; i < 270; i++){
                tokenID.push(i)
                amount.push(200);
                uri.push(`uri${i}`);
            }
            await myContract.connect(owner).createItems(tokenID,amount,uri);
        })
    })

    describe("Add children", async() =>{
        it("add child: success", async() =>{
            await myContract.connect(owner).createTorso([1], ["URIii"]);
            await myContract.connect(owner).createItems([1,2], [10,20],["URIii","uri23"]);
            await item.connect(owner).setApprovalForAll(proxy.address,true);
            await myContract.connect(owner).addItems(1,[1,2]);
            let children = Number(await myContract.connect(owner).childCount(1));
            expect(children).to.be.eq(2);
            let child = Number(await myContract.connect(owner).parentToChild(1,1));
            expect(child).to.be.eq(1);
            child = Number(await myContract.connect(owner).parentToChild(1,2));
            expect(child).to.be.eq(2);
            let ownerOf = Number(await item.connect(owner).balanceOf(proxy.address,1));
            expect(ownerOf).to.be.eq(1);
            ownerOf = Number(await item.connect(owner).balanceOf(proxy.address,2));
            expect(ownerOf).to.be.eq(1);
        })

        it("add child: fail caller don't have parent", async() =>{
            await myContract.connect(owner).createTorso([1], ["URIii"]);
            await myContract.connect(owner).createItems([1,2], [10,20],["URIii","uri23"]);
            await item.connect(owner).safeTransferFrom(owner.address,signers[1].address,1,1,"0x");
            await item.connect(owner).safeTransferFrom(owner.address,signers[1].address,2,1,"0x");
            await item.connect(signers[1]).setApprovalForAll(proxy.address,true);
            await expect(myContract.connect(signers[1]).addItems(1,[1,2])).to.be.revertedWith("Robotic: Only Robot owner can add");
        })

        it("add child: fail caller don't have item", async() =>{
            await myContract.connect(owner).createTorso([1], ["URIii"]);
            await myContract.connect(owner).createItems([1,2], [10,20],["URIii","uri23"]);
            await torso.connect(owner).transferFrom(owner.address, signers[1].address, 1);
            await item.connect(signers[1]).setApprovalForAll(proxy.address,true);
            await expect(myContract.connect(signers[1]).addItems(1,[1,2])).to.be.revertedWith("ERC1155: insufficient balance for transfer");
        })
    })
    describe("Remove Child", async() =>{
        it("Remove child: success", async() => {
            await myContract.connect(owner).createTorso([1], ["URIii"]);
            await myContract.connect(owner).createItems([1,2], [10,20],["URIii","uri23"]);
            await torso.connect(owner).transferFrom(owner.address, signers[1].address, 1);
            await item.connect(owner).safeTransferFrom(owner.address,signers[1].address,1,1,"0x");
            await item.connect(owner).safeTransferFrom(owner.address,signers[1].address,2,1,"0x");
            await item.connect(signers[1]).setApprovalForAll(proxy.address,true);
            await myContract.connect(signers[1]).addItems(1,[1,2]);
            await myContract.connect(signers[1]).removeItems(1,[1]);
            let children = Number(await myContract.connect(owner).childCount(1));
            expect(children).to.be.eq(1);
            let child = Number(await myContract.connect(owner).parentToChild(1,1));
            expect(child).to.be.eq(2);
            let ownerOf = Number(await item.connect(owner).balanceOf(signers[1].address,1));
            expect(ownerOf).to.be.eq(1);
            ownerOf = Number(await item.connect(owner).balanceOf(proxy.address,2));
            expect(ownerOf).to.be.eq(1);
        })

        it("Remove child: fail don't have parent", async() =>{
            await myContract.connect(owner).createTorso([1], ["URIii"]);
            await myContract.connect(owner).createItems([1,2], [10,20],["URIii","uri23"]);
            await torso.connect(owner).transferFrom(owner.address, signers[1].address, 1);
            await item.connect(owner).safeTransferFrom(owner.address,signers[1].address,1,1,"0x");
            await item.connect(owner).safeTransferFrom(owner.address,signers[1].address,2,1,"0x");
            await item.connect(signers[1]).setApprovalForAll(proxy.address,true);
            await myContract.connect(signers[1]).addItems(1,[1,2]);
            await torso.connect(signers[1]).transferFrom(signers[1].address,signers[2].address,1);
            await expect(myContract.connect(signers[1]).removeItems(1,[1])).to.be.revertedWith("Robotic: Only Robot owner can remove");
        })
    })

    describe("Setter functions", async() =>{
        it("setTorsoPrice : success", async() =>{
            await myContract.connect(owner).setTorsoPrice(10);
            expect(await myContract.connect(owner).parentPrice()).to.be.eq(10);
        })

        it("setTorsoPrice : fail", async() =>{
            await expect(myContract.connect(signers[1]).setTorsoPrice(10)).to.be.revertedWith("CustomOwnable: FORBIDDEN");
        })

        it("setItemPrice : success", async() =>{
            await myContract.connect(owner).setItemPrice(10);
            expect(await myContract.connect(owner).childPrice()).to.be.eq(10);
        })

        it("setItemPrice : fail", async() =>{
            await expect(myContract.connect(signers[1]).setItemPrice(10)).to.be.revertedWith("CustomOwnable: FORBIDDEN");
        })

        it("setTorsoURI: success", async() =>{
            await myContract.connect(owner).createTorso([1], ["URIii"]);
            let uri = await torso.connect(owner).tokenURI(1);
            expect(uri).to.be.eq("URIii");
            await myContract.connect(owner).setTorsoURI(1,"NewURI");
            uri = await torso.connect(owner).tokenURI(1);
            expect(uri).to.be.eq("NewURI");
        })

        it("setTorsoURI: fail onlyOwner", async() =>{
            await myContract.connect(owner).createTorso([1], ["URIii"]);
            await expect(myContract.connect(signers[1]).setTorsoURI(1,"NewURI")).to.be.revertedWith("CustomOwnable: FORBIDDEN");
        })

        it("setItemURI: success", async() =>{
            await myContract.connect(owner).createItems([1,2], [10,20],["URIii","uri23"]);
            let uri = await item.connect(owner).uri(1);
            expect(uri).to.be.eq("URIii");
            await myContract.connect(owner).setItemURI(1,"NewURI");
            uri = await item.connect(owner).uri(1);
            expect(uri).to.be.eq("NewURI");
        })

        it("setItemURI: fail onlyOwner", async() =>{
            await myContract.connect(owner).createItems([1,2], [10,20],["URIii","uri23"]);
            await expect(myContract.connect(signers[1]).setItemURI(1,"NewURI")).to.be.revertedWith("CustomOwnable: FORBIDDEN");
        })

    })

    describe("transfer", async() =>{
        it("transfer torso: success",async() =>{
            await myContract.connect(owner).createTorso([1], ["URIii"]);
            await torso.connect(owner).transferFrom(owner.address, signers[1].address, 1);
            await torso.connect(signers[1]).approve(proxy.address,1);
            await myContract.connect(signers[1]).transferTorso(signers[2].address,1);
            let balanceOf = await torso.balanceOf(signers[2].address);
            expect(balanceOf).to.be.eq(1);
            let ownerof = await torso.ownerOf(1);
            expect(ownerof).to.be.eq(signers[2].address);
        })

        it("transfer item: success", async() =>{
            await myContract.connect(owner).createItems([1,2], [10,20],["URIii","uri23"]);
            await item.connect(owner).safeTransferFrom(owner.address,signers[1].address,1,5,"0x");
            await item.connect(owner).safeTransferFrom(owner.address,signers[1].address,2,10,"0x");
            await item.connect(signers[1]).setApprovalForAll(proxy.address,true);
            await myContract.connect(signers[1]).transferItem(signers[2].address,1,3);
            let ownerOf = Number(await item.connect(owner).balanceOf(signers[2].address,1));
            expect(ownerOf).to.be.eq(3);
        })

        it("transfer items in batch: success", async() =>{
            await myContract.connect(owner).createItems([1,2], [10,20],["URIii","uri23"]);
            await item.connect(owner).safeTransferFrom(owner.address,signers[1].address,1,5,"0x");
            await item.connect(owner).safeTransferFrom(owner.address,signers[1].address,2,10,"0x");
            await item.connect(signers[1]).setApprovalForAll(proxy.address,true);
            await myContract.connect(signers[1]).transferItemsInBatch(signers[2].address,[1,2],[3,6]);
            let ownerOf = Number(await item.connect(owner).balanceOf(signers[2].address,1));
            expect(ownerOf).to.be.eq(3);
            ownerOf = Number(await item.connect(owner).balanceOf(signers[2].address,2));
            expect(ownerOf).to.be.eq(6);
        })
        
    })

    describe("redeem", async() =>{
        it("redeem torso: success", async() =>{
            await myContract.setSession(true);
            const lazyMinter = new LazyMinter({_contract:myContract, _signer:signers[0]});
            const voucher:any = await lazyMinter.createVoucher(1,"ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi", await myContract.conversion(signers[1].address));
            const vouchers = [];
            vouchers.push(voucher);
            await myContract.setTorsoPrice(10);
            await myContract.connect(signers[1]).redeemTorso(vouchers, {value: 100});
            expect(await torso.balanceOf(signers[1].address)).to.be.eq(1);
        })

        it("redeem torso: fail session over", async() => {
            const lazyMinter = new LazyMinter({_contract:myContract, _signer:signers[0]});
            const voucher:any = await lazyMinter.createVoucher(1,"ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi", await myContract.conversion(signers[1].address));
            const vouchers = [];
            vouchers.push(voucher);
            await expect(myContract.connect(signers[1]).redeemTorso(vouchers, {value: 100})).to.be.revertedWith("Robotic: session is over");    
        })

        it("redeem torso: fail Invalid Amount", async() => {
            await myContract.setSession(true);
            const lazyMinter = new LazyMinter({_contract:myContract, _signer:signers[0]});
            const voucher:any = await lazyMinter.createVoucher(1,"ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi", await myContract.conversion(signers[1].address));
            const vouchers = [];
            vouchers.push(voucher);
            await expect(myContract.connect(signers[1]).redeemTorso(vouchers, {value: 1})).to.be.revertedWith("Robotic: Invalid Amount");    
        })

        it("redeem torso: fail Signature invalid or unauthorized", async() =>{
            await myContract.setSession(true);
            const lazyMinter = new LazyMinter({_contract:myContract, _signer:signers[1]});
            const voucher:any = await lazyMinter.createVoucher(1,"ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi", await myContract.conversion(signers[1].address));
            const vouchers = [];
            vouchers.push(voucher);
            await myContract.setTorsoPrice(10);
            await expect(myContract.connect(signers[1]).redeemTorso(vouchers, {value: 100})).to.be.revertedWith("Robotic: Signature invalid or unauthorized");    
        })

        it("redeem torso: fail invalid address", async() =>{
            await myContract.setSession(true);
            const lazyMinter = new LazyMinter({_contract:myContract, _signer:signers[0]});
            const voucher:any = await lazyMinter.createVoucher(1,"ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi", await myContract.conversion(signers[0].address));
            const vouchers = [];
            vouchers.push(voucher);
            await myContract.setTorsoPrice(10);
            await expect(myContract.connect(signers[1]).redeemTorso(vouchers, {value: 100})).to.be.revertedWith("Robotic: invalid address");    
        })

        it("redeem item: success", async() =>{
            await myContract.setSession(true);
            const lazyMinter = new LazyMinter({_contract:myContract, _signer:signers[0]});
            const voucher:any = await lazyMinter.createVoucher(1,"ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi", await myContract.conversion(signers[1].address));
            const vouchers = [];
            vouchers.push(voucher);
            await myContract.setItemPrice(10);
            await myContract.connect(signers[1]).redeemItems(vouchers, {value: 100});
            expect(await item.balanceOf(signers[1].address,1)).to.be.eq(1);
        })

        it("redeem item: fail session over", async() => {
            const lazyMinter = new LazyMinter({_contract:myContract, _signer:signers[0]});
            const voucher:any = await lazyMinter.createVoucher(1,"ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi", await myContract.conversion(signers[1].address));
            const vouchers = [];
            vouchers.push(voucher);
            await expect(myContract.connect(signers[1]).redeemItems(vouchers, {value: 100})).to.be.revertedWith("Robotic: session is over");    
        })

        it("redeem item: fail Invalid Amount", async() => {
            await myContract.setSession(true);
            const lazyMinter = new LazyMinter({_contract:myContract, _signer:signers[0]});
            const voucher:any = await lazyMinter.createVoucher(1,"ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi", await myContract.conversion(signers[1].address));
            const vouchers = [];
            vouchers.push(voucher);
            await expect(myContract.connect(signers[1]).redeemItems(vouchers, {value: 1})).to.be.revertedWith("Robotic: Invalid Amount");    
        })

        it("redeem item: fail Signature invalid or unauthorized", async() =>{
            await myContract.setSession(true);
            const lazyMinter = new LazyMinter({_contract:myContract, _signer:signers[1]});
            const voucher:any = await lazyMinter.createVoucher(1,"ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi", await myContract.conversion(signers[1].address));
            const vouchers = [];
            vouchers.push(voucher);
            await myContract.setItemPrice(10);
            await expect(myContract.connect(signers[1]).redeemItems(vouchers, {value: 100})).to.be.revertedWith("Robotic: Signature invalid or unauthorized");    
        })

        it("redeem item: fail invalid address", async() =>{
            await myContract.setSession(true);
            const lazyMinter = new LazyMinter({_contract:myContract, _signer:signers[0]});
            const voucher:any = await lazyMinter.createVoucher(1,"ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi", await myContract.conversion(signers[0].address));
            const vouchers = [];
            vouchers.push(voucher);
            await myContract.setItemPrice(10);
            await expect(myContract.connect(signers[1]).redeemItems(vouchers, {value: 100})).to.be.revertedWith("Robotic: invalid address");    
        })
    })
  });
  