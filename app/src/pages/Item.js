import {Box, Button, Card, Heading, Image, Text} from "rimble-ui";
import {Item102, Item337, Item721} from "../images";
import React from "react";
import {convertTimestampToDateTime} from "../utils/ui-utils";

export default function({itemId, itemPrice, handleBorrow, handleReturn, out, expire}) {
    
    let item;
    switch (itemId) {
        case 102 : item = Item102; break;
        case 337 : item = Item337; break;
        case 721 : item = Item721; break;
        default: item = Item102; break;
    }
    
    return (
        !out?
            <Card width={"200px"} mr={3}>
                <Heading>Item.{itemId}</Heading>
                <Box>
                    <Image src={item} height={100}/>
                </Box>
                <Box mt={2}>
                    <Text.span fontWeight={"bold"} fontSize={2}>
                        {itemPrice} DAI
                    </Text.span>
                </Box>
                <Button mt={3} size="small" onClick={handleBorrow} data-item={itemId} data-price={itemPrice}>
                    대여
                </Button>
            </Card>
        :
            <Card width={"200px"} mr={3}>
                <Heading>Item.{itemId}</Heading>
                <Box>
                    <Image src={item} height={100}/>
                </Box>
                <Box mt={2}>
                    <Text.span fontWeight={"bold"} fontSize={2}>
                        {itemPrice} DAI
                    </Text.span>
                    <Text.span fontWeight={"bold"} fontSize={1} color={"#FF0000"}>
                        <br/>{expire>0?convertTimestampToDateTime(expire):''}
                    </Text.span>
                </Box>
                <Button.Outline mt={3} size="small" onClick={handleReturn} data-item={itemId} data-price={itemPrice}>
                    반납
                </Button.Outline>
            </Card>

    )
    
}
