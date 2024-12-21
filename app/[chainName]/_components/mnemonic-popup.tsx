"use client"

import { generateSeedPhase } from "@/actions/generate_mnemonic";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"  
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import { EyeOff, PlusCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import {toast} from "react-toastify"
import KeyPairs from "./keyPairs";
import { usePathname } from "next/navigation";
import { 
  createNewETHWallet, 
  createNewSOLWallet, 
  deleteWallet, 
  getKeyPairs 
} from "@/actions/wallet-actions";

const MnemonicPopUp = () => {
    const [isUsed, setIsUsed] = useState(false);
    const [mnemonic, setMnemonic] = useState("");
    const [isPending, startTransition] = useTransition()
    const [hidden, setIsHidden] = useState(true);
    const [index,setIndex] = useState(0);
    const [wallet, setWallet]:any = useState([])

    const path = usePathname();        
    const copyText = async () => {
        try {
            await navigator.clipboard.writeText(mnemonic);
            toast.success("Text copied successfully.")
          } catch (err) {
            toast.error("Failed to copy text")
          }
    }

    const onClick = () => {
      startTransition(async () => {
        const result = await generateSeedPhase()
        setMnemonic(result);
      })

      setIsUsed(true)
    }

    const handleHidden = () => {
      setIsHidden(!hidden)
    }

    const decIndex = async (walletIndex:number) => {            
      if(index>0){        
        startTransition(() => {
          //wallet deletion
          setIndex(index+1)
          deleteWallet(walletIndex)
          toast.success("Wallet deleted successfully")
        })
      }else{
        toast.error("Error deleting wallet")
        throw new Error("Index cannot be negative")
      }

    }

    const incIndex = async (index:number) => {
      
      if(index>=0){        
        const newIndex = index+1;
        startTransition(() => {
          
          setIndex(newIndex);
          
          //wallet creation 
          if(path === "/eth"){
            createNewETHWallet(mnemonic, newIndex);
          }else if(path === "/sol"){
            createNewSOLWallet(mnemonic, newIndex);
          }else{
            throw new Error("Invalid chain")
          }
          toast.success("Wallet added successfully");
        })
      }else{
        toast.error("Error creating wallet")
        throw new Error("Index cannot be negative")
      }

    }

    
    
    const fetchWallet = async () => {
      const walletResult = await getKeyPairs(path);
      setWallet(walletResult);
      
    }

    useEffect(() => {
      fetchWallet();
    }, [index]);

    const handleOnSubmitInput = () => {
      
    }

    return (
        <div className="py-5 px-10 flex flex-col gap-6">
          <div>
            <Dialog>
              <DialogTrigger asChild disabled={isUsed} className="flex flex-col lg:flex-row items-center justify-center w-full gap-4 sm:gap-x-5">
                <form>
                  <Input 
                    placeholder="Create new seed phase or enter an existing one.."
                  />
                  <Button className="text-white w-full lg:flex-1" size={"sm"} onClick={onClick} disabled={isPending || isUsed}><PlusCircle /> Create seed phase</Button>
                </form>
              </DialogTrigger>
              {isPending && (
                <div className="absolute h-full w-full flex items-center justify-center">
                  Loading....
                </div>
              )}
              {!isPending && (
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Your seed phase is</DialogTitle>
                    <DialogDescription>
                      DO NOT SHARE THIS WITH ANYONE!!
                    </DialogDescription>
                  </DialogHeader>
                  <div className="relative grid grid-cols-2 xl:grid-cols-3 gap-2">
                      <div className="absolute h-full w-full z-10 cursor-pointer"  onClick={copyText}></div>
                      
                      {hidden && (
                        <div 
                          className="absolute z-50 cursor-pointer h-full w-full flex items-center justify-center"
                          onClick={handleHidden}
                        >
                          <EyeOff className="w-8 h-8"/>
                        </div>
                      )}

                      {mnemonic.split(" ").map((i,index1) => (
                        <Input value={i} key={index1} disabled className={cn(
                          hidden && "bg-white blur-sm"
                        )}/>
                      ))}
                  </div>
                  <DialogFooter>
                      <div className="text-sm text-red-500">
                          *In case of emergency you can use this to get back all your accounts related to this seed phase
                      </div>
                  </DialogFooter>
                </DialogContent>
              )}
            </Dialog>
          </div>

          {
            mnemonic && (
              <Button
                onClick={() => incIndex(index)}
                className=" w-full "
              >
                <PlusCircle/> Add new Wallet
              </Button>
            )
          }
          
          {
            
            wallet.map((pair:any,i:number) => {
              return (
                <KeyPairs 
                  publicKey={pair.publicKey} 
                  privateKey={pair.privateKey} 
                  decIndex={decIndex} 
                  index={index}
                  walletIndex={i}
                  key={i}
                />
              )
              
            })
            
          }

        </div>
      )
}
 
export default MnemonicPopUp;