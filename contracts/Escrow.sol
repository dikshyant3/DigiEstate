// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

interface IERC721 {
    function transferFrom(address _from, address _to, uint256 _id) external;
}

contract RealEstateEscrow {
    address public nftAddress;
    address payable public seller;
    address public inspector;
    address public lender;

    modifier onlyBuyer(uint256 _nftId) {
        require(
            msg.sender == buyer[_nftId],
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
    ) {
        nftAddress = _nftContract;
        seller = _propertyOwner;
        inspector = _propertyInspector;
        lender = _propertyLender;
    }

    //  Function to list a property for sale

    function listProperty(
        uint256 _nftId,
        address _buyer,
        uint256 _propertyPrice,
        uint256 _escrowAmount
    ) public payable onlySeller {
        //  Transfer the NFT from owner to this contract
        IERC721(nftAddress).transferFrom(msg.sender, address(this), _nftId);

        // Update the property status

        isPropertyListed[_nftId] = true;
        propertyPrice[_nftId] = _propertyPrice;
        escrowAmount[_nftId] = _escrowAmount;
        buyer[_nftId] = _buyer;
    }

    // Function to deposit escrow funds

    function depositEscrow(uint256 _nftId) public payable onlyBuyer(_nftId) {
        require(
            msg.value >= escrowAmount[_nftId],
            "Insufficient funds for the escrow"
        );
    }

    //  function to update the inspection status by the inspector

    function updateInspection(
        uint256 _nftId,
        bool _passed
    ) public onlyInspector {
        inspectionPassed[_nftId] = _passed;
    }

    //  function to approve the sale of the property
    function approvePropertySale(uint256 _nftId) public {
        approval[_nftId][msg.sender] = true;
    }

    // function to finalize the sale of the property
    function finalizePropertySale(uint256 _nftId) public {
        require(inspectionPassed[_nftId], "Property inspection not passed!!!");
        require(approval[_nftId][buyer[_nftId]], "Buyer not approved!!!");
        require(approval[_nftId][seller], "Seller not approved!!!");
        require(approval[_nftId][lender], "Lender not approved!!!");
        require(
            address(this).balance >= propertyPrice[_nftId],
            "Insufficient balance!!!"
        );

        isPropertyListed[_nftId] = false;

        // Transfer the funds to the owner
        (bool success,) = payable(seller).call{value:address(this).balance}("");
        require(success);

        // Transfer the ownership to the buyer
        IERC721(nftAddress).transferFrom(address(this), buyer[_nftId], _nftId);
    }

    // function to cancel the sale of the property
    function cancelPropertySale(uint256 _nftId) public {
        if (!inspectionPassed[_nftId]){
            // If the inspection is not passed then refund the escrow funds to the buyer
            payable(buyer[_nftId]).transfer(address(this).balance);
        }
        else {
            // If the inspection is passed then transfer the escrow funds to the owner
            payable(seller).transfer(address(this).balance);
        }
    }

    // Fallback function to receive the ether if it is directly sent to the contract
    receive() external payable{}

    // function to get the current balance held by the contract
    function getContractBalance() public view returns (uint256){
        return address(this).balance;
    }
}
