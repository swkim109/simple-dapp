// 애플리케이션의 상태를 어떻게 결정하는가?
// 애플리케이션의 라이프사이클 동안 변경되는 상태들, 예를 들어 외부 데이터의 변경으로 인해 화면이 갱신되어야 하는 경우.
export const defaultState = {
    status: '',
    account: '0x',
    balance: -1,
    price:{'KRW': '0', 'USD': '0'},
    chainId: '',
    networkName: ''
}
