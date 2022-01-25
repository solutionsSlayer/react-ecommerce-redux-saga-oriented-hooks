import { call, takeLatest, put, all } from 'redux-saga/effects';
import { shopActionTypes } from './shop.types';

import { collection, getDocs } from 'firebase/firestore';
import { db, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionSuccess, fetchCollectionFailure } from './shop.actions';

// WORKERS
function* fetchCollectionsAsync() {
    try {
        const collectionsRef = collection(db, 'collections');
        const collectionsSnapShot = yield getDocs(collectionsRef);
        const collections = yield call(convertCollectionSnapshotToMap, collectionsSnapShot);

        yield put(fetchCollectionSuccess(collections))
    } catch (err) {
        yield put(fetchCollectionFailure(err.message))
    }
}

// WATCHERS
function* fetchCollectionsStart() {
    yield takeLatest(shopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export default function* shopSagas() {
    yield all([call(fetchCollectionsStart)])
}