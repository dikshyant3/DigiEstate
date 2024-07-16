
# DigiEstate: A Web 3.0 Solution for Real Estate Marketplaces

DigiEstate is a Web 3.0 real estate application that uses blockchain technology to make property transactions safer and more efficient. Users are able to easily navigate the website. The application's front end will interface with a smart contract that uses individual NFTs (Non-Fungible Tokens) to represent real estate properties allowing users to navigate with ease.

## Features

- **NFT Tokenization** : Each property is tokenized as NFT which contains its unique details and metadata.
- **Secure Transactions** : An Escrow mechanism ensures secure payment process.
- **Multi-party Approval** : Lenders, inspector, and appraisers are the ones involved with transaction approval.
- **Decentralized Architecture** : The metadata also, is kept on the IPFS so as to exercising the feature of security along with decentralization.

 This system is controlled by two smart contracts: "RealState," which handles property listings and data, and another "RealEstateEscrow" contract that handles transactions and acquisitions. This decentralized program (DApp) offers a transparent, secure and efficient way to handle real estate transactions.

## How It Works?


## Architecture Overview

The DApp operates with two primary contracts:

- RealEstate: Responsible for minting tokens to represent the real estate properties, assigning unique URIs to each token and maintaining the track of total amount of tokens issued.
- RealEstateEscrow: controls the entire flow of real estate NFTs’ sales, from listing to determining the escrow deposits, inspections, approvals of all the parties involved, closing of properties, cancellations, and, finally distribution of funds.

  
## IPFS Integration

All the metadata of the NFT are hosted in pinata which can be accessed by using the below link. 

```https://amber-additional-jay-734.mypinata.cloud/ipfs/Qmb9mgbuQT1oUcCGAnpKJrPAF5XGygfY2ivKsn5JQYNLvF/metadata_${i+1}.json```



## Setup and Development Commands:

1. **Compile Contracts**:
   ```bash
    yarn hardhat compile
    ```
    
    - It compiles all Solidity (.sol) files in the project, converting them into Ethereum Virtual Machine (EVM) bytecode.
    
    - It also creates JSON artifacts for each contracts and generates ABIs for interacting with the contract while the byte code is deployed to the Ethereum Network.

    - Furthermore, it verifies the Solidity contract and checks for the compilation error and stored the compiled output in the artifacts folder.


2. **Start Local Network**:
   ```bash
    yarn hardhat node
    ```
   
   - This command initializes a local Ethereum network using Hardhat,    allowing us to test our smart contracts in a controlled environment. It creates a set of accounts for testing and logs transactions.

3. **Deploy Contracts**:
    ```bash
    yarn deploy
    ```

    - This command compiles and deploys our smart contracts to the local Hardhat network. It sets up the initial state of the contracts, making them ready for interaction.

4. **Run Tests**:
    ```bash
    yarn hardhat test
    ```

   - This command executes the test suite for our smart contracts, ensuring that all functionalities work as intended. It verifies the integrity and reliability of the smart contracts before deployment to the main network.

5. **Start Development Server**:
    ```bash
    yarn dev
    ```

    This command is used for starting the development server.




