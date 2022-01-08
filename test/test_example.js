
const Chat = artifacts.require("Chat")



contract("Chat", () => {
    it("should length equal to 2", async () => {
        const ChatContract = await Chat.deployed();
        const accounts = await  web3.eth.getAccounts();
        const receiver = accounts[1];
        const sender = accounts[2];
        web3.eth.defaultAccount = sender
        await ChatContract.sendMessage(receiver, "123")
        await ChatContract.sendMessage(receiver, "123")
        const messages = await ChatContract.getMessagesBySender.call(receiver)
        assert.equal(messages.length, 2)
    })
  
})