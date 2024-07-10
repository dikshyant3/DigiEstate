import { expect } from 'chai';
import hre from 'hardhat';

const { ethers } = hre;

describe('RealEstateEscrow', () => {
    let realEstate, escrow;
    let buyer, owner, inspector, lender;

    it('saves the address', async () => {
        try {
            // Setup Accounts
            [buyer, owner, inspector, lender] = await ethers.getSigners();

            console.log("Buyer:", buyer.address);
            console.log("Owner:", owner.address);
            console.log("Inspector:", inspector.address);
            console.log("Lender:", lender.address);

            // Deploy RealEstate
            const RealEstate = await ethers.getContractFactory('RealEstate');
            realEstate = await RealEstate.deploy();

            console.log("RealEstate deployed to:", realEstate.address);

            // Check if realEstate.address is defined
            if (!realEstate.address) {
                throw new Error("RealEstate address is undefined");
            }

            // Deploy RealEstateEscrow
            const RealEstateEscrow = await ethers.getContractFactory('RealEstateEscrow');
            escrow = await RealEstateEscrow.deploy(
                realEstate.address,
                owner.address,
                inspector.address,
                lender.address
            );

            console.log("RealEstateEscrow deployed to:", escrow.address);

            // Add some assertions
            expect(realEstate.address).to.be.properAddress;
            expect(escrow.address).to.be.properAddress;
        } catch (error) {
            console.error("Error occurred:", error);
            throw error;
        }
    });
});