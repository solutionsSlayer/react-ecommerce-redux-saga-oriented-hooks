import React from 'react';
import { connect } from 'react-redux';
import {
  removeCartItem,
  addItem,
  removeItem,
} from '../../features/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, removeCartItem, removeItem, addItem }) => {
  const { imageUrl, name, price, quantity } = cartItem;
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='product item' />
      </div>
      <div className='name'>{name}</div>
      <div className='quantity'>
        <div onClick={() => removeItem(cartItem)} className='arrow'>
          &#10094;
        </div>
        <div className='value'>{quantity}</div>
        <div onClick={() => addItem(cartItem)} className='arrow'>
          &#10095;
        </div>
      </div>
      <div className='price'>{price}$</div>
      <div onClick={() => removeCartItem(cartItem)} className='remove-button'>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeCartItem: (item) => dispatch(removeCartItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
