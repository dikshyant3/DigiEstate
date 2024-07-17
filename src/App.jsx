import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Search from './components/Search';

import RealEstate from './abis/RealEstate.json';
import RealEstateEscrow from './abis/RealEstateEscrow.json';
import config from './config.json'; //address json from metamask

function App() {
  const [provider, setProvider] = useState(null);
  const [escrow, setEscrow] = useState(null);
  const [account, setAccount] = useState(null);
  const [homes, setHomes] = useState([]);
  const [home, setHome] = useState({});
  const [toggle, setToggle] = useState(false);
  ////////////////////////////////////////////////////////////////////
  //connect to metamask migrated here

  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      // console.log('MetaMask Here!');

      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          // console.log('Accounts:', result);
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
          // getAccountBalance(result[0]);
        });
    } else {
      alert('Need to install MetaMask');
    }
  };
  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    if (Array.isArray(newAccount)) {
      newAccount = newAccount[0];
    }
    setAccount(newAccount);
    // console.log('Account:', newAccount);
  };
  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on('accountsChanged', accountChangedHandler);

  window.ethereum.on('chainChanged', chainChangedHandler);

  /////////////////////////////////////////////////////////////////////

  const loadBlockchainData = async () => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum); // this is v5

    //v6 version
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);
    const network = await provider.getNetwork();

    const realEstate = new ethers.Contract(
      config[network.chainId].realEstate.address,
      RealEstate,
      provider
    );
    const totalSupply = await realEstate.totalSupply();
    const homes = [];

    //Check this cannot fetch the homes
    for (var i = 1; i < totalSupply; i++) {
      try {
        const uri = await realEstate.tokenURI(i);
        const response = await fetch(uri);

        // Logging the response to inspect it
        const text = await response.text();
        // console.log(`Response from ${uri}:`, text);

        const metadata = JSON.parse(text); // Parsing the response text as JSON
        homes.push(metadata);
      } catch (error) {
        console.error(
          `Failed to fetch or parse metadata for token ${i}:`,
          error
        );
      }
    }

    setHomes(homes);
    // console.log('This is the homes');
    // console.log(homes);
    const escrow = new ethers.Contract(
      config[network.chainId].escrow.address,
      RealEstateEscrow,
      provider
    );
    setEscrow(escrow);
  };
  useEffect(() => {
    loadBlockchainData();
  }, []);

  const togglePop = (home) => {
    setHome(home);
    setToggle(!toggle);
    // console.log(home);
  };

  return (
    <div className="max-w-screen h-screen">
      <Navbar
        account={account}
        connectWalletHandler={connectWalletHandler}
        connButtonText={connButtonText}
      />

      <Search />
      <div className="homesSection mt-12 sm:mt-16 md:mt-20 ">
        <h3 className="text-3xl md:text-5xl font-bold text-gray-900 text-center pb-3 mt-4 mb-2 ">
          Homes For You
        </h3>
        <div className=" grid grid-cols-1 ml-6 sm:ml-10 md:ml-16 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center  px-5 py-3   ">
          {homes.map((home) => (
            <>
              <div
                className="w-[300px] rounded-md border cursor-pointer shadow-lg "
                key={home.id}
                onClick={() => togglePop(home)}
              >
                <img
                  src={home.image}
                  alt="Laptop"
                  className="h-[200px] w-full rounded-md object-cover"
                />
                <div className="p-4">
                  <h1 className="text-lg font-semibold">{home.name}</h1>
                  <p className="mt-3 text-sm text-gray-600">
                    <strong>{home.attributes[2].value} bds</strong> |
                    <strong>{home.attributes[3].value} ba</strong> |
                    <strong>{home.attributes[4].value} sqft</strong>
                  </p>
                  <p className="mt-2 text-sm text-gray-800">{home.address}</p>
                  <button
                    type="button"
                    className="mt-4  rounded-sm bg-black px-4 py-2 text-[14px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    {home.attributes[0].value} ETH
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      {toggle && (
        <Home
          home={home}
          provider={provider}
          account={account}
          escrow={escrow}
          togglePop={togglePop}
        />
      )}
    </div>
  );
}

export default App;
