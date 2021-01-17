import React from "react";
import styled from "styled-components";
import {MessageLayout} from "../layouts";
import {Flex, Icon} from "rimble-ui";
import Loader from "react-loader-spinner";
import {TX_TOP_OFFSET} from "../layouts/Constants";
import { copyText } from "../utils/ui-utils";

const TxHashText = styled.div`
 white-space: nowrap;
 overflow: hidden;
 text-overflow: ellipsis;
 width: 240px;
`


const TxMessage = (props) => {
    
    const copyTxHash = () => {
       copyText(props.txHash);
    }
    
    
    return (
        <MessageLayout topOffset={TX_TOP_OFFSET} height={110} flag={props.txHash!==""} close={props.close}>
            <Flex>
                <Loader type="Grid" color="#FFFFFF" height={30} width={30} />
            </Flex>
            <Flex>
                <TxHashText>{props.txHash}</TxHashText>
                <a href="#" onClick={copyTxHash}><Icon name={"ContentCopy"} size="20"/></a>
                <a href={`https://rinkeby.etherscan.io/tx/${props.txHash}`} target="_blank"><Icon name={"OpenInNew"} size="20"/></a>
                
            </Flex>
        </MessageLayout>
        
    )
}

export default TxMessage;
