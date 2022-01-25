import React from 'react';

import { useParams } from 'react-router-dom';
import { selectShopCollections } from '../../redux/shop/shop.selectors';
import { connect } from 'react-redux';

import {
  CollectionTitle,
  CollectionPageContainer,
  CollectionItemsContainer,
} from './collection.styles';

import CollectionItem from '../../components/collection-item/collection-item.component';
import { createStructuredSelector } from 'reselect';

const CollectionPage = ({ collections }) => {
  const { collectionId } = useParams();
  const collection = collections[collectionId];

  return (
    <CollectionPageContainer>
      <CollectionTitle>{collection.title}</CollectionTitle>
      <CollectionItemsContainer>
        {collection.items.map((item) => (
          <CollectionItem
            className='collection-item'
            key={item.id}
            item={item}
          />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectShopCollections,
});

export default connect(mapStateToProps, null)(CollectionPage);
