// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct User {
    uint256 id;
    string name;
    address _address;
    int8 lng;
    int8 lat;
    bool exists;
}


contract UserContract {
    mapping(address => User)  Users;
    mapping(address => User[])  FriendRequests;
    mapping(address => User[])  Friends;
    address owner;
    User[] public arrUser;

    constructor() {
        owner = msg.sender;
        genesisFirstUser();
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function genesisFirstUser() private onlyOwner {
        address sender = msg.sender;
        Users[sender].exists = true;
        Users[sender]._address = sender;
        Users[sender].id = 1000;
        arrUser.push(Users[sender]);
    }

    function addFriend(address target) public returns(bool) {
        require(target != msg.sender);
        User memory userByTarget = getUserByAddress(target);
        User[] storage friendRequests = FriendRequests[msg.sender];
        require(userByTarget.exists);

        for(uint i = 0; i < friendRequests.length; i++) {
            if (friendRequests[i]._address == target) {
                return false;
            }
        }
        FriendRequests[msg.sender].push(userByTarget);
        return true;
    }

    function acceptAddFriend(address target) public returns(bool)  {
        User[] storage friendRequests = FriendRequests[msg.sender];
        uint index;
        bool isRequestExists = false;
        for(uint i = 0; i < friendRequests.length; i++) {
            User memory user = friendRequests[i];
            if (user._address == target) {
                index = i;
                isRequestExists = true;
            }
        }
        if (isRequestExists) {
            friendRequests[index] = friendRequests[friendRequests.length - 1];
            friendRequests.pop();
            return true;
        }
        return false;
    }

    function getFriendRequests() public view returns(User[] memory) {
        return FriendRequests[msg.sender];
    }
    
    function setUser() public returns (bool _success) {
        address sender = msg.sender;
        require(!Users[sender].exists, "User is exists");
        Users[sender].exists = true;
        Users[sender]._address = sender;
        Users[sender].id = arrUser[arrUser.length - 1].id + 1;
        arrUser.push(Users[sender]);
        return true;
    }

    function getUser() public view returns (User memory) {
        return Users[msg.sender];
    }

    function getUserByAddress(address target) public view returns (User memory) {
        return Users[target];
    }
}
