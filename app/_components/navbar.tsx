"use client"

import ThemeButton from "./theme-button";

const Navbar = () => {
    return ( 
        <div className="flex items-center justify-between px-10 py-3">
            <div className="p-2 px-4 group cursor-pointer">
                Web Based Wallet
                <div className="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
            </div>
            <div>
                <ThemeButton/>
            </div>
        </div>
     );
}
 
export default Navbar;