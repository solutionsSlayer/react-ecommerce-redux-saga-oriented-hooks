import React from 'react';
import CustomButton from '../custom-button/custom-button.component';

import { connect } from 'react-redux';
import { addItem } from '../../features/cart/cart.actions';

import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem }) => {
  console.log(item);
  const { imageUrl, name, price, id } = item;

  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price} $</span>
      </div>
      <CustomButton onClick={() => addItem(item)} reverse>
        ADD TO CART
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
