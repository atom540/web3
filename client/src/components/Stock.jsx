import React from "react";
import StockItems from "./StockItems";
import data from './data.json'
const Stock = () => {
    // const {stockCom,title}=prosp;
  return (
    <div>
      {/* <StockItems stockCom={"META"} title={"FaceBook"} /> */}
      {/* <StockItems stockCom={"AMZN"} title={"Amazon"} />
      <StockItems stockCom={"AAPL"} title={"Apple"} />
      <StockItems stockCom={"GOOGL"} title={"google"} />
      <StockItems stockCom={"MSFT"} title={"Microsoft Corporation"} /> */}

      <div className="row">
        {data.map((e) => {
          return (
            <div className="col-md-4" key={e.phone}>
             <StockItems stockCom={e.symbol} title={e.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stock;
