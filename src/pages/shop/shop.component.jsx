import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection-category/collection-category.component';

const ShopPage = () => {
  return (
    <Routes>
      <Route index element={<CollectionOverview />} />
      <Route path=':collectionId' element={<CollectionPage />} />
    </Routes>
  );
};

export default ShopPage;
