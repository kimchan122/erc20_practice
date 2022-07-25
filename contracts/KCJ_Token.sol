// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title SampleERC20
 * @dev Create a sample ERC20 standard token
 */
contract KCJ_Token is ERC20 {

    constructor() ERC20("KCJ_Token", "KCJ") {
        _mint(msg.sender, 100000);
    }

    function decimals() public pure override returns (uint8) {
        return 2;
    }
}