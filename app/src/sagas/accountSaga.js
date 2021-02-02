import { takeLatest, call, put, take } from 'redux-saga/effects';
import { END, eventChannel } from 'redux-saga';
import * as Actions from '../actions';
import { accountFetched, applicationRefresh } from "../actions/actionCreator";


function createEventChannel({status, web3, account}) {
    
    const interval = 3000; //ms
    
    return eventChannel(emitter => {
        
        const accountPoll = setInterval(() => {
    
            if (status === "initialized") {
                
                //TODO-4
                // 잔액조회
                
                
            } else {
                emitter(END);
            }
        }, interval);
        
        const unsubscribe = () => {
            clearInterval(accountPoll);
        }
        return unsubscribe;
    })
    
}

function * getBalance(action) {
    
    // 계정 잔액을 이벤트 채널을 통해 주기적으로 받아온다.
    const ch = yield call(createEventChannel, action.payload);
    
    try {
        
        while (true) {
            let balance = yield take(ch);
            //TODO-5
            // 새로운 액션 디스패치
            
           
        }
        
    } finally {
        console.log('Event End');
        yield put(applicationRefresh());
    }
}

// TODO-3
//  액션이 디스패치되는 것을 기다리는 함수
function * accountSaga() {

}

export default accountSaga;
