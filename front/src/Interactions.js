import {React, useState, useEffect} from 'react';
import {Contract, ethers} from 'ethers';
//import styles
//import KCJ_Token_abi from "./Contracts/KCJ_Token_abi.json";
//import Interactions from "./Interactions";

const Interactions = (props) => {

    const [transferHash, setTransferHash] = useState(null);

    const transferHandler = async (e) => {
        e.preventDefault();
        let transferAmount = e.target.sendAmount.value;
        let receiverAddress = e.target.revieverAddress.value;

        let txt = await props.contract.transfer(receiverAddress, transferAmount);
        setTransferHash(txt.hash);
    }

    return(
        <div className={StyleSheet.interactionsCard}>
            <form onSubmit={transferHandler}>
                <h3>Transfer Tokens</h3>
                <input type='text' id='revieverAddress' className={StyleSheet.addressInput}/>

                <p>Send Amount</p>
                <input type='number' id='sendAmount' min='0'/>

                <button type = 'submit' className={StyleSheet.button6}>Send</button>
                <div>
                    {transferHash}
                </div>
            </form>
        </div>
    );
}

export default Interactions;