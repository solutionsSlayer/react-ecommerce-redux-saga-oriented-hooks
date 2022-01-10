import { createSelector } from "reselect";
import memoize from 'lodash.memoize';

export const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectShopCollectionPreview = createSelector(
    [selectShopCollections],
    collections => Object.keys(collections).map(key => collections[key])
)

export const selectShopCollection = memoize((collectionParam) => (
    createSelector(
        [selectShopCollections],
        collections => collections[collectionParam]
    )
));