import { shopActionTypes } from "./shop.types";

import { db, convertCollectionSnapshotToMap } from "../../firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";

export const fetchCollectionStart = () => ({
    type: shopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionSuccess = collections => ({
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collections
});

export const fetchCollectionFailure = () => ({
    type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
});

export const fetchCollectionStartAsync = () => async dispatch => {
    try {
        dispatch(fetchCollectionStart());
        const collectionsRef = collection(db, 'collections');
        const collectionsSnapShot = await getDocs(collectionsRef);
        const collections = convertCollectionSnapshotToMap(collectionsSnapShot);

        dispatch(fetchCollectionSuccess(collections))
    } catch (err) {
        dispatch(fetchCollectionFailure(err.message))
    }
}