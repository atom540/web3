import React, { useEffect, useState,useContext } from "react";

import Plot from "react-plotly.js";
import CheckIn from "./CheckIn";

const StockItems = (props) => {
  const {stockCom,title}=props;
  const [xValue, setXvalue] = useState([]);
  const [yValue, setYvalue] = useState([]);
  const [data, setData] = useState([]);

  
  let CurrentUrL=window.location.href;
  CurrentUrL+=`/CheckIn`;
  CurrentUrL+=`/query?name=${title}&amount=${yValue[0]}`
  const handleClick = () => {
    
    window.open(CurrentUrL, '_blank', 'width=500,height=500');
    window.HTMLAllCollection=<CheckIn />
  };
  useEffect(() => {
    const fetchStock = async () => {
      const API_KEY = "9KVL4HKVIW71TAD7";
     
      let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockCom}&outputsize=compact&apikey=${API_KEY}`;
    
      const response = await fetch(API_CALL).then();
      const jsonData = await response.json();
      setData(jsonData);
      const today = new Date();
      const yesterday = new Date(today);
      
     
      for (var key in jsonData["Time Series (Daily)"]) {
        
        xValue.push(key);
    
        yValue.push(jsonData["Time Series (Daily)"][key]["1. open"]);
        
     
      }
 
     
    };
    
    fetchStock();
  
  }, [title]);

  return (
    <div>
      <Plot
        data={[
          {
            x: xValue,
            y: yValue,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
        ]}
        layout={{ width: 720, height: 440, title: `${title}` }}
      />
      <div className="btn-primary my-3 mx-5">
      <span>Current Price: {yValue[0]} <b>$</b></span>
      <span><button type="button" class="btn btn-primary mx-5" onClick={handleClick}>BUY</button></span>
      </div>
      
    </div>
  );
};

export default StockItems;
