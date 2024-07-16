import { expect } from 'chai';
import hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether');
};

describe('Escrow', function () {
  let buyer, seller, inspector, lender;
  let realEstate, escrow;

  beforeEach(async () => {
    // Setup accounts
    [buyer, seller, inspector, lender] = await hre.ethers.getSigners();

    // Deploy Real Estate
    const RealEstate = await hre.ethers.getContractFactory('RealEstate');
    realEstate = await RealEstate.deploy();

    // Mint
    let transaction = await realEstate
      .connect(seller)
      .mint(
        'https://amber-additional-jay-734.mypinata.cloud/ipfs/Qmb9mgbuQT1oUcCGAnpKJrPAF5XGygfY2ivKsn5JQYNLvF/metadata_1.json'
      );
    await transaction.wait();

    // Deploy Escrow
    const Escrow = await hre.ethers.getContractFactory('RealEstateEscrow');
    escrow = await Escrow.deploy(
      realEstate.target,
      seller.address,
      inspector.address,
      lender.address
    );

    // Approve Property
    transaction = await realEstate.connect(seller).approve(escrow.target, 1);
    await transaction.wait();

    // List Property
    transaction = await escrow
      .connect(seller)
      .listProperty(1, buyer.address, tokens(10), tokens(5));
    await transaction.wait();
  });

  describe('Deployment', () => {
    it('Returns NFT address', async () => {
      const result = await escrow.nftAddress();
      expect(result).to.equal(realEstate.target);
    });

    it('Returns seller', async () => {
      const result = await escrow.seller();
      expect(result).to.equal(seller.address);
    });

    it('Returns inspector', async () => {
      const result = await escrow.inspector();
      expect(result).to.equal(inspector.address);
    });

    it('Returns lender', async () => {
      const result = await escrow.lender();
      expect(result).to.equal(lender.address);
    });
  });

  describe('Listing', () => {
    it('Updates as listed', async () => {
      const result = await escrow.isPropertyListed(1);
      expect(result).to.equal(true);
    });

    it('Returns buyer', async () => {
      const result = await escrow.buyer(1);
      expect(result).to.equal(buyer.address);
    });

    it('Returns purchase price', async () => {
      const result = await escrow.propertyPrice(1);
      expect(result).to.equal(tokens(10));
    });

    it('Returns escrow amount', async () => {
      const result = await escrow.escrowAmount(1);
      expect(result).to.equal(tokens(5));
    });

    it('Updates ownership', async () => {
      expect(await realEstate.ownerOf(1)).to.equal(escrow.target);
    });
  });

  describe('Deposits', () => {
    beforeEach(async () => {
      const transaction = await escrow
        .connect(buyer)
        .depositEscrow(1, { value: tokens(5) });
      await transaction.wait();
    });

    it('Updates contract balance', async () => {
      const result = await ethers.provider.getBalance(escrow.target);
      expect(result).to.equal(tokens(5));
    });
  });

  describe('Inspection', () => {
    beforeEach(async () => {
      const transaction = await escrow
        .connect(inspector)
        .updateInspection(1, true);
      await transaction.wait();
    });

    it('Updates inspection status', async () => {
      const result = await escrow.inspectionPassed(1);
      expect(result).to.equal(true);
    });
  });

  describe('Approval', () => {
    beforeEach(async () => {
      let transaction = await escrow.connect(buyer).approvePropertySale(1);
      await transaction.wait();

      transaction = await escrow.connect(seller).approvePropertySale(1);
      await transaction.wait();

      transaction = await escrow.connect(lender).approvePropertySale(1);
      await transaction.wait();
    });

    it('Updates approval status', async () => {
      expect(await escrow.approval(1, buyer.address)).to.equal(true);
      expect(await escrow.approval(1, seller.address)).to.equal(true);
      expect(await escrow.approval(1, lender.address)).to.equal(true);
    });
  });

  describe('Sale', () => {
    beforeEach(async () => {
      let transaction = await escrow
        .connect(buyer)
        .depositEscrow(1, { value: tokens(5) });
      await transaction.wait();

      transaction = await escrow.connect(inspector).updateInspection(1, true);
      await transaction.wait();

      transaction = await escrow.connect(buyer).approvePropertySale(1);
      await transaction.wait();

      transaction = await escrow.connect(seller).approvePropertySale(1);
      await transaction.wait();

      transaction = await escrow.connect(lender).approvePropertySale(1);
      await transaction.wait();

      await lender.sendTransaction({ to: escrow.target, value: tokens(5) });

      transaction = await escrow.connect(seller).finalizePropertySale(1);
      await transaction.wait();
    });

    it('Updates ownership', async () => {
      expect(await realEstate.ownerOf(1)).to.equal(buyer.address);
    });

    it('Updates balance', async () => {
      const result = await ethers.provider.getBalance(escrow.target);
      expect(result).to.equal(0n);
    });
  });
});
