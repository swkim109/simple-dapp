import React, {useContext, useEffect, useState, Fragment} from "react";
import styled from "styled-components";
import {Flex, Text, Card, Button, Field, Input} from "rimble-ui";

import "../css/radio-slider.css";
import Lender from "../contracts/Lender.json";
import abi from "../utils/contract.abi.mainnet";
import {DAI_CONTRACT_ADDRESS} from "../utils/contract.address";
import { defaultState }  from "../store/defaultState";
import {Context} from "../NewApp";
import TxMessage from "./TxMessage";

import Item from "./Item";
import ItemData from "./ItemData";
import {formatter} from "../utils/ui-utils";
import CountUp from "react-countup";

const FormLayout = styled.div`
  display: flex;
  margin: 0 0 20px 0;
  width: 400px;
  justify-content: space-between;
  
`;


// 테스트 아이템 데이터
let data = ItemData;

export default function() {
    
    const {web3obj, store} = useContext(Context);
    const [contracts, setContracts] = useState({});
    const [reduxState, setReduxState] = useState(defaultState);
    const [txHash, setTxHash] = useState("");
    
    const [amount, setAmount] = useState(0); // 위임 액수
    const [balance, setBalance] = useState(0); // 인출 가능 액수
    const [deposit, setDeposit] = useState(0); // 적립 액수
    
    const [msg, setMsg] = useState("");
    const [approve, setApprove] = useState(false);
    const [items, setItems] = useState(data);
    const [val, setVal] = useState(0);
    const [addr, setAddr] = useState("");
    
    useEffect(() => {
        // TODO-1
        //  컨트랙트 인스턴스 생성
        
        
        // TODO-2
        //  컨트랙트 인스턴스 생성 실행
        
        
        
        // 상태 구독
        const unsubscribe = store.subscribe(() => {
            const s = store.getState().appReducer; //appReducer 애플리케이션의 모든 상태를 여기에 정의
            setReduxState(s);
        });
        // 구독 해제
        return () => {
            unsubscribe();
        }
        
    }, [web3obj]);
    
    useEffect(() => {
        
        if (Object.keys(contracts).length > 0) {
            if (contracts['dai']._address !== null && contracts['lender']._address !== null) {
                console.log(`Lender ${contracts['lender']._address}`);
                console.log(`Dai ${contracts['dai']._address}`);
                setMsg("");
            } else {
                setMsg("Can't find contract address. It could be network mismatch.");
            }
        }
    }, [contracts]);
    
    // 상태가 변할때마다 조회
    useEffect(()=>{
        
        if (Object.keys(contracts).length > 0) {
            
            if (contracts['dai']._address !== null && contracts['lender']._address !== null) {
                
                // TODO-6
                //  위임 액수 조회
                
                
                // TODO-8
                //  인출 가능 액수 조회
                

                
                // 적립 액수 조회
                contracts.lender.methods.balanceOfUnderlying().call()
                    .then((result) => {
                        setDeposit(web3obj.web3.utils.fromWei(result.toString(), "ether"));
                    });
                
                if (localStorage.getItem('ItemData') !== null) {
                    setItems(JSON.parse(localStorage.getItem('ItemData')));
                }
            }
        }
        
    }, [reduxState]);
    
    
    const handleDaiEnable = async (e) => {
        
        if (reduxState.account === "0x") {
            return;
        }
        
        const val = e.target.checked;
        
        let b = await contracts.dai.methods.balanceOf(reduxState.account).call();
        console.log(b);

        // 위임 해제하면 금액을 0으로 만든다.
        if (!val) {
            b = 0;
        }
        
        // TODO-3
        //  DAI 컨트랙트 approve
        
        
    }
    
    const handleBorrow = async (e) => {
        
        if (reduxState.account === "0x") {
            return;
        }
        
        if (amount > 0) {
            
            const v = web3obj.web3.utils.toWei(e.target.dataset.price.toString(), "ether"); // 대여 금액
            const i = e.target.dataset.item.toString(); // 아이템 아이디
            const d = 180; //초 단위
            
            console.log(v, i, d);
            
            // TODO-5
            //  대여 함수 호출
            
        }
        
    }
    
    //반납
    const handleReturn = async (e) => {
        
        if (reduxState.account === "0x") {
            return;
        }
        
        // 아이템 아이디
        const i = e.target.dataset.item.toString();
        
        // TODO-7
        //  반납 함수 호출
        
        
    }
    
    //대여금 인출
    const handleWithdraw = async () => {
        
        if (reduxState.account === "0x") {
            return;
        }
        
        // TODO-9
        //  대여금 인출 함수 호출
        
        
    }
    
    const handleRepossess = () => {
        
        if (reduxState.account === "0x") {
            return;
        }
        
        if (addr !== "" && web3obj.web3.utils.isAddress(addr)) {
            contracts.lender.methods.repossess(addr).send({from: reduxState.account})
                .on("transactionHash", (hash) => {
                    setTxHash(hash);
                })
                .on("receipt", (result) => {
                    //handleEvents(result);
                    setTxHash("");
                })
                .on("error", (err) => {
                    setTxHash("");
                    console.log(err);
                });
        }
    }
    
    const handleEvents = (receipt) => {
        
        if (receipt) {
            if (receipt.events["Approval"] !== undefined) {
                
                // TODO-4
                //  사용승인 슬라이드 체크박스 업데이트
                
                
            } else if (receipt.events["Borrowed"] !== undefined) {
                // 대여한 후
                const borrowedItemId = receipt.events["Borrowed"].returnValues.itemId;
                const expireDt = receipt.events["Borrowed"].returnValues.expire;
                
                const index = data.findIndex((e)=>e.itemId === parseInt(borrowedItemId));
                data[index].out = true;
                data[index].expire = expireDt;
                setItems(data);
                
            } else if (receipt.events["Returned"] !== undefined) {
                // 반납한 후
                const returnedItemId = receipt.events["Returned"].returnValues.itemId;
                const index = data.findIndex((e)=>e.itemId === parseInt(returnedItemId));
                data[index].out = false;
                data[index].expire = 0;
                setItems(data);
                setVal(0);
                
            }  else if (receipt.events["Withdrawn"] !== undefined) {
                // 인출 후
                //
                
            }
    
            localStorage.setItem("ItemData", JSON.stringify(data));
            
        }
    }
    
    const handleChange = (e) => {
        setVal(parseFloat(e.target.value));
    }
    
    const handleAddrChange = (e) => {
        setAddr(e.target.value);
    }
    
    
    const handleClose = () => {
        setTxHash("");
    }
    
    const handleReset = () => {
        // 테스트
        //localStorage.setItem("ItemData", JSON.stringify(ItemData));
    }
    
    return (
        <Fragment>
            <Flex>
                <Flex ml={70} mt={40} width={1/2} flexDirection="column">
                    <Field label="예치 잔액">
                        <div required>
                            <Text.span fontWeight={"bold"} fontSize={3} color={"#0000FF"}>
                                <CountUp start={0} end={parseFloat(deposit)} decimals={8} preserveValue={true} /> DAI
                            </Text.span>
                        </div>
                    </Field>
                    <Field label="미반납 대여료 회수">
                        <div required>
                            <Flex justifyContent="space-around" width={550}>
                                <Input type="text" required={true} size={416} onChange={handleAddrChange} />
                                <Button onClick={handleRepossess} mainColor={"red"}>회수하기</Button>
                            </Flex>
                            {msg !== "" ?
                                <Flex mt={3}>
                                    <Card maxWidth={"640px"}>
                                        {msg}
                                    </Card>
                                </Flex>
                                :' '}
                        </div>
                    </Field>
                    <Flex width={550}>
                        <Button.Outline size={"small"} onClick={handleReset}>Item reset</Button.Outline>
                    </Flex>
                </Flex>
                <Flex flexDirection="column" alignItems="center" mt={40} mr={380} width={1/2}>
                    <Field label="사용가능 금액">
                        <div required>
                            <FormLayout>
                                <Text.span fontWeight={"bold"} fontSize={4}>
                                    {`${formatter(amount)}`} DAI
                                </Text.span>
                                <label className="switch">
                                    <input type="checkbox" onChange={handleDaiEnable} checked={approve?'checked':''}/>
                                    <span className="slider round"/>
                                </label>
                            </FormLayout>
                        </div>
                    </Field>
                    <Field label="인출가능 금액">
                        <div required>
                            <FormLayout>
                                <Text.span fontWeight={"bold"} fontSize={4} mr={20} required>
                                    {`${formatter(balance)}`} DAI
                                </Text.span>
                                <Flex justifyContent="space-around" width={260}>
                                    <Input type="number" required={true} size={120} min={0} onChange={handleChange} />
                                    <Button onClick={handleWithdraw} mainColor={"green"}>인출하기</Button>
                                </Flex>
                            </FormLayout>
                        </div>
                    </Field>
                    <Flex>
                        {
                            items.map(e => <Item key={e.itemId}
                                                 itemId={e.itemId}
                                                 itemPrice={e.itemPrice}
                                                 handleBorrow={handleBorrow}
                                                 handleReturn={handleReturn}
                                                 out={e.out}
                                                 expire={e.expire}/>)
                        }
                    </Flex>
                </Flex>
            </Flex>
            <TxMessage txHash={txHash} close={handleClose}/>
        </Fragment>
    
    
    )
    
    
}
