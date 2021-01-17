import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import { reducers } from "../reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
import { defaultState } from "./defaultState";

export function generateStore() {
    
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
    const sagaMiddleware = createSagaMiddleware();
    
    //const preloadedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : defaultState;
    const preloadedState = {
        'appReducer': defaultState
    };

    const store = createStore(
        combineReducers(reducers),
        preloadedState,
        composeEnhancers (
            applyMiddleware(sagaMiddleware)
        )
        
    );
    
    sagaMiddleware.run(rootSaga);
    
    return store;
}

