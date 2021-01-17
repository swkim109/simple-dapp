import {takeLatest} from "redux-saga/effects";
import * as Actions from "../actions"

function * sayHello(action) {
    console.log("Hello, redux-saga ", action.type);
}

function * helloSaga() {
    yield takeLatest(Actions.SAY_HELLO_SAGA , sayHello);
}

export default helloSaga;

