import BigNumber from "bignumber.js";

export const copyText = (v) => {
    const el = document.createElement('textarea');
    el.value = v;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

export function cutMiddle(str = '', left = 6, right = 4) {
    if (str.length <= left + right) return str;
    return `${str.slice(0, left)}...${str.slice(-right)}`;
}

export const formatNumber = ({value,
                                 precision = 2,
                                 percentage = false,
                                 integer = false}) => {
    if (!BigNumber.isBigNumber(value)) value = new BigNumber(value);
    if (percentage) value = value.times(100);
    if (integer) {
        value = value.integerValue(BigNumber.ROUND_HALF_UP);
        precision = 0;
    }
    return value.toFixed(precision, BigNumber.ROUND_HALF_UP);
}


export function formatter(target, options = {}) {
    return formatNumber({ value: target, ...options });
}

export function convertTimestampToDateTime(t) {
    
    const dt = new Date(t*1000);
    
    const dtStr = dt.getFullYear()
        + '-'
        + (dt.getMonth()+1).toString()
        + '-'
        + dt.getDate()
        + ' '
        + dt.getHours()
        + ':'
        + dt.getMinutes();
    
    return dtStr;
}
