//단위는 px
const TOP_OFFSET = 64; // 상단 메뉴를 가리지 않도록 TOP 으로 부터 떨어진 위치
const LEFT_WIDTH = 220;
const LEFT_OFFSET = 235; // X-좌표가 이 범위를 넘어가면 좌측 메뉴를 닫는다.
const ACCOUNT_LAYER_WIDTH = 330;

const TX_TOP_OFFSET = parseInt(TOP_OFFSET) + 225;

export {
    TOP_OFFSET,
    LEFT_WIDTH,
    LEFT_OFFSET,
    ACCOUNT_LAYER_WIDTH,
    TX_TOP_OFFSET
}
