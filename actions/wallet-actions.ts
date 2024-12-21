"use server"

import nacl from "tweetnacl";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { Wallet, HDNodeWallet } from "ethers";

const keyPairsForwallet: { chain: string; publicKey: string; privateKey: string | Uint8Array<ArrayBufferLike>; }[] = [];

export const createNewSOLWallet = async (mnemonic: string, index:number) => {
    try {
        const seed = await mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${index}'/0'`; // Derivation path for Solana
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58()
        const privateKey = Buffer.from(secret).toString("base64");

        keyPairsForwallet.push({
            chain: "sol",
            publicKey: publicKey,
            privateKey: privateKey
        })

    } catch (error) {
        throw new Error("Cannot create SOL keypair")
    }
}

export const deleteWallet = async (index:number) => {
    
    await keyPairsForwallet.splice(index,1)
}

export const createNewETHWallet = async (mnemonic: string, index:number) => {
    try {
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${index}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);
        const publicKey = wallet.address;
       
        keyPairsForwallet.push({
            chain: "eth",
            publicKey: publicKey,
            privateKey: privateKey
        })

    } catch (error) {
        throw new Error("Cannot create ETH keypair")
    }
}

export const getKeyPairs = async (chain: string) => {    
    const keyPairs = await keyPairsForwallet.filter((pair) => pair.chain === chain.substring(1));    
    return keyPairs;
}