// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract RealEstateEscrow {
    address public nftAddress;
    address payable public seller;
    address public inspector;
    address public lender;

    modifier onlyBuyer(uint256 _nftID) {
        require(
            msg.sender == buyer[_nftID],
            "Only Buyer can call this method!!!"
        );
        _;
    }

    modifier onlySeller() {
        require(msg.sender == seller, "Only seller can call this method!!!");
        _;
    }

    modifier onlyInspector() {
        require(
            msg.sender == inspector,
            "Only inspector can call this method!!!"
        );
        _;
    }

    // Mapping to track whether the property is listed for sale
    mapping(uint256 => bool) public isListed;

    // Mapping to store the purchase price of each property
    mapping(uint256 => uint256) public purchasePrice;

    // Mapping to store the escrow amount for each property
    mapping(uint256 => uint256) public escrowAmount;

    // Mapping to associate each property with the buyer's address
    mapping(uint256 => address) public buyer;

    // Mapping to track the inspection status of each property
    mapping(uint256 => bool) public inspectionPassed;

    // Mapping to track the approval status from different parties(buyer,seller,inspector,lender) 
    // for each property
    mapping(uint256 => mapping(address => bool)) public approval;

    // Constructor function

    constructor(
        address _nftContract,
        address payable _propertyOwner,
        address _propertyInspector,
        address _propertyLender
    ){
        nftAddress = _nftContract;
        seller = _propertyOwner;
        inspector= _propertyInspector;
        lender = _propertyLender;
    }
}
