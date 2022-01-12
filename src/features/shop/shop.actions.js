import { shopActionTypes } from "./shop.types";

const updateShopCollections = collections => ({
    type: shopActionTypes.UPDATE_SHOP_COLLECTIONS,
    payload: collections
});

export default updateShopCollections;