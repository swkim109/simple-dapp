import React, { useState, useEffect, useContext, useRef, createRef, Fragment } from 'react';
import styled from 'styled-components';
import {Flex, Box, Button, Input, Card} from 'rimble-ui';
import {Context, Provider} from "../NewApp";
import SimpleStorage from "../contracts/SimpleStorage.json";
import TxMessage from "./TxMessage";
import { defaultState }  from "../store/defaultState";
import { errorMessage } from "../utils/errorMessage";

const FormGroup = styled.div`
  display: flex;
  margin: 20px 10px 10px 0px;
  width: 500px;
  justify-content: space-between;
`;


const MyComponent = (props) => {
    
    const {web3obj, store} = useContext(Context);
    const [contracts, setContracts] = useState({});
    const [reduxState, setReduxState] = useState(defaultState);
    
    const [msg, setMsg] = useState(""); //이 화면에만 사용되는 메시지
    const [val, setVal] = useState(0);
    const [txHash, setTxHash] = useState("");
    const [storedData, setStoredData] = useState("");
    
    const inputRef = useRef();
    
    useEffect(() => {
    
        const getContracts = async () => {
    
            //web3obj.web3.eth.handleRevert = true;
            const networkId = await web3obj.web3.eth.net.getId();
            const deployedNetwork = SimpleStorage.networks[networkId];
            const contract = new web3obj.web3.eth.Contract(
                SimpleStorage.abi,
                deployedNetwork && deployedNetwork.address
            );
            
            setContracts({...contracts, 'SimpleStorage': contract});
        }
    
        if (web3obj.web3 !== null) {
            console.log(web3obj.web3.version);
            getContracts().catch(err => console.log(err));
        }
        
        const unsubscribe = store.subscribe(() => {
            const s = store.getState().appReducer;
            setReduxState(s);
        });
        return () => {
            unsubscribe();
        }
        
    }, [web3obj]);
    
    useEffect(() => {
    
        if (Object.keys(contracts).length > 0) {
            if (contracts['SimpleStorage']._address !== null) {
                console.log(`SimpleStorage ${contracts['SimpleStorage']._address}`);
            } else {
                setMsg("Can't find contract address. It could be network mismatch.");
            }
        }
    }, [contracts]);
    
    const handleChange = (e) => {
        if (e.target.value !== "") {
            setVal(parseInt(e.target.value));
        }
    }
    
    const handleSend = async () => {
        if (Object.keys(contracts).length > 0
                && contracts['SimpleStorage']._address !== null
                && reduxState.account !== "0x") {
            
            setMsg("Waiting for signing a transaction...");
            
            //즉시 트랜잭션 hash 를 받기 위해서는 다음과 같이 해야 한다.
            contracts.SimpleStorage.methods.set(val).send({from: reduxState.account})
                .on("transactionHash", (hash) => {
                    setTxHash(hash);
                    setMsg("");
                })
                .on("receipt", (result) => { //mined
                    handleEvent(result);
                    setTxHash("");
                })
                .on("error", (err) => handleError(err));
            
        }
    }
    
    const handleError = (err) => {
        const m = errorMessage(err);
        setMsg(m);
        setTxHash("");
    }
    
    const handleGet = async () => {
        if (Object.keys(contracts).length > 0
            && contracts['SimpleStorage']._address !== null
            && reduxState.account !== "0x") {
    
            const result = await contracts.SimpleStorage.methods.get().call();
            setStoredData(result);
        }
    }
    
    const handleEvent = (receipt) => {
        
        if (receipt) {
            if (receipt.events["Change"] !== undefined) {
                setStoredData(receipt.events["Change"].returnValues["newVal"]);
            }
        }
    }
    
    const handleClose = () => {
        setTxHash("");
    }
    
    const handleReset = () => {
        inputRef.current.value = "";
        setMsg("");
        setStoredData("");
    }

    return (
        <Fragment>
            <Flex flexDirection="column" pl={20}>
                <Flex>
                    <FormGroup>
                        <Input type="number" required={true} size={200} min={0} ref={inputRef} onChange={handleChange} />
                        <Button onClick={handleSend}>Set</Button>
                        <Button mainColor="DarkCyan" onClick={handleGet}>Get</Button>
                        <Button mainColor="Orange" onClick={handleReset}>Reset</Button>
                    </FormGroup>
                </Flex>
                <Flex>
                    <Box py={20} fontWeight={"bold"} fontSize={4}>
                        {storedData}
                    </Box>
                </Flex>
        
                {msg !== "" ?
                    <Flex>
                        <Card maxWidth={"640px"}>
                            {msg}
                        </Card>
                    </Flex>
                    :' '
                }
    
            </Flex>
            <TxMessage txHash={txHash} close={handleClose}/>
        </Fragment>
        
    )
}

export default MyComponent;
