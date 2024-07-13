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

  // const loadBlockchainData = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   setProvider(provider);

  //   const network = await provider.getNetwork();

  //   // const realEstate = new ethers.Contract(config[network.chainId].realEstate.address, RealEstate, provider)
  //   const totalSupply = await realEstate.totalSupply();
  //   const homes = [];

  //   for (var i = 1; i <= totalSupply; i++) {
  //     const uri = await realEstate.tokenURI(i);
  //     const response = await fetch(uri);
  //     const metadata = await response.json();
  //     homes.push(metadata);
  //   }
  //   setHomes(homes);

  //   // const escrow = new ethers.Contract(config[network.chainId].escrow.address, Escrow, provider)
  //   setEscrow(escrow);

  //   window.ethereum.on('accountsChanged', async () => {
  //     const accounts = await window.ethereum.request({
  //       method: 'eth_requestAccounts',
  //     });
  //     const account = ethers.utils.getAddress(accounts[0]);
  //     setAccount(account);
  //   });
  // };

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const network = await provider.getNetwork();
    console.log(
      config[network.chainId].realEstate.address,
      config[network.chainId].escrow.address
    );
  };
  useEffect(() => {
    loadBlockchainData();
  }, []);

  const togglePop = (home) => {
    setHome(home);
    setToggle(!toggle);
  };

  return (
    <div className="max-w-screen h-screen">
      <Navbar />
      <Search />
      <Home />
    </div>
  );
}

export default App;
