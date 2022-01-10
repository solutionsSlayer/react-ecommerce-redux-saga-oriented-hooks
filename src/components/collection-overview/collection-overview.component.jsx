import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectShopCollectionPreview } from '../../features/shop/shop.selectors';
import CollectionPreview from '../../components/collection-preview/collection-preview';

import './collection-overview.styles.scss';

const CollectionOverview = ({ shopCollections }) => (
  <div className='collection-overview'>
    {shopCollections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  shopCollections: selectShopCollectionPreview,
});

export default connect(mapStateToProps)(CollectionOverview);
