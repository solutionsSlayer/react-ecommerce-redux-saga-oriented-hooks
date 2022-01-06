import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.compoenent';

import { connect } from 'react-redux';

import './cart-dropdown.component.scss';

const CartDropdown = ({ cartItems }) => (
  <div className='cart-dropdown'>
    {cartItems.length > 0 ? (
      cartItems.map((item) => <CartItem item={item} />)
    ) : (
      <div>No products in cart.</div>
    )}
    <CustomButton>SHOP NOW</CustomButton>
  </div>
);

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems,
});

export default connect(mapStateToProps)(CartDropdown);
