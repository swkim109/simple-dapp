import React from "react";
import styled from "styled-components";
import {Link} from "react-navi";

const Layout = styled.div`
    overflow: auto;
    width: 200px;
`;

//좌측 메뉴
const LeftMenu = (props) => {
    
    return (
        <Layout>
            <Link href="/">Home</Link>
            <br/>
            <Link href="/SimpleStorage">Simple Storage</Link>
            <br/>
            <Link href="/CoinFlip">Coin Flip Game</Link>
            <br/>
            <Link href="/Lender">Lender</Link>

        </Layout>
        
    )
}

export default LeftMenu;
