
const UserContract = artifacts.require("UserContract")



contract("UserContract", () => {
    it("test set user", async () => {
        const userContract = await UserContract.deployed();
        const accounts = await  web3.eth.getAccounts();
        const target = accounts[1];
        await userContract.setUser({from: target})
        const user = await userContract.getUser.call({from: target})
        assert.equal(user._address, target)
        assert.equal(user.exists, true)
    })
    
    it("test genesis user", async () => {
        const userContract = await UserContract.deployed();
        const accounts = await  web3.eth.getAccounts();
        const user = await userContract.getUser.call()
        assert.equal(user._address, accounts[0])
        assert.equal(user.exists, true)
    })

    it("test add friend", async () => {
        const userContract = await UserContract.deployed();
        const accounts = await  web3.eth.getAccounts();
        const target = accounts[1];
        await userContract.addFriend(target);
        const friendRequests = await userContract.getFriendRequests.call()
        assert.equal(friendRequests[0]._address, target)
    })
  
})