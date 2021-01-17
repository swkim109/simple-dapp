import React from "react";
import {Flex, Box} from "rimble-ui";
import {TOP_OFFSET} from "./Constants";

// 상단 레이아웃
const TopLayout = (props) => {
    return <Flex>
        <Box bg="blue" height={`${TOP_OFFSET}px`} width={1} p={3}>
            {props.children}
        </Box>
    </Flex>
}

export default TopLayout;

