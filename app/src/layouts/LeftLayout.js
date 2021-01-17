import React from "react";
import styled from "styled-components";
import {TOP_OFFSET, LEFT_WIDTH} from "./Constants";

const LeftLayer = styled.div`
  margin-top: ${props => props.marginTop || '0px'};
  height: 100%; /* 100% Full-height */
  width: ${props => props.width || '0px'};
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 5px;
  background-color: aliceblue;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px; /* Place content 60px from the top */
  padding-left: 10px;
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
`;

// 좌측 레이아웃
const LeftLayout = (props) => {
    
    return (
        <LeftLayer width={props.flag?`${LEFT_WIDTH}px`:"0px"} marginTop={`${TOP_OFFSET}px`}>
            {props.children}
        </LeftLayer>
    )
}

export default LeftLayout;
