import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  convertCollectionSnapshotToMap,
  db,
} from '../../firebase/firebase.utils';
import updateShopCollections from '../../features/shop/shop.actions';

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection-category/collection-category.component';
import { collection, getDocs } from 'firebase/firestore';

class ShopPage extends React.Component {
  async componentDidMount() {
    const { updateCollection } = this.props;

    const collectionsRef = collection(db, 'collections');
    const collectionsSnapShot = await getDocs(collectionsRef);

    const collections = convertCollectionSnapshotToMap(collectionsSnapShot);

    updateCollection(collections);
  }

  render() {
    return (
      <Routes>
        <Route index element={<CollectionOverview />} />
        <Route path=':collectionId' element={<CollectionPage />} />
      </Routes>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollection: (collections) =>
    dispatch(updateShopCollections(collections)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
