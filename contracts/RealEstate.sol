// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract RealEstate is ERC721URIStorage {
    

    constructor() ERC721("RealEstate", "REAL") {}

    // Initialized the token id to 0 and it keeps updating every time the token is minted
    uint256 _tokenIds = 0;

    function mint(string memory tokenURI) public returns (uint256) {
        _tokensIds++;
        uint256 newId = _tokenIds.current();
        _mint(msg.sender, newId);
        _setTokenURI(newId, tokenURI);

        return newId;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
}
