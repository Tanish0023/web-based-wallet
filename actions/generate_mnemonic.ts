"use server"

import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import MnemonicPopUp from "@/app/_components/mnemonic-popup";

export const generateSeedPhase = async () => {
    try {
        const mnemonic = await generateMnemonic();
        return mnemonic;
    } catch (error) {
        throw new Error("Cannot create Seed phase")
    }

    // const seed = mnemonicToSeedSync(mnemonic);
    // for (let i = 0; i < 4; i++) {
    // const path = `m/44'/501'/${i}'/0'`; // Derivation path for Solana
    // const derivedSeed = derivePath(path, seed.toString("hex")).key;
    // const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    // console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());
    // }
}