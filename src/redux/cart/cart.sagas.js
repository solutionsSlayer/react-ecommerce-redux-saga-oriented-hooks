import { put, call, takeLatest, all } from 'redux-saga/effects';
import { userActionTypes } from '../user/user.types';

import { clearCart } from './cart.actions';

// WORKERS
function* clearCartOnSignOut() {
    yield put(clearCart());
}

// WATCHERS
function* onSignOutSuccess() {
    yield takeLatest(userActionTypes.USER_LOGOUT_SUCCESS, clearCartOnSignOut)
}


export default function* cartSagas() {
    yield all([call(onSignOutSuccess)]);
}