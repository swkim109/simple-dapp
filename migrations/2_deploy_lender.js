const lender = artifacts.require("Lender");

// https://compound.finance/docs#networks
const cDAI_CONTRACT_ADDRESS = "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643"; // mainnet

module.exports = function(deployer) {
    deployer.deploy(lender, cDAI_CONTRACT_ADDRESS);
};
