import React, { useEffect, useState ,useContext} from "react";

import { ethers } from "ethers";
import { TransactionContext } from "../context/TransactionContext";

export const TradeContext = React.createContext();

const { ethereum } = window;

export const TradeProvider = ({ children }) => {
    const {
        connectWallet,
        connectedAccount,
        setConnectedAccount,
        getEthereumContract,
        
        
      } = useContext(TransactionContext);
    
    
  
    const [count,setCount]=useState(1);
    const [totalAmount,setTotalAmount]=useState(0);

    
      
    const onChangeTrade=(e)=>{
        e.preventDefault();
        setCount((prevCount)=>(
           e.target.value
        ))
        
      }
    const checkIfWalletConnected = async () => {
      try {
        if (!ethereum) return alert("please install metamask");
        const account = await ethereum.request({ method: "eth_accounts" });
  
        if (account.length) {
          setConnectedAccount(account[0]);
        } else {
          console.log("No account founded");
        }
  
      //   console.log(account);
      } catch (error) {
        console.log(error);
        throw new Error("No ethereum object");
      }
    };
  
    
  
    const sendTransactionTrade =async()=>{
      try {
        if (!ethereum) return alert("please install metamask");
        //get the data from form...
       
        const { amount } = totalAmount;
        const contract = getEthereumContract();
        const parseAmount = ethers.utils.parseEther(String(totalAmount));
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: connectedAccount,
              to: "0x263Dbea9590779EFbcB82086E0875b5325EAA1E4",
              gas: "0x52028",
              value: parseAmount._hex,
            }]
        });
       
  console.log(contract);
        // const transactionHash =  await contract.methods.addToBlockchain(addressTo,parseAmount,message,keyword);
        
  
  
      } catch (error) {
        console.log(error);
        throw new Error("No ethereum object");
      }
    }
  
    
  
   
    useEffect(() => {
      checkIfWalletConnected();
    }, []);
  
    return (
      <TradeContext.Provider
        value={{
          connectWallet,
          connectedAccount,
          setTotalAmount,
          sendTransactionTrade,
          onChangeTrade,
          count,
        
  
        }}
      >
        {children}
      </TradeContext.Provider>
    );
  };
  
