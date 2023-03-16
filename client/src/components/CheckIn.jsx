import React, { useContext, useEffect, useState } from 'react';
import { TradeContext } from '../context/TradeContext';
import './CheckIn.css';

const CheckIn = (props) => {
  // const {amount,name}=props;
 
  const {
    connectWallet,
    connectedAccount,
    sendTransactionTrade,
    onChangeTrade,
    count,
    setTotalAmount,
    
  } = useContext(TradeContext);

   var url_string=window.location.href;
   var url= new URL(url_string);

   const amount= url.searchParams.get("amount");
   const name=url.searchParams.get("name");
  // console.log(amount,name);
  
    
    let total=amount;
   
    const handleSubmit = (e) => {
     
      e.preventDefault();
      console.log("sumit");
      
    
      sendTransactionTrade();
    };

 

  useEffect(()=>{

    // console.log(count+"c");
    total=Number(amount)*count;
    setTotalAmount(total);
    // console.log(total+"t");
    document.getElementById("changeTotal").innerHTML=`${total}`;
  },[count])


  return (
    <div className='container auto'>
      <h2>product Name: {name}</h2>
      <p>Select the number of items : <input type="number" name="count" placeholder='No. Items' onChange={onChangeTrade}/></p>
      
   
      Total Amount :<h2 id='changeTotal'>{total}</h2>
      <button type="button" name="submit" class="btn btn-primary mx-5" onClick={handleSubmit}>BUY</button>
    </div>
  );
};

export default CheckIn;
