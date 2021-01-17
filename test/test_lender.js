const lender = artifacts.require("Lender");
const abi = require("../app/src/utils/contract.abi.mainnet");

const {
    BN,           // Big Number support
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
} = require("@openzeppelin/test-helpers");

//mainnet
const cDAI_CONTRACT_ADDRESS = "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643";
const DAI_CONTRACT_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";

//TODO 메타마스크 계정
const ACCOUNT_1 = "0xAFc4F9F3bA806dd2F8e47A524fFDa2418bBFc08a"; // 메타마스크 계정

contract ("Lender-1", function(accounts) {
    
    const AMOUNT = new BN(web3.utils.toWei("0.1", "ether")); //0.1 DAI, decimals = 18 이므로 ETH 와 동일
    const EXPIRE = new BN("60*60"); // 초 단위
    const ITEM_ID = "337";
    
    let balanceDAI = 0;
    
    before(async () => {
        
        this.instance = await lender.deployed();
        this.cDaiContract = new web3.eth.Contract(abi.cDAI, cDAI_CONTRACT_ADDRESS);
        this.daiContract = new web3.eth.Contract(abi.DAI, DAI_CONTRACT_ADDRESS);
    });
    
    //1. Lender 컨트랙트에 DAI 사용을 위임한다.
    it ("should approve DAI to Lender", async () => {
        
        balanceDAI = await this.daiContract.methods.balanceOf(ACCOUNT_1).call();
        const result = await this.daiContract.methods.approve(this.instance.address, AMOUNT.toString()).send({from: ACCOUNT_1});
        expect(result.status, "Failed to approve DAI").to.be.true;
    });
    
    //2. 아이템을 대여하면서 컴파운드 풀에 DAI를 예치한다.
    it ("should supply cToken to Compound pool", async () => {
    
        const receipt = await this.instance.borrow(AMOUNT, ITEM_ID, EXPIRE, {from: ACCOUNT_1});
        
        const b = await web3.eth.getBlock("latest");
        const timestamp = new BN(b.timestamp);
        
        // Lender 컨트랙트에서 발생하는 이벤트 확인
        expectEvent(receipt, "Borrowed", {
            sender: ACCOUNT_1,
            amount: AMOUNT,
            itemId: ITEM_ID,
            expire: timestamp.add(EXPIRE)
        });
    });
    
    //3. 아이템이 해당 계정이 대여중인지 확인한다.
    it.skip ("should have item", async () => {
        // TODO
        
    });
    
    //4. 반납 전에 대여료를 인출하려고 하면 오류가 발생해야 한다.
    it ("should not withdraw fund before returning item", async () => {
        await expectRevert(
            this.instance.withdrawFromLending(AMOUNT, {from: ACCOUNT_1}),
            "The item should be returned",
        );
    });
    
    //5. 반납 후 인출이 가능하다.
    it ("can withdraw fund after returning item", async () => {
        
        await this.instance.returnItem(ITEM_ID, {from: ACCOUNT_1});
        await this.instance.withdrawFromLending(AMOUNT, {from: ACCOUNT_1});
    
        // 인출 후에는 처음 잔액과 일치해야 한다.
        let b = await this.daiContract.methods.balanceOf(ACCOUNT_1).call();
        assert.equal(b.toString(),  balanceDAI.toString());
        
    });
    
    
    //6. Lender 컨트랙트 계정으로 이자가 남아 있어야 한다.
    it ("should have DAI", async () => {
        const r = await this.instance.balanceOfUnderlying.call();
        expect(r > 0).to.be.true;
        
    });
    
});
