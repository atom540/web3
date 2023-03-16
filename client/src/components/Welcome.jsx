import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import './Welcome.css';
const Welcome = () => {
  const {
    connectWallet,
    connectedAccount,
    formData,
    setFormData,
    handleChange,
    sendTransaction,
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    e.preventDefault();
    // console.log(addressTo, amount, keyword, message);
    if (!addressTo || !amount || !keyword || !message) return;
    // console.log("subit");
    sendTransaction();
  };

  return (
    <div className="container">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="addressTo"
              name="addressTo"
              type="text"
              placeholder="Address To"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              name="amount"
              type="number"
              placeholder="Amount"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="keyword"
              name="keyword"
              type="text"
              placeholder="Keyword"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              type="text"
              placeholder="Enter Message"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center">
          

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button" onClick={handleSubmit}
            >
              Send Now
            </button>
          </div>
        </form>
        
      </div>

     
<div className="div">
      {!connectedAccount && <button className="b-btn" onClick={connectWallet}>connectWallet</button>}
    </div></div>
  );
};

export default Welcome;
