import { all } from "redux-saga/effects";
import helloSaga from "./helloSaga";
import accountSaga from "./accountSaga";
import refreshSaga from "./refreshSaga";

export default function * root() {
    // TODO-6
    //  accountSaga 추가
    const sagas = [ helloSaga(), refreshSaga() ];
    yield all(sagas);

}
