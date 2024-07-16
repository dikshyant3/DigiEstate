
# DigiEstate: A Web 3.0 Solution for Real Estate Marketplaces

DigiEstate is a Web 3.0 real estate application that uses blockchain technology to make property transactions safer and more efficient. Users are able to easily navigate the website. The application's front end will interface with a smart contract that uses individual NFTs (Non-Fungible Tokens) to represent real estate properties. Each property listed in the website is tokenized as NFT which contains its unique details and metadata.

The seller lists the property and the buyer makes payment through an escrow mechanism during the transaction process. The "Buy" button on a property's NFT can be clicked by a user to make a purchase. There are some other parties such as Lenders, inspectors, and appraisers who need to approve the deal. After the approval by all parties, the buyer acquires ownership of the property and the seller is paid.

There is a group of NFTs controlling all the real estate properties on the blockchain side. To maintain decentralization and security, metadata—such as price, area, number of bedrooms, etc.—is saved on the IPFS (InterPlanetary File System). This system is controlled by two smart contracts: "RealState," which handles property listings and data, and another "RealEstateEscrow" contract that handles transactions and acquisitions. This decentralized program (DApp) offers a transparent, secure and efficient way to handle real estate transactions.

# How does it Work?



# IPFS

All the metadata of the NFT are hosted in pinata which can be accessed by using the below link. 

https://amber-additional-jay-734.mypinata.cloud/ipfs/Qmb9mgbuQT1oUcCGAnpKJrPAF5XGygfY2ivKsn5JQYNLvF/metadata_${i+1}.json



## Setup and Development Commands:

1. yarn hardhat compile
    
    - It compiles all Solidity (.sol) files in the project, converting them into Ethereum Virtual Machine (EVM) bytecode.
    
    - It also creates JSON artifacts for each contracts and generates ABIs for interacting with the contract while the byte code is deployed to the Ethereum Network.

    - Furthermore, it verifies the Solidity contract and checks for the compilation error and stored the compiled output in the artifacts folder.


2. yarn hardhat node

    This command initializes a local Ethereum network using Hardhat,    allowing us to test our smart contracts in a controlled environment. It creates a set of accounts for testing and logs transactions.

3. yarn deploy

    This command compiles and deploys our smart contracts to the local Hardhat network. It sets up the initial state of the contracts, making them ready for interaction.

4. yarn hardhat test
    This command executes the test suite for our smart contracts, ensuring that all functionalities work as intended. It verifies the integrity and reliability of the smart contracts before deployment to the main network.

5. yarn dev

    This command is used for starting the development server.



