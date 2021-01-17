export const walletProvider = (provider) => {
    
    let providerType = "";
    
    if (provider.isMetaMask !== undefined && provider.isMetaMask === true) {
        providerType = "MetaMask";
    }
    else if (provider.wc !== undefined) {
        providerType = "WalletConnect";
    }
    
    return providerType;

}

