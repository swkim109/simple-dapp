import React, {useState, useEffect, createContext} from 'react';
import {BaseLayout, TopLayout, LeftLayout, LeftMenu, TopMenu} from "./layouts";
import {LEFT_OFFSET} from "./layouts/Constants";
import {Router, View} from "react-navi";
import routes from "./navi/routes";
import Account from "./pages/Account";
import { accountFetching } from "./actions/actionCreator";

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { generateStore } from "./store/generateStore";
import { walletProvider } from "./utils/walletProvider";

//리액트 컨텍스트 API
const Context = createContext();
const Provider = Context.Provider;
const Consumer = Context.Consumer;

//리덕스 스토어 생성
const store = generateStore();

const web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions: {
        walletconnect: {
            package: WalletConnectProvider, //required
            options: {
                infuraId: "5193...c55a"
            }
        }
    }
});

function App() {
    
    // 지갑 연결 후 만들어지는 web3 객체
    const [web3obj, setWeb3obj] = useState({web3: null, providerType: ""});
    
    // 좌측 메뉴
    const [show, setShow] = useState(false);
    
    const toggleLeftMenu = () => {
        setShow(!show);
    }
    
    //데스크탑 브라우저에만 적용
    useEffect(()=>{
        window.addEventListener("mousemove", handleMouseMove);
    }, []);
    
    
    //데스크탑 브라우저에만 적용
    const handleMouseMove = (e) => {
        if (e.clientX >= parseInt(LEFT_OFFSET)) {
            setShow(false);
        }
    }
    
    
    const handleConnect = async () => {
        
        if (web3obj.web3 === null) {
            const provider = await web3Modal.connect();
            const web3 = new Web3(provider);
            setWeb3obj({...web3obj, web3, providerType: walletProvider(provider)});
            
        } else {
            
            if (web3obj.providerType === "WalletConnect") {
                localStorage.removeItem("walletconnect");
            }
            
            setWeb3obj({web3: null, providerType: ""});
            
            //
            store.dispatch(accountFetching({status: ""}));
        }
    }
    
    
    return (
        
        <BaseLayout>
            <Router routes={routes} context={{web3obj, web3Modal}}>
                <Provider value={{web3obj, store}}>
                    <TopLayout>
                        <TopMenu toggleLeftMenu={toggleLeftMenu} handleConnect={handleConnect}/>
                    </TopLayout>
                    <LeftLayout flag={show}>
                        <LeftMenu/>
                    </LeftLayout>
                    <View/>
                    <Account/>
                </Provider>
            </Router>
        </BaseLayout>
    );
}

export default App;

export {
    Context,
    Provider,
    Consumer
}
