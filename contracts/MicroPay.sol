pragma solidity ^0.4.2;

contract owned {
    address public owner;

    function owned() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        if (msg.sender != owner) throw;
        _;
    }

    function transferOwnership(address newOwner) onlyOwner {
        owner = newOwner;
    }
}

contract MicroPay is owned {
    bytes32[] public payers;
    uint public price;

    /*event Deposit(address _from, uint _amount);*/

    // constructor run once upon contract creation
    function MicroPay() {
        price = 5;
    }

    function addPayer(bytes32 _email) public
        returns (bool success) {
        // NEED TO FIGURE OUT HOW TO RESTORE VALUE REQUIREMENT.
        // currently getting invalid jump effor if call
        // MicroPay.deployed().addPayer('hello@email.com' {value: 5})


        /*if (msg.value < price) { return false; }
        Deposit(msg.sender, msg.value);*/

        payers.push(_email);
        return true;
    }

    function getPayers() constant returns (bytes32[]) {
        return payers;
    }

    function getPrice() constant returns (uint) {
        return price;
    }

    function changePrice(uint newPrice) onlyOwner {
        price = newPrice;
    }

    function withdraw() onlyOwner returns (bool) {
        return owner.send(this.balance);
    }
}
