// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract Escrow{
    address public nftAddress;
    address public seller;
    address public inspector;
    address public lender;

    modifier onlyBuyer(uint256 _nftID){
        require(msg.sender == buyer[_nftID],"Only Buyer can call this method!!!");
        _;
    }

    modifier onlySeller(){
        require(msg.sender == seller,"Only seller can call this method!!!");
        _;
    }

    modifier onlyInspector(){
        require(msg.sender == inspector,"Only inspector can call this method!!!");
        _;
    }

    mapping(uint256 => address) public buyer;
    mapping(uint256 => address) public inspection;
}