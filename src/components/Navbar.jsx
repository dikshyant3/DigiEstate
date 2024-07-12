import { ethers } from 'ethers';
import { useState } from 'react';

const Navbar = () => {
  //newWay
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('MetaMask Here!');

      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          console.log('Accounts:', result);
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
          getAccountBalance(result[0]);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  };
  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    if (Array.isArray(newAccount)) {
      newAccount = newAccount[0];
    }
    console.log('Account:', newAccount);
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  };

  const getAccountBalance = (account) => {
    console.log('Account passed to getAccountBalance:', account);
    window.ethereum
      .request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then((balance) => {
        console.log('Balance retrieved:', balance);
        setUserBalance(ethers.utils.formatEther(balance));
        const formattedBalance = ethers.utils.formatEther(balance);
        console.log('Formatted Balance:', formattedBalance);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on('accountsChanged', accountChangedHandler);

  window.ethereum.on('chainChanged', chainChangedHandler);
  return (
    <nav className="w-full h-20 flex flex-col items-center justify-between border-2 border-red-500 bg-white text-black z-10">
      <div className="w-full flex justify-between items-center h-16 bg-white text-xl px-4 md:text-2xl">
        <div className="flex space-x-4 gap-2 border-2 border-green-800">
          <a className="border-2 border-blue-700 px-2" href="#">
            Buy
          </a>
          <a className="border-2 border-blue-700 px-2" href="#">
            Sell
          </a>
          <a className="border-2 border-blue-700 px-2" href="#">
            Rent
          </a>
          <div className="accountDisplay">
            <h3>
              Address:{' '}
              {defaultAccount
                ? defaultAccount.slice(0, 6) +
                  '...' +
                  defaultAccount.slice(38, 42)
                : ''}
            </h3>
          </div>
        </div>
        <div className="text-xl font-semibold lg:text-4xl">
          <h1>DigiEstate</h1>
          <h3>Balance: {userBalance}</h3>
        </div>
        <div>
          <button
            onClick={connectWalletHandler}
            type="button"
            className="bg-blue-700 text-white text-lg md:text-2xl px-4 py-2 border-none rounded-md ring-0 hover:bg-blue-500"
          >
            {connButtonText}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
