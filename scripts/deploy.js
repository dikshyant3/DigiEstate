import hre from 'hardhat'
import '@nomiclabs/hardhat-ethers'


const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts
  const [buyer, seller, inspector, lender] = await hre.ethers.getSigners();

  // Deploy Real Estate
  const RealEstate = await hre.ethers.getContractFactory('RealEstate');
  const realEstate = await RealEstate.deploy();
  await realEstate.waitForDeployment();

  console.log(`Deployed Real Estate Contract at: ${await realEstate.getAddress()}`);
  console.log(`Minting 7 properties...\n`);

  for (let i = 0; i < 7; i++) {
    const transaction = await realEstate.connect(seller).mint(`https://amber-additional-jay-734.mypinata.cloud/ipfs/Qmdjqg9PnmS2UEMM5PtEEJZSELHpkbpL1ZJdpivnam3ywg/${i+1}.json`);
    await transaction.wait();
  }

  // Deploy Escrow
  const RealEstateEscrow = await hre.ethers.getContractFactory('RealEstateEscrow');
  const escrow = await RealEstateEscrow.deploy(
    await realEstate.getAddress(),
    seller.address,
    inspector.address,
    lender.address
  );
  await escrow.waitForDeployment();

  console.log(`Deployed Escrow Contract at: ${await escrow.getAddress()}`);
  console.log(`Listing 7 properties...\n`);

  for (let i = 0; i < 7; i++) {
    // Approve properties...
    let transaction = await realEstate.connect(seller).approve(await escrow.getAddress(), i + 1);
    await transaction.wait();
  }

  // Listing properties...
  let transaction = await escrow.connect(seller).list(1, buyer.address, tokens(45), tokens(25));
  await transaction.wait();

  transaction = await escrow.connect(seller).list(2, buyer.address, tokens(40), tokens(22));
  await transaction.wait();

  transaction = await escrow.connect(seller).list(3, buyer.address, tokens(30), tokens(15));
  await transaction.wait();

  transaction = await escrow.connect(seller).list(4, buyer.address, tokens(35), tokens(20));
  await transaction.wait();
  
  transaction = await escrow.connect(seller).list(5, buyer.address, tokens(25), tokens(15));
  await transaction.wait();
  
  transaction = await escrow.connect(seller).list(6, buyer.address, tokens(10), tokens(5));
  await transaction.wait();
  
  transaction = await escrow.connect(seller).list(7, buyer.address, tokens(20), tokens(10));
  await transaction.wait();

  console.log(`Finished.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});