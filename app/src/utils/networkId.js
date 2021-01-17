export default (networkId) => {
    
    let networkName = "";
    
    switch (networkId) {
        case 1:
            networkName = "Main";
            break;
        case 2:
            networkName = "Private";
            break;
        case 3:
            networkName = "Ropsten";
            break;
        case 4:
            networkName = "Rinkeby";
            break;
        case 5:
            networkName = "Görli";
            break;
        case 42:
            networkName = "Kovan";
            break;
        default:
            networkName = "Unknown";
            break;
    }
    return networkName;
};
