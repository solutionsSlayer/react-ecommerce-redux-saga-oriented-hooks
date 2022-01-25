import { takeLatest, call, put, all, takeEvery } from 'redux-saga/effects';
import { userActionTypes } from './user.types';

import { signInWithPopup, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider, createUserProfileDoc, getCurrentUser } from '../../firebase/firebase.utils';

import { signInWithSuccess, signInWithFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from './user.actions';
import { getDoc } from 'firebase/firestore';
import { clearCart } from '../cart/cart.actions';

// WORKERS
function* getDocFromUserRefAndSetUser(user) {
    try {
        // Create user if do not exist and return ref
        const userRef = yield call(createUserProfileDoc, user);

        // Get document from ref
        const userDoc = yield getDoc(userRef);

        // Dispatch action in store with new user set
        yield put(signInWithSuccess({
            id: userDoc.id,
            ...userDoc.data()
        }));

    } catch (err) {
        yield put(signInWithFailure(err.message));
    }
}

function* signInWithGoogleAsync() {
    try {
        const { user } = yield signInWithPopup(auth, googleProvider);
        yield getDocFromUserRefAndSetUser(user);

    } catch (err) {
        yield put(signInWithFailure(err.message));
    }
}

function* signInWithEmailAsync({ payload: { email, password } }) {
    try {
        const { user } = yield signInWithEmailAndPassword(auth, email, password);
        yield getDocFromUserRefAndSetUser(user)

    } catch (err) {
        yield put(signInWithFailure(err.message));
    }
}

function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return

        yield getDocFromUserRefAndSetUser(userAuth);
    } catch(err) {
        yield put(signInWithFailure(err.message));
    }
}

function* userSignOut() {
    try {
        signOut(auth)
        yield put(signOutSuccess())
        yield put(clearCart())
    } catch(err) {
        yield put(signOutFailure(err.message));
    }
}

function* signUpAsync({ payload: { email, password, name } }) {
    try {
        // CREATE AUTHENTICATION IN FIREBASE
        const { user } = yield createUserWithEmailAndPassword(auth, email, password);

        // SET DOCUMENT IN DATABASE
        yield createUserProfileDoc(user, { name });

        yield put(signUpSuccess(user));

    } catch(err) {
        yield put(signUpFailure());
    }
}

// WATCHERS
function* onSigninWithGoogleStart() {
    yield takeLatest(userActionTypes.SIGNIN_WITH_GOOGLE_START, signInWithGoogleAsync)
}

function* onSigninWithEmailAndPassword() {
    yield takeLatest(userActionTypes.SIGNIN_WITH_EMAIL_START, signInWithEmailAsync)
}

function* onCheckUserSession() {
    yield takeEvery(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

function* onUserSignOut() {
    yield takeLatest(userActionTypes.USER_LOGOUT_START, userSignOut)
}

function* onUserSignUpStart() {
    yield takeLatest(userActionTypes.SIGNUP_START, signUpAsync)
}

export default function* userSagas() {
    yield all(
        [
            call(onSigninWithGoogleStart), 
            call(onSigninWithEmailAndPassword), 
            call(onCheckUserSession), 
            call(onUserSignOut),
            call(onUserSignUpStart)
        ]
    )
}