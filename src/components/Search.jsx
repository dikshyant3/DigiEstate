import React from 'react';
import bannerImage from '../assets/banner.jpg'; // Adjust the path based on your directory structure

const Search = () => {
  return (
    <header
      className="relative w-full h-[50%] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative z-1 flex flex-col items-center p-6">
        <h2 className="text-2xl text-white mb-4 text-bold">
          Search it, Explore it, Buy it.
        </h2>
        <input
          type="text"
          placeholder="Enter an address, city or ZIP code"
          className="px-4 py-2 outline-none ring-0 border-none focus:ring-0 w-80"
        />
      </div>
    </header>
  );
};

export default Search;
