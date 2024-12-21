"use client"

import { Eye, EyeOff, LucideIcon, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import DisKeyPairs from "./displaying-keyPairs";

interface KeyPairProps{
    publicKey: string;
    privateKey: string;
    decIndex: (index:number) => void;
    index: number;
    walletIndex: number;
}

const KeyPairs = ({
    publicKey,
    privateKey,
    decIndex,
    walletIndex,
}:KeyPairProps) => {
    const [isHidden, setIsHidden] = useState(true);

    const copyText = async (text:string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Text copied successfully.")
        } catch (err) {
            toast.error("Failed to copy text")
        }
    }

    const toggleHidden = () => (
        setIsHidden(!isHidden)
    )

    
    return ( 
        <div className="m-3 sm:m-6 border rounded-2xl overflow-hidden">
            <div className="p-4 px-8 text-4xl  pb-3 flex flex-row items-center justify-between">
                <div>
                    Wallet {walletIndex+1}
                </div>
                <div className="text-red-500" onClick={() => decIndex(walletIndex)}>
                    <Trash className="w-6 h-6"/>
                </div>
            </div>
            <DisKeyPairs 
                publicKey={publicKey}
                privateKey={privateKey}
                copyText={copyText} toggleHidden={toggleHidden} isHidden={isHidden}/>
        </div>
     );
}
 
export default KeyPairs;