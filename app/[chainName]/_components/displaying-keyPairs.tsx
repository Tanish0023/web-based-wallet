import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LucideIcon } from "lucide-react";

interface DisKeyPairsProsp{
    publicKey: string;
    privateKey: string;
    copyText: (text:string) => void;
    toggleHidden: () => void;
    isHidden: boolean;
}

const DisKeyPairs = ({
    publicKey,
    privateKey,
    copyText,
    toggleHidden,
    isHidden
}: DisKeyPairsProsp) => {
    const Icon = () => (
        isHidden ? <Eye/> : <EyeOff />
    )


    return ( 
        <div className="w-full p-2 sm:p-4 px-4 sm:px-8 bg-zinc-900 rounded-2xl">
                <div className="text-xl">
                    <div className="font-semibold">
                        Public Key
                    </div>
                    <div className="cursor-pointer" onClick={() => copyText(publicKey)}>
                        {publicKey}
                    </div>
                </div>
                <div className="mt-5 text-xl">
                    <div className="font-semibold">
                        Private Key
                    </div>
                    <div className="relative flex items-center justify-center" >
                        
                        <Input 
                            type="text" 
                            value={isHidden ? "**************************************************************************" : privateKey} 
                            readOnly 
                            className="cursor-pointer relative bg-white decoration-white text-sm sm:text-xl pr-12"
                            onClick={() => copyText(privateKey)}
                        />
                        
                        <span className="absolute bg-none  p-3 right-0" onClick={toggleHidden}>
                            <Icon />
                        </span>
                       
                        
                    </div>
                </div>
            </div>
     );
}
 
export default DisKeyPairs;