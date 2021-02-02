const abi = require("./app/src/utils/contract.abi.mainnet");
const contracts = require("./app/src/utils/contract.address");

const daiContract = new web3.eth.Contract(abi.DAI, contracts.DAI_CONTRACT_ADDRESS);

// TODO 메타마스크 게정
const ACCOUNT_1 = "";
const DAI_RICH = contracts.DAI_RICH_ADDRESS;

module.exports = function(callback) {
    
    web3.eth.getAccounts().then((accounts) => {
        
        // ETH
        web3.eth.sendTransaction({from:accounts[0], to: ACCOUNT_1, value:web3.utils.toWei("10", "ether")}, callback);
        
        // DAI
        daiContract.methods.transfer(ACCOUNT_1, web3.utils.toWei("200", "ether")).send({from: DAI_RICH});
        
    });
}
