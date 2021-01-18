# simple-dapp
실습용 이더리움 애플리케이션

### 구성

* solidity 
* react, redux, redux-saga

### Lender.sol

아이템(NFT 토큰)을 빌려주고 대여 기간동안 대여금을 Compound에 예치하여 수익을 적립합니다. 아이템을 상환하면 대여금을 돌려 받고 대여자는 그 동안 적립된 수익을 받을 수 있습니다.

이러한 기능을 제공하려면 Compound의 cToken 컨트랙트, 그리고 MakerDAO의 DAI 컨택트랙트와 인터페이스를 해야 합니다. 이를 위하여 ganache를 실행할 때 메인넷을 fork할 필요가 있습니다.

### Dapp

* 개인 지갑  
  기본적으로 메타마스크로 연결할 수 있고 WalletConnect를 지원하는 모바일 지갑을 사용할 수도 있습니다.

* 리덕스(redux)
  리덕스 구조를 사용하여 스토어에 공통적인 정보를 저장합니다. 각 컨트랙트에서만 사용되는 상태는 해당 컴포넌트의 상태에서 관리합니다.

* 리덕스-사가(redux-saga)  
  리덕스-사가의 이벤트 채널을 통해 pull 방식으로 계정 잔액을 주기적으로 업데이트 합니다. 트랜잭션이 발생하면 잔액은 자동으로 변경되므로 컨트랙트의 상태 변경도 함께 업데이트됩니다.

### WalletConnect

[WalletConnet](https://walletconnect.org/) 는 모바일 지갑입니다. 크롬 플러그인 메타마스크를 사용하지 않고 개별 모바일 지갑에서 트랜잭션을 서명할 수 있게 해주는 오픈 프로토콜입니다. 모바일 지갑들 중에는 WalletConnect를 지원하는 앱들이 있습니다. 

모바일 지갑들은 메인넷만 지원하지 때문에 테스트하기에 다소 어려움이 있지만 메타마스크 모바일은 테스트넷을 지원하므로 개발에 활용할 수 있습니다.


