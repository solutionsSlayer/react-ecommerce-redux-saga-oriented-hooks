import React from 'react';
import { connect } from 'react-redux';
import { toggleCartDropdown } from '../../redux/cart/cart.actions';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { selectItemsCount } from '../../redux/cart/cart.selectors';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartDropdown, itemsCount }) => (
  <div onClick={toggleCartDropdown} className='cart-icon'>
    <ShoppingIcon />
    <span className='item-count'>{itemsCount}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartDropdown: () => dispatch(toggleCartDropdown()),
});

const mapStateToProps = (state) => ({
  itemsCount: selectItemsCount(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
