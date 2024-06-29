import React from 'react';
import homeImage from '../assets/home1.jpg';
const Home = () => {
    return (
        <div className="w-full h-full bg-white flex flex-col items-center justify-start mt-4">
            <div className="text-xl font-semibold border-b-2 border-black left-[50%]">
                <h2>Homes for you</h2>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg mt-4">
                <img className="w-full" src={homeImage} alt="Image of a home" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">20 ETH</div>
                    <p className="text-gray-700 text-base">
                        2 BHK | 2200 sq.ft.
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        157 W 57TH St. APT 498, NY
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Home;
