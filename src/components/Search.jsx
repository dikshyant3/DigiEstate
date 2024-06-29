import React from 'react';

const Search = () => {
  return (
    <header className="flex items-center justify-between bg-cover bg-center bg-header-banner w-full h-screen">
      <div className="flex flex-col items-center bg-white bg-opacity-50 p-6 rounded-lg">
        <h2 className="text-2xl text-black mb-4">
          Search it, Explore it, Buy it.
        </h2>
        <input 
          type="text" 
          placeholder="Enter an address, city or ZIP code" 
          className="px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </header>
  );
}

export default Search;
