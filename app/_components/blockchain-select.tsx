"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import MnemonicPopUp from "../[chainName]/_components/mnemonic-popup";

const BlockchainSelect = () => {
    const routes = [
        {
            label: "SOL",
            img: "/public/blockchain-images/sol.png",
            href: "/sol"
        },{
            label: "ETH",
            img: "/public/blockchain-images/eth.jpeg",
            href: "/eth"
        }
    ]

    const handleOnClick = () => {        
        return (
            <MnemonicPopUp />
        )
    }

    return ( 
        <div className="p-10 flex justify-center  flex-col gap-10">
            <div className="text-6xl lg:text-8xl">
                Select the blockchain:
            </div>
            <div className="flex items-center gap-4">
                {
                    routes.map((route,index) => (
                        
                        <Link href={route.href} key={index}>
                            <Button onClick={handleOnClick} className="text-2xl py-5 px-10"  >
                                {route.label}
                            </Button>
                        </Link>
                        
                    ))
                }
            </div>
        </div>
        
     );
}
 
export default BlockchainSelect;