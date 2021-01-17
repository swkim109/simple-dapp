pragma solidity ^0.5.0;

import "./interface/ICErc20.sol";
import "./interface/IERC20.sol";
import "./SafeMath.sol";

contract Lender {

    using SafeMath for uint256;

    // 이 컨트랙트가 가진 DAI 토큰
    uint256 public accountedBalance;

    //DAI 토큰 장부
    mapping (address => uint256) internal balances;

    //대여 장부
    struct LendingItem {
        uint256 itemId;
        uint256 expires;
    }

    mapping (address => LendingItem) lending;

    address payable public owner;

    //Compound cToken
    ICErc20 public cToken;

    event Borrowed(address sender, uint256 amount, uint256 itemId, uint256 expire);
    event Returned(address sender, uint256 itemId);
    event Withdrawn(address sender, uint256 amount);

    // Standard modifier on methods invokable only by contract owner.
    modifier onlyOwner {
        require (msg.sender == owner, "Only owner can call this function.");
        _;
    }

    modifier isNotReturned(address _addr) {
        require(lending[_addr].itemId != 0, "Item is returned already");
        _;
    }

    constructor(address _cToken) public {
        require(_cToken != address(0), "cToken address is required");
        cToken = ICErc20(_cToken);
        owner = msg.sender;
    }


    function token() public view returns (IERC20) {
        return IERC20(cToken.underlying()); // DAI 컨트랙트의 주소
    }

    // 대여하려는 아이템번호와 대여료를 전송한다.
    function borrow(uint256 _amount, uint256 _itemId, uint256 _expire) public {

        //대여한 것이 없을 때만 대여 가능
        //하나만 대여 가능
        require(lending[msg.sender].itemId == 0);

        LendingItem memory item;
        item.itemId = _itemId;
        item.expires = block.timestamp + _expire;
        lending[msg.sender] = item;

        //이미 approve 되어 있어야 한다. 애플리케이션에서 approve 한다.
        require(token().transferFrom(msg.sender, address(this), _amount), "Transfer DAI failed");
        depositToCompound(msg.sender, _amount);
        emit Borrowed(msg.sender, _amount, item.itemId, item.expires);
    }

    // address(this)  위임받은 토큰을 Compound pool 에 전송하고 cToken 을 발행
    function depositToCompound(address _sender, uint256 _amount) internal {

        // Update the user's balance
        balances[_sender] = balances[_sender].add(_amount);

        // Update the total of this contract
        accountedBalance = accountedBalance.add(_amount);

        // Deposit into Compound
        // address(this) 가 위임받은 DAI 를 Compound 에 다시 위임하고 mint 를 호출하여 cToken 을 발행한다.
        require(token().approve(address(cToken), _amount), "Failed to approve sending token");
        require(cToken.mint(_amount) == 0, "Failed to mint cToken"); // 0 = success
    }

    //인출 전에 아이템 반납여부 확인
    //만료되더라도 차압되기 전이라면 반납한 후 인출 가능
    function withdrawFromLending(uint256 _amount) public {

        require(lending[msg.sender].itemId == 0, "The item should be returned");

        uint256 balance = balances[msg.sender];

        require(_amount <= balance, "Can NOT withdraw more than balance");

        // Update the user's balance
        balances[msg.sender] = balance.sub(_amount);

        withdraw(msg.sender, _amount);

        emit Withdrawn(msg.sender, _amount);
    }

    //적립된 이자는 계속 Compound 에 남아 있을 것이다.
    function withdrawFromCompound(uint256 _amount) public onlyOwner {
        withdraw(msg.sender, _amount);
    }

    function withdraw(address _sender, uint256 _amount) internal {

        // Update the total of this contract
        accountedBalance = accountedBalance.sub(_amount);

        // Withdraw from Compound and transfer
        require(cToken.redeemUnderlying(_amount) == 0, "Failed to redeem cDAI back to contract"); // Compound pool 에서 인출

        // 수취인에게 DAI 토큰 전송
        // 여기서 전송되는 DAI 는 원금이고 이자는 컨트랙트에 남아 있다.
        require(token().transfer(_sender, _amount), "Failed to transfer DAI back to user");
    }

    function balanceOf(address _addr) external view returns (uint256) {
        return balances[_addr];
    }

    //반납되지 않고 만료된 것은 차압할 수 있다.
    function repossess(address _addr) external onlyOwner {

        require(lending[_addr].itemId != 0);
        require(lending[_addr].expires < block.timestamp, "Not expired");

        uint256 balance = balances[_addr];
        balances[_addr] = balance.sub(balance);
        accountedBalance = accountedBalance.sub(balance);

        require(balance > 0);
        require(cToken.redeemUnderlying(balance) == 0, "Failed to redeem cDAI back to contract");
        require(token().transfer(msg.sender, balance), "Failed to transfer DAI back to user");
    }



    function returnItem(uint256 _itemId) external isNotReturned(msg.sender) {
        if (lending[msg.sender].itemId == _itemId) {

            lending[msg.sender].itemId = 0;
            lending[msg.sender].expires = 0;

            emit Returned(msg.sender, _itemId);
        }
    }

    // 계정이 아직 대여 중인 아이템인지 확인
    function isLendingItem(address _addr, uint256 _itemId) public view isNotReturned(_addr) returns (bool isLending, uint itemId){

        if (lending[_addr].itemId == _itemId) {
            isLending = true;
            itemId = lending[_addr].itemId;
        }
    }

    //인출되지 않고 남아 있는 DAI 잔액
    function balanceOfUnderlying() public returns (uint256 v){
        v = cToken.balanceOfUnderlying(address(this));
    }

    //교환비율
    function getExchangeRate() public returns (uint256){
        return cToken.exchangeRateCurrent();
    }


    function kill() external onlyOwner {
        selfdestruct(owner);
    }

}
