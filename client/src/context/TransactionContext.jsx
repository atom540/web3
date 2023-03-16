import React, { useEffect, useState } from "react";
// import Web3 from "web3";
// import Web3Modal from "web3modal";
import { Contract, ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

// const fetchContract=(provider.getSigner())=>{
//   new ethers,Contract(contractAddress,
//    contractABI,
//    signer)
// }

const getEthereumContract = async () => {
//  const web3modal=new Web3Modal();
//  const connection= await web3modal.connect();
 const provider = new ethers.providers.Web3Provider(ethereum);

 const signer = provider.getSigner();
  const contract =  new ethers.Contract(
   contractAddress,
   contractABI,
   signer
 );
//  setcontract(contract.connect(signer))

 return contract;
};

// main transaction provider function
export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState();
  const [formData, setFormData] = useState({
    addresTo: "",
    amount: "",
    keyword: "",
    message: "",
  }); // important match with name in palceholder
  const [isLoading, setIsLoading] = useState(false);
  // const [contract,setcontract]=useState(null);
  const [formTrade,setFormTrade]=useState();

  const [transactionCount, setTransactionCount] = useState( localStorage.getItem('transactionCount') );

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    })); // important
  };
  
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

 
  

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("please install metamask");
      const account = await ethereum.request({ method: "eth_requestAccounts" });
      setConnectedAccount(account[0]);
      console.log("The account is connected");
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  

  

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("please install metamask");
      //get the data from form...

      const { addressTo, amount, keyword, message } = formData;
      const contract = await getEthereumContract();
      const parseAmount = ethers.utils.parseEther(amount);
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: "0x52028",
            value: parseAmount._hex,
          }]
      });
     
// console.log(contract);
      const transactionHash =  await contract.addToBlockchain(addressTo,parseAmount,message,keyword);
      

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();

      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);
      const transactionCount = await contract.getTransactionsCount();
      console.log(transactionCount);
      setTransactionCount(transactionCount.toNumber());

    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
       
       
        setConnectedAccount,
       

      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
