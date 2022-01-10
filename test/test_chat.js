
const Chat = artifacts.require("Chat")



contract("Chat", () => {
    it("test send message", async () => {
        const ChatContract = await Chat.deployed();
        const accounts = await  web3.eth.getAccounts();
        const target = accounts[1];
        const messageBySender = web3.utils.asciiToHex("Message by sender")
        const messageByTarget = web3.utils.asciiToHex("Message by target")
        await ChatContract.sendMessage(target, messageBySender)
        await ChatContract.sendMessage(accounts[0], messageByTarget, {from: target})
        const messagesBySender = await ChatContract.getMessagesBySender.call(target)
        const messagesByTarget = await ChatContract.getMessagesByTarget.call(target)
        assert.equal(messagesBySender[0].content, messageBySender)
        assert.equal(messagesByTarget[0].content, messageByTarget)
    })
  
})