// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/// @title Capture the Flag
/// @author Sumitjh26997, ShikharBhatt
/// @notice This contract demonstrates how a simple variable assignment works in Solidity

contract CTF {
    ///@notice state variable holding address of current flag holder
    address public flagHolder = address(0);

    ///@notice event to emitted once a new user captures as the flag
    event FlagCaptured(address previousHolder, address currentHolder);
    
    ///@notice set caller as current flag holder and emits an event for the same 
    function captureFlag() public {
        require(msg.sender != flagHolder,
        "You are currently holding the flag");
        address previousHolder = flagHolder;
        flagHolder = msg.sender;
        emit FlagCaptured(previousHolder, flagHolder);
    }
}
