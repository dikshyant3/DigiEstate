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
    console.log('This is the homes');
    console.log(homes);
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
  };

  return (
    <div className="max-w-screen h-screen">
      <Navbar />
      <Search />
      <div className="homesSection border-2 border-red-600">
        <h3 className="text-3xl font-bold text-gray-900 text-center mt-4 mb-2 ">
          Homes for you
        </h3>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center border-2 px-5 py-3  border-green-500 ">
          {homes.map((home) => (
            <>
              <div
                className="w-[300px] rounded-md border cursor-pointer"
                key={home.id}
              >
                <img
                  src={home.image}
                  alt="Laptop"
                  className="h-[200px] w-full rounded-md object-cover"
                />
                <div className="p-4">
                  <h1 className="text-lg font-semibold">{home.name}</h1>
                  <p className="mt-3 text-sm text-gray-600">
                    {home.description}
                  </p>
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
      <Home />
    </div>
  );
}

export default App;
