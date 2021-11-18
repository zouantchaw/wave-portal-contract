// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    // uint256[] public waversArray;

    constructor() {
        console.log("Hello from WavePortal");
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
        // waversArray.push(msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("%d total waves!", totalWaves);
        return totalWaves;
    }
}
