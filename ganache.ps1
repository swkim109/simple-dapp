# ganache-cli

$NETWORK_ID = "5777"
$CHAIN_ID = "5777"
$GAS_LIMIT = "0xB71B00" # 12,000,000

$ALCHEMY_KEY = ""
$ALCHEMY_MAIN = "https://eth-mainnet.alchemyapi.io/v2/$ALCHEMY_KEY"

$ARCHIVE_NODE_KEY = ""
$ARCHIVE_NODE = "https://api.archivenode.io/$ARCHIVE_NODE_KEY"

$ACCOUNT_1 = "0xAFc4F9F3bA806dd2F8e47A524fFDa2418bBFc08a" #Roy
$ACCOUNT_2 = "0x936299326332BFf36744357A2026c15A23082b92" #DAI 소유자  # mainnet
$ACCOUNT_3 = "0x1Db3439a222C519ab44bb1144fC28167b4Fa6EE6"

ganache-cli -d --gasLimit $GAS_LIMIT --blockTime 5 --networkId $NETWORK_ID --fork $ALCHEMY_MAIN `
--unlock $ACCOUNT_1 --unlock $ACCOUNT_2 --unlock $ACCOUNT_3
