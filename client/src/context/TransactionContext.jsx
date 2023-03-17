import React, { useEffect, useState } from "react";
// import Web3 from "web3";
// import Web3Modal from "web3modal";
import { Contract, ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

// const fetchContract=(provider.getSigner()) => {
//   new ethers,Contract(contractAddress,
//    contractABI,
//    signer)
// }
export const TransactionContext = React.createContext();

const { ethereum } = window;


const getEthereumContract =  async () => {
//  const web3modal=new web3modal();
//  const connection= await web3modal.connect();

 //Provider here
 const provider = new ethers.providers.Web3Provider(ethereum);

 const signer = provider.getSigner();
console.log(await signer.getAddress());
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
  const [connectedAccount, setConnectedAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    message: "",
  }); // important match with name in palceholder
  const [isLoading, setIsLoading] = useState(false);
  // const [contract,setcontract]=useState(null);
  // const [formTrade,setFormTrade]=useState();

  const [transactions, setTransactions] = useState([]);
  const [transactionCount, setTransactionCount] = useState( localStorage.getItem('transactionCount') );

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    })); // important
  };


  

  const getAllTransaction = async () => {
    try {
      if (ethereum) {
        const transactionsContract = await getEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };









  
  const checkIfWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please Install Metamask");
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setConnectedAccount(accounts[0]);

        getAllTransaction();
      } else {
        console.log("No account found");
      }

    //   console.log(account);
    } catch (error) {
      // console.log(error);
      throw new Error("No ethereum object");
    }
  };






  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract =await  getEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      // console.log(error);

      throw new Error("No ethereum object");
    }
  };









 

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("please install metamask");
      const account = await ethereum.request({ method: "eth_requestAccounts" });
      setConnectedAccount(account[0]);
      // console.log(account[0])
      // console.log("The account is connected");
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  

  

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please Install Metamask");
      //get the data from form...

      const { addressTo, amount,message } = formData;
      const contract = await getEthereumContract();
      const parseAmount = ethers.utils.parseUnits(amount, "ether");
      // console.log("running")
      console.log(parseAmount)
      console.log(await contract.signer.getAddress())
      // await contract.sendmoney(addressTo,parseAmount,message);
      // console.log("done")
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: "0x5208",
            value: parseAmount._hex,
          }]
      });
     
// console.log(contract);
      const transactionHash =  await contract.addToBlockchain(addressTo,parseAmount,message);
      

      setIsLoading(true);
      // console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();

      setIsLoading(false);
      // console.log(`Success - ${transactionHash.hash}`);
      const transactionCount = await contract.getTransactionCount();
      // console.log(transactionCount);
      setTransactionCount(transactionCount.toNumber());

    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };




 





  useEffect(() => {
    checkIfWalletConnected();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        
        connectedAccount,
        formData,
        setFormData,
        transactionCount,
        connectWallet,
        transactions,
        isLoading,

        handleChange,
        sendTransaction,
       
       
        setConnectedAccount,
       

      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;