import Web3 from "web3";
import { useState, useEffect } from "react";
import ContractJSON from "./Contract.json"


const Wallet = ({ saveState, saveAccount, saveConnected}) => {
    // const [account, setAccount] = useState({
    //     account: null
    // });
    //const [connected, setConnected] = useState(false);
    useEffect(() => {

        const connectWallet = async () => {
            try {
                const { ethereum } = window;

                if (ethereum) {

                    window.ethereum.on("chainChanged", () => {
                        window.location.reload();
                    });

                    window.ethereum.on("accountsChanged", () => {
                        window.location.reload();
                    });

                    const ABI = ContractJSON.abi;
                    const web3 = new Web3(window.ethereum);
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const contract = new web3.eth.Contract(
                        ContractJSON,
                        "0x0b19A922BD6EB9dc7a8A555Cde7CD1Ab9d05A735"
                    );
                    const accounts = await web3.eth.getAccounts();
                    saveAccount && saveAccount(accounts);
                    saveConnected && saveConnected(true);
                    saveState && saveState({ web3: web3, contract: contract, accounts: accounts });

                } else {
                    alert("Please Install Metamask To Interact With This Application!");
                }

            } catch (error) {
                console.log(error);
            }
        };

        connectWallet();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    //{connected ? "Connected to:" : "Please connect your MetaMask Wallet!"} 
    // Empty dependency array ensures it runs only once
    return (
        <>
        </>
    )
};

export default Wallet;
