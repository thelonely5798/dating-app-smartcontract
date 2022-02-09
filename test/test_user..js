
const UserContract = artifacts.require("UserContract")



contract("UserContract", () => {
    let instance;
    before('should setup the contract instance', async () => {
        instance = await UserContract.deployed();
    });

    it("test set user", async () => {
        const accounts = await web3.eth.getAccounts();
        const target = accounts[1];
        await instance.setUser({ from: target })
        const user = await instance.getUser.call({ from: target })
        assert.equal(user._address, target)
        assert.equal(user.exists, true)
    })

    it("test get users", async () => {
        const users = await instance.getUsers.call()
        assert.equal(users.length, 2)
    })

    it("test get friends", async () => {
        const users = await instance.getUsers.call()
        assert.equal(users.length, 2)
    })


    it("test genesis user", async () => {
        const accounts = await web3.eth.getAccounts();
        const user = await instance.getUser.call()
        assert.equal(user._address, accounts[0])
        assert.equal(user.exists, true)
    })

    it("test add friend", async () => {
        const accounts = await web3.eth.getAccounts();
        const target = accounts[1];
        /// Current user add friend by target
        await instance.addFriend(target);
        // Get friend requests from target
        const friendRequests = await instance.getFriendRequests.call({ from: target })
        assert.equal(friendRequests[0]._address, accounts[0])
    })

    it("test accept add friend", async () => {
        const accounts = await web3.eth.getAccounts();
        const result = await instance.acceptAddFriend.call(accounts[0], { from: accounts[1] })
        assert.equal(result, true)
        const friendsBySender = await instance.getFriends.call()
        console.log(friendsBySender)
    })
})