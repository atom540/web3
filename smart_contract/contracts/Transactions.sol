//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions{

    uint256 transactionCount=0;

    event Transfer(address from,address receiver,uint amount,string message,uint256 timestamp);

    struct TransferStruct{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        
    }

    TransferStruct[] transactions;

    function sendmoney(address _add,uint _amount,string memory message) public{
    payable(_add).transfer(_amount );
    addToBlockchain(payable(_add), _amount, message);
    }

    function addToBlockchain(address payable receiver,uint amount,string memory message) public {
        transactionCount+=1;
            
        transactions.push(TransferStruct(msg.sender,receiver,amount,message,block.timestamp));
        emit Transfer(msg.sender,receiver,amount,message,block.timestamp);
    }

    function getAllTransactions() public view returns(TransferStruct[] memory){
            return transactions;
    }

    function getTransactionCount() public view returns(uint256){
            return transactionCount;
    }
}