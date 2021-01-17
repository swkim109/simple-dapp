import React, {useState, Fragment, useContext, useEffect} from "react";
import styled from "styled-components";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button} from "rimble-ui";
import {Context} from "../NewApp";

const Layout = styled.div`
    display: flex;
    justify-content: space-between; // 수평으로 균등 분할하며 컨테이너와 간격은 없음. 결과적으로 두 개의 아이템이 양 끝에 배치
`;

// 상단 메뉴
// 좌측에 메뉴 버튼, 우측에는 지갑 버튼
const TopMenu = (props) => {
    
    const {web3obj} = useContext(Context);
    const [buttonText, setButtonText] = useState("");
    
    useEffect(() => {
        console.log(web3obj);
        if (web3obj.web3 !== null) {
            setButtonText("Disconnect wallet");
            
        } else {
            setButtonText("Connect wallet");
        }
    }, [web3obj]);
    
    return (
        <Layout>
            <a href="#" onClick={props.toggleLeftMenu}><FontAwesomeIcon icon={faBars} size={"2x"} color={"white"} /></a>
            <Button.Outline mainColor={"white"} size={"small"} onClick={props.handleConnect}>{buttonText}</Button.Outline>
        </Layout>
    )
}

export default TopMenu;
