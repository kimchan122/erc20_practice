import {React, useState, useEffect} from 'react';
import {ethers} from 'ethers';
//import styles
import KCJ_Token_abi from "./Contracts/KCJ_Token_abi.json";
import Interactions from "./Interactions";

const Wallet = () => {

    // Local envirionment...
    const contractAddress = '0xc794f0543D2bE8EDBdb38a8d8f8ec1eAdD5E1b29';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

	const [tokenName, setTokenName] = useState("Token");
	const [balance, setBalance] = useState(null);
	const [transferHash, setTransferHash] = useState(null);

    const connectWalletHandler = () => {
        if(window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChangedHandler(result[0]);
                setConnButtonText('Wallet Conntected');
            })
            .catch(error => {
                setErrorMessage(error.message);
            })
        } else {
            console.log("need to install metamask");
            setErrorMessage("Please install Metamask");
        }
    }

    const accountChangedHandler = (newAddress) => {
        setDefaultAccount(newAddress);
        updateEthers();
    }

    const updateBalance = async () => {
		let balanceBigN = await contract.balanceOf(defaultAccount);
        console.log(balanceBigN);
		let balanceNumber = balanceBigN.toNumber();


		let tokenDecimals = await contract.decimals();

		let tokenBalance = balanceNumber / Math.pow(10, tokenDecimals);
        console.log(tokenBalance);

		setBalance(tokenBalance);	
    }

    const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, KCJ_Token_abi, tempSigner);
		setContract(tempContract);
    }

    useEffect(() => {
        console.log("efef");
        if(contract != null){
            updateBalance();
            updateTokenName();
        }
    }, [contract])

    const updateTokenName = async () => {
        console.log("asdf1");
        setTokenName(await contract.name());
        console.log("asdf2");
    }

    return(
        <div>
            <h2> {tokenName + " ERC-20 Wallet"} </h2>
            <button className={StyleSheet.button6} onClick={connectWalletHandler}>{connButtonText}</button>

            <div className = {StyleSheet.walletCard}>
                <div>
                    <h3>Address: {defaultAccount}</h3>
                </div>
                <div>
                    <h3>{tokenName} Balance: {balance}</h3>
                </div>
                {errorMessage}
            </div>
            <Interactions contract={contract}/>
        </div>
    );
}

export default Wallet;