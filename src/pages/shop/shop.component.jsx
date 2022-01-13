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
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { collection, getDocs } from 'firebase/firestore';

const CollectionOverviewWihSpinner = WithSpinner(CollectionOverview);
const CollectionPageWihSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    console.log(CollectionOverviewWihSpinner);
    const { updateCollection } = this.props;
    const collectionsRef = collection(db, 'collections');
    const collectionsSnapShot = await getDocs(collectionsRef);

    const collections = convertCollectionSnapshotToMap(collectionsSnapShot);

    await updateCollection(collections);

    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <Routes>
        <Route
          index
          element={<CollectionOverviewWihSpinner isLoading={loading} />}
        />
        <Route
          path=':collectionId'
          element={<CollectionPageWihSpinner isLoading={loading} />}
        />
      </Routes>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollection: (collections) =>
    dispatch(updateShopCollections(collections)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
