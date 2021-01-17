import { takeLatest } from 'redux-saga/effects';
import * as Actions from '../actions';

function * refresh(action) {
    window.location.href = "http://localhost:3000";
}

function * refreshSaga() {
    yield takeLatest(Actions.APPLICATION_REFRESH, refresh);
}

export default refreshSaga;
