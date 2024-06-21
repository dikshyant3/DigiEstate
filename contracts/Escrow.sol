// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

interface IERC721{
    function transferFrom(
        address _from,
        address _to,
        uint256 _id
    ) external;
}

contract RealEstateEscrow {
    address public nftAddress;
    address payable public owner;
    address public inspector;
    address public lender;

    modifier onlyBuyer(uint256 _nftId) {
        require(
            msg.sender == buyer[_nftId],
            "Only Buyer can call this method!!!"
        );
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only seller can call this method!!!");
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
    mapping(uint256 => bool) public isPropertyListed;

    // Mapping to store the purchase price of each property
    mapping(uint256 => uint256) public propertyPrice;

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
        owner = _propertyOwner;
        inspector= _propertyInspector;
        lender = _propertyLender;
    }

    //  Function to list a property for sale

    function listProperty(
        uint256 _nftId,
        address _buyer,
        uint256 _propertyPrice,
        uint256 _escrowAmount
    ) public payable onlyOwner{

        //  Transfer the NFT from owner to this contract
        IERC721(nftAddress).transferFrom(msg.sender, address(this), _nftId);

        // Update the property status

        isPropertyListed[_nftId] = true;
        propertyPrice[_nftId] = _propertyPrice;
        escrowAmount[_nftId] = _escrowAmount;
        buyer[_nftId] = _buyer;
    }

    // Function to deposit escrow funds

    function depositEscrow(uint256 _nftId) public payable onlyBuyer(_nftId){
        require(msg.value >= escrowAmount[_nftId] , "Insufficient funds for the escrow");
    }

    //  function to update the inspection status by the inspector

    function updateInspection(uint256 _nftId, bool _passed) public onlyInspector{
        inspectionPassed[_nftId] = _passed;
    }

    //  function to approve the sale of the property
    function approvePropertySale(uint256 _nftId) public{
        approval[_nftId][msg.sender] = true;
    }
}
