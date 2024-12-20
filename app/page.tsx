import Navbar from "./_components/navbar";
import MnemonicPopUp from "./_components/mnemonic-popup";

export default function Home() {
  return (
    <>
      <Navbar /> 
      <MnemonicPopUp mnemonic={[]}/> 
    </>
  );
}
