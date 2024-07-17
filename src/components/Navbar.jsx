import { ethers } from 'ethers';
import { useState } from 'react';

const Navbar = ({ account, connectWalletHandler, connButtonText }) => {
  return (
    <div className="flex items-center px-5 sm:px-10 py-8 sm:py-10 justify-between   ">
      <nav className="flex items-center gap-3 sm:gap-5">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-medium sm:text-lg md:text-xl md:font-extrabold  text-muted-foreground transition-colors hover:text-foreground"
        >
          Buy
        </a>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-medium sm:text-lg md:text-xl md:font-extrabold text-muted-foreground transition-colors hover:text-foreground"
        >
          Sell
        </a>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-medium sm:text-lg md:text-xl md:font-extrabold text-muted-foreground transition-colors hover:text-foreground"
        >
          Rent
        </a>
      </nav>
      <div className="flex-1 text-center">
        <h1 className="font-maamli">
          <a
            href="#"
            className="text-2xl md:text-4xl  font-bold   tracking-wider "
          >
            DigiEstate
          </a>
        </h1>
      </div>
      <button
        onClick={connectWalletHandler}
        type="button"
        className="bg-[#292524] text-white text-lg md:text-2xl px-4 py-2 border-none rounded-md ring-0 hover:bg-[#57534e]"
      >
        {connButtonText}
        {account
          ? ' (' + account.slice(0, 2) + '...' + account.slice(40, 42) + ') '
          : ''}
      </button>
    </div>
  );
};

export default Navbar;
