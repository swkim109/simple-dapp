import React from "react";
import styled from 'styled-components';
import {Button, Card, Text, Icon, Flex} from "rimble-ui"
import {Eth} from "@rimble/icons";

const Cards = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 80px auto;     
  
`;


export default function (props) {

    return (
                <Cards>
                    <Card width={"420px"} mx={"auto"}>
                        <Flex>
                            <Eth size="32px" color="orange" pr={2}/>
                            <Text mb={10} alignItems="center" fontSize={4}>
                                <b>Simple Dapp</b>
                            </Text>
                        </Flex>
                        <Text>
                            리액트 기반의 이더리움 Dapp 실습용 애플리케이션입니다.
                        </Text>
                    </Card>
                </Cards>

    );
}
