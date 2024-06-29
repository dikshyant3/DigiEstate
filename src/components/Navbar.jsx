const Navbar = () => {
    return (
        <nav className="w-full h-20 flex flex-col items-center justify-between border-2 border-red-500 bg-white text-black z-10">
            <div className="w-full flex justify-between items-center h-16 bg-white text-xl px-4 md:text-2xl">
                <div className="flex space-x-4 gap-2 border-2 border-red-800">
                    <a className="border-2 border-blue-700 px-2" href="#">Buy</a>
                    <a className="border-2 border-blue-700 px-2" href="#">Sell</a>
                    <a className="border-2 border-blue-700 px-2" href="#">Rent</a>
                </div>
                <div className="text-xl font-semibold lg:text-4xl">
                    <h1>DigiEstate</h1>
                </div>
                <div>
                    <button type="button" className="bg-blue-700 text-white text-lg md:text-2xl px-4 py-2 border-none rounded-md ring-0 hover:bg-blue-500">Connect</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
