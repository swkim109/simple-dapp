pragma solidity ^0.5.12;

contract SimpleStorage {

    uint storedData;

    //event Success(uint newVal);
    event Change(string message, uint indexed newVal);
    //event Change(string message, uint newVal);

    constructor (uint s) public {
        storedData = s;
    }

    function set(uint x) public {
        require(x < 5000, "Should be less than 1000");
        storedData = x;
        emit Change("set", x);
        //emit Success(x);
    }

    function get() public view returns (uint) {
        return storedData;
    }

}
