import React, {useContext, useEffect, useState, Fragment} from "react";
import styled from "styled-components";
import {TOP_OFFSET} from "../layouts/Constants";
import {Box, EthAddress, Flex, Text, Icon} from "rimble-ui";
import {Context} from "../NewApp";
import {ACCOUNT_LAYER_WIDTH} from "../layouts/Constants";
import getNetwork from "../utils/networkId";
import { accountFetching, applicationRefresh } from "../actions/actionCreator";
import { formatter, copyText, cutMiddle } from "../utils/ui-utils";

import Modal from "../layouts/Modal";
import QrCode from "./QrAddress";
import Loading from "./Loading";

const AccountLayer = styled.div`
  margin-top: ${props => props.marginTop || '0px'};
  height: 200px;
  width: ${props => props.width || '0px'};
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  right: 0;
  background-color: beige;
  overflow-x: hidden; /* Disable horizontal scroll */
  overflow-y: hidden;
  padding-top: 20px;
  padding-left: 0px;
  padding-right: 0px;
  
`;

const Account = (props) => {
    
    const {web3obj, store} = useContext(Context);
    
    const [show, setShow] = useState(false);
    const [qrShow, setQrShow] = useState(false);
    const [account, setAccount] = useState({account: "0x", network: ""});
    const [reduxState, setReduxState] = useState(null);
    
    const [spin, setSpin] = useState(false);
    
    useEffect(() => {
    
        const getAccounts = async () => {
            const accounts = await web3obj.web3.eth.getAccounts();
            const chainId = await web3obj.web3.eth.getChainId();
            
            return {account: accounts[0], chainId};
        }
        
        
        if (web3obj.web3 !== null) {
            getAccounts()
                .then((r) => {
                    setAccount({...account, account: r.account, network: getNetwork(r.chainId)});
                    
                    // TODO-9-1
                    //setSpin(true);
                    
                    // TODO-8
                    //  액션 디스패치
                    
                })
                .catch(err => console.log(err));
            
            setShow(true);
    
            web3obj.web3.givenProvider.on('accountsChanged', function (accounts) {
                // 계정이 변경되면 다시 연결하도록 한다.
                store.dispatch(applicationRefresh());
            });
    
            web3obj.web3.givenProvider.on('chainChanged', function (chainId) {
                // 네트워크가 변경되어도 다시 연결한다.
                store.dispatch(applicationRefresh());
            });
            
        } else {
            setShow(false); //지갑연결을 해제하면 계정정보를 보여주지 않는다.
        }
    
        //스토어 구독
        const unsubscribe = store.subscribe(() => {
            const s = store.getState().appReducer;
            setReduxState(s);
        });
        return () => {
            unsubscribe();
        }
        
        
    }, [web3obj.web3]); // 지갑이 연결되면 계정을 가져온다.
    
    // 잔액을 saga 에서 가져오므로 완료되었을 때 spin 을 멈춘다.
    useEffect(()=>{
        if (reduxState !== null && reduxState.balance >= 0) {
            // TODO-9-2
            //setSpin(false);
        }
    }, [reduxState]);
    
    const formatBalance = (state) => {
        let balance = "0";
        if (web3obj.web3 !== null && state !== null) {
            balance = `${formatter(web3obj.web3.utils.fromWei(state.balance.toString(), "ether"), {precision: 4})}`
        }
        return balance;
    }
    
    const copyAccount = () => {
        copyText(account.account);
    }
    
    const showQrPopup = () => {
        setQrShow(true);
    }
    
    const handleClose = () => {
        setQrShow(false);
    }
    
    return (
        <Fragment>
            <AccountLayer marginTop={`${TOP_OFFSET}px`} width={show?`${ACCOUNT_LAYER_WIDTH}px`:"0px"}>
                <Box px={4}>
                    {/*<EthAddress address={account.account}/>*/}
                    <Box py={3}>
                        <Flex>
                            <Text fontSize={1} pr={2}>Account: <b>{cutMiddle(account.account)}</b></Text>
                            <a href="#" onClick={copyAccount}><Icon name={"ContentCopy"} size="20"/></a>
                            <a href="#" onClick={showQrPopup}><Icon name={"CropFree"} size="20"/></a>
                        </Flex>
                        <Flex><Text fontSize={1}>Current Network: <b>{account.network}</b></Text>
                            {account.network==="Unknown"?' ':<Icon name="CheckCircle" color="success" pl={1} size="22"/>}
                        </Flex>
                        <Flex py={2} flexDirection="column">
                            <Text fontSize={1}>Your Balance: Ξ<b>{formatBalance(reduxState)}</b></Text>
                            <Text fontSize={1}>KRW <b>0</b></Text>
                        </Flex>
                    </Box>
                </Box>
                <Modal show={qrShow}>
                    <QrCode address={account.account} handleClose={handleClose}/>
                </Modal>
            </AccountLayer>
            <Modal show={spin}>
                <Loading type="Oval" />
            </Modal>
        </Fragment>
        
    )
}

export default Account;
