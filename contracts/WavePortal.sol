// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    // Event that...
    event NewWave(address indexed from, uint256 timestamp, string message);

    // Struct
    struct Wave {
        address waver; // address of the the user who waved
        string message; // message user sent
        uint256 timestamp; // timestamp when the user waved
    }

    // Store all waves ever sent into array
    Wave[] waves;

    // payable keyword allows contract to distribute funds
    constructor() payable {
        console.log("Hello from WavePortal");
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);

        // Store wave data into array
        waves.push(Wave(msg.sender, _message, block.timestamp));

        // emit NewWave event after wave function is invoked
        emit NewWave(msg.sender, block.timestamp, _message);

        // Initialize prize amount
        uint256 prizeAmount = 0.0001 ether;
        // require checks to see if a particular condition is true
        // Checks if balance of contract is bigger than prize amount
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has"
        );

        // Line that actaully "sends money"
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        // Check if transaction was a success
        require(success, "Failed to withdraw money from contract.");
    }

    // getAllWaves when invoked returns struct array and waves
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("%d total waves!", totalWaves);
        return totalWaves;
    }
}
