"use server"

import { generateMnemonic } from "bip39";

export const generateSeedPhase = async () => {
    try {
        const mnemonic = await generateMnemonic();
        return mnemonic;
    } catch (error) {
        throw new Error("Cannot create Seed phase")
    }
}

