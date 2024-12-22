"use server"

import { generateMnemonic, mnemonicToSeed, mnemonicToSeedSync, validateMnemonic } from "bip39";

export const generateSeedphrase = async () => {
    try {
        const mnemonic = await generateMnemonic();
        return mnemonic;
    } catch (error) {
        throw new Error("Cannot create Seed phase")
    }
}

export const checkMnemonic = async (mnemonic: string) => {
    try {        
        const result = await validateMnemonic(mnemonic); 
        
        if(result){
            return true;
        }else{
            throw new Error("Invalid Mnemonic")
        }
      } catch (error) {
        console.error('Invalid mnemonic:', error);
        throw new Error("Invalid Mnemonic")
      }
}   

