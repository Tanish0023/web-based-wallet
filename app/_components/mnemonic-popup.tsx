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
import { useState, useTransition } from "react";
import {toast} from "react-toastify"

interface MnemonicPopUpProps{
    mnemonic: string[];
}

const MnemonicPopUp = ({}: MnemonicPopUpProps) => {
    const [isUsed, setIsUsed] = useState(false);
    const [mnemonic, setMnemonic] = useState("");
    const [isPending, startTransition] = useTransition()
    const [hidden, setIsHidden] = useState(true);

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

    return (
        <div className="p-4 flex flex-col gap-4">
          <div>
            <span className="pr-7">
              Create your seed phase now: 
            </span>   
            <Dialog>
              <DialogTrigger asChild disabled={isUsed} className="pl-3">
                <Button className="text-white" onClick={onClick} disabled={isPending || isUsed}><PlusCircle /> Create seed phase</Button>
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

                      {mnemonic.split(" ").map((i,index) => (
                        <Input value={i} key={index} disabled className={cn(
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

          {mnemonic && (
            <div>
              <span>Now you can create accounts: </span>
              <span className="flex  gap-x-4">
                <Button>SOL</Button>
                <Button>ETH</Button>
              </span>
            </div>
          )}
        </div>
      )
}
 
export default MnemonicPopUp;