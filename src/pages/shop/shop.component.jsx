import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionStart } from '../../redux/shop/shop.actions';

import CollectionPageContainer from '../collection-category/collection-category.container';
import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container';

const ShopPage = ({ fetchCollections }) => {
  useEffect(() => {
    fetchCollections();
  });

  return (
    <Routes>
      <Route index element={<CollectionOverviewContainer />} />
      <Route path=':collectionId' element={<CollectionPageContainer />} />
    </Routes>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollections: () => dispatch(fetchCollectionStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
