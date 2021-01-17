import React, {Component, useEffect, useState} from 'react';
import {Box, Button, Card, Flex, Image, Input, Field} from "rimble-ui";

import {CoinHeads, CoinHeadsI, CoinTails, CoinTailsI, CoinUnknown} from "../images";
import styled, {keyframes} from "styled-components";

const ButtonGroup = styled.div`
  display: flex;
  margin: 20px 10px 10px 0px;
  width: 420px;
  justify-content: space-between;
`;

const InputAddOnItem = styled.div`
    &:nth-child(1) {
        background-color: lightgray;
        font: inherit;
        font-weight: bold;
    }
`;

const shake = keyframes`
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

const RevealCoinImg = styled.img`
  &:hover {
    animation: ${shake} 0.7s;
    animation-iteration-count: infinite;
  }
`;


export default function() {
    
    const [coin, setCoin] = useState({h: CoinHeadsI, t: CoinTailsI});
    
    
    const handleCoinClick = (e) => {
        let s = {};
        if (e.target.id === "heads") {
            s = {h: CoinHeads, t: CoinTailsI};
        } else if (e.target.id === "tails") {
            s = {h: CoinHeadsI, t: CoinTails};
        }
        setCoin(s);
    }
    
    return (
    
        <Flex flexDirection="column" alignItems="center">
            <Box mt={40}>
                <Flex>
                    <Box width={1/2} mr={3}>
                        <Image src={coin.h} height="130" onClick={handleCoinClick} id="heads" style={{cursor: "pointer"}}/>
                    </Box>
                    <Box width={1/2} ml={3}>
                        <Image src={coin.t} height="130" onClick={handleCoinClick} id="tails" style={{cursor: "pointer"}}/>
                    </Box>
                </Flex>
            </Box>
            <Box mt={20}>
                <Flex flexDirection="column">
                    <Flex>
                        <InputAddOnItem>
                            <span style={{paddingLeft: "7px", paddingRight: "7px"}}>ETH</span>
                            <Input type="number" required={true} min={0} />
                        </InputAddOnItem>
                    </Flex>
                    <ButtonGroup>
                        <Button>Bet</Button>
                        <Button mainColor="Green">Flip</Button>
                        <Button mainColor="Red">Cancel</Button>
                        <Button mainColor="Orange">Reset</Button>
                    </ButtonGroup>
                </Flex>
            </Box>
            <Box mt={20}>
                <Flex>
                    <Box>
                        <RevealCoinImg src={CoinUnknown} height={130} style={{cursor: "pointer"}}/>
                    </Box>
                </Flex>
            </Box>
            <Card maxWidth="420px" mt={2}>
                동전을 선택하고 ETH를 획득하세요!
            </Card>
        </Flex>
            
    );
}
