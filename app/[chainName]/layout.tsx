import Navbar from "./_components/navbar";

interface ChainNameLayoutProps{
    params:{
        chainName: string
    } ,
    children: React.ReactNode
}
4
const ChainNameLayout = async ({
    params,
    children
}:ChainNameLayoutProps) => {
    const {chainName} = await params;
    const chainNameUpper = chainName.toUpperCase();

    return ( 
        <div>
            <Navbar chain={chainNameUpper}/>
            {children}
        </div>
     );
}
 
export default ChainNameLayout;