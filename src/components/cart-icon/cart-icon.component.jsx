import React from 'react';
import { connect } from 'react-redux';
import { toggleCartDropdown } from '../../features/cart/cart.actions';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartDropdown }) => (
  <div onClick={toggleCartDropdown} className='cart-icon'>
    <ShoppingIcon />
    <span className='item-count'>0</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartDropdown: () => dispatch(toggleCartDropdown()),
});

export default connect(null, mapDispatchToProps)(CartIcon);
