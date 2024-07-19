# DigiEstate: A Web 3.0 Solution for Real Estate Marketplaces

DigiEstate is a Web 3.0 real estate application that uses blockchain technology to make property transactions safer and more efficient. Users are able to easily navigate the website. The application's front end will interface with a smart contract that uses individual NFTs (Non-Fungible Tokens) to represent real estate properties allowing users to navigate with ease.

## Features

- **NFT Tokenization** : Each property is tokenized as NFT which contains its unique details and metadata.
- **Secure Transactions** : An Escrow mechanism ensures secure payment process.
- **Multi-party Approval** : Lenders, inspector, and appraisers are the ones involved with transaction approval.
- **Decentralized Architecture** : The metadata also, is kept on the IPFS so as to exercising the feature of security along with decentralization.

This system is controlled by two smart contracts: "RealState," which handles property listings and data, and another "RealEstateEscrow" contract that handles transactions and acquisitions. This decentralized program (DApp) offers a transparent, secure and efficient way to handle real estate transactions.

## Parties Involved

1. **Buyer**: Initiates the property purchase and deposits funds into escrow.
2. **Inspector**: Conducts the property inspection and approves it if satisfactory.
3. **Lender**: Provides the remaining funds after inspection approval.
4. **Seller**: Transfers the property to the buyer and receives the payment.

## Workflow

1. **Buyer** clicks the "Buy" button to initiate the purchase.
2. Buyer deposits a certain amount into the `escrow` contract.
3. **Inspector** inspects the property and approves the inspection.
4. **Lender** verifies the inspection and provides the remaining funds.
5. **Seller** transfers the property to the buyer.
6. The amount is transferred to the seller, and the property ownership is transferred to the buyer.

## How It Works?

## Architecture Overview

The DApp operates with two primary contracts:

- RealEstate: Responsible for minting tokens to represent the real estate properties, assigning unique URIs to each token and maintaining the track of total amount of tokens issued.
- RealEstateEscrow: controls the entire flow of real estate NFTs’ sales, from listing to determining the escrow deposits, inspections, approvals of all the parties involved, closing of properties, cancellations, and, finally distribution of funds.

## IPFS Integration

All the metadata of the NFT are hosted in pinata which can be accessed by using the below link.

```bash
https://amber-additional-jay-734.mypinata.cloud/ipfs/Qmb9mgbuQT1oUcCGAnpKJrPAF5XGygfY2ivKsn5JQYNLvF/
```

## Setup and Development Commands:

1. **Compile Contracts**:

   ```bash
    yarn hardhat compile
   ```

   or

   ```bash
    npx hardhat compile
   ```

   - It compiles all Solidity (.sol) files in the project, converting them into Ethereum Virtual Machine (EVM) bytecode.

   - It also creates JSON artifacts for each contracts and generates ABIs for interacting with the contract while the byte code is deployed to the Ethereum Network.

   - Furthermore, it verifies the Solidity contract and checks for the compilation error and stored the compiled output in the artifacts folder.

2. **Start Local Network**:

   ```bash
    yarn hardhat node
   ```

   or

   ```bash
   npx hardhat node
   ```

   - This command initializes a local Ethereum network using Hardhat, allowing us to test our smart contracts in a controlled environment. It creates a set of accounts for testing and logs transactions.

3. **Deploy Contracts**:

   ```bash
   yarn deploy
   ```

   or

   ```bash
   npx hardhat run ./scripts/deploy.js --network localhost
   ```

   - This command compiles and deploys our smart contracts to the local Hardhat network. It sets up the initial state of the contracts, making them ready for interaction.

4. **Run Tests**:

   ```bash
   yarn hardhat test
   ```

   or

   ```bash
   npx hardhat test
   ```

   - This command executes the test suite for our smart contracts, ensuring that all functionalities work as intended. It verifies the integrity and reliability of the smart contracts before deployment to the main network.

5. **Start Development Server**:

   ```bash
   yarn dev
   ```

   or

   ```bash
   npm run dev
   ```

   This command is used for starting the development server.

## MetaMask Integration

1. **Install MetaMask Extension**

   - Install the MetaMask extension in your web browser from the [MetaMask website](https://metamask.io/).

2. **Create a Hardhat Local Network in MetaMask**

   - Open MetaMask and go to the network selector dropdown at the top.
   - Click on "Add Network" or "Custom RPC".
   - Enter the following details:
     - **Network Name**: `hardhat`
     - **New RPC URL**: `http://127.0.0.1:8545/`
     - **Chain ID**: `31337`
     - **Currency Symbol**: (You can enter anything, e.g., `ETH`)

3. **Import Accounts into MetaMask**
   - After connecting to the Hardhat local network, import the first 4 private addresses that you get from the local Hardhat node. These accounts will represent the Buyer, Seller, Inspector, and Lender, respectively.
   - To import these accounts:
     - Click on the account icon at the top right of MetaMask.
     - Select "Import Account".
     - Enter the private key for the respective account (you can find these keys in the Hardhat console output when you start the Hardhat node).

![Real Estate dApp Screenshot](./src/assets/digiestate.png)
