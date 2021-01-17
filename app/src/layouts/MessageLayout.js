import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {TX_TOP_OFFSET, ACCOUNT_LAYER_WIDTH} from "./Constants";
import {Flex, Icon} from "rimble-ui";

const MessageLayer = styled.div`
  margin-top: ${props => props.marginTop || '0px'};
  height: ${props => props.height || '0px'};
  width: ${props => props.width || '0px'};
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  right: 0;
  background-color: lightblue;
  overflow-x: hidden; /* Disable horizontal scroll */
  overflow-y: hidden;
  padding-top: 12px;
  padding-left: 0px;
  padding-right: 0px;
  transition: 0.3s;
`;


const MessageLayout = (props) => {
    
    const [show, setShow] = useState(false);
    
    const handleClose = () => {
        props.close();
        //setShow(false);
    }
    
    useEffect(()=>{
        setShow(props.flag);
    }, [props.flag]);
    
    
    return (
        <MessageLayer marginTop={`${props.topOffset}px`} width={show?`${ACCOUNT_LAYER_WIDTH}px`:"0px"} height={`${props.height}px`}>
            <Flex flexDirection="column" alignItems="center">
                <Flex  pr={2}>
                    <div style={{width: `${ACCOUNT_LAYER_WIDTH}px`, textAlign: "right"}}><a onClick={handleClose} style={{cursor:"pointer"}}><Icon name="Close" size="20"/></a></div>
                </Flex>
                {props.children}
            </Flex>
        </MessageLayer>
    
    )
}

export default MessageLayout;
