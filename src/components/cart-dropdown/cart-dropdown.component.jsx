import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../features/cart/cart.selectors';
import { toggleCartDropdown } from '../../features/cart/cart.actions';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, dispatch, toggleCart }) => {
  const navigate = useNavigate();

  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {cartItems.length > 0 ? (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <div>No products in cart.</div>
        )}
      </div>
      <CustomButton
        onClick={() => {
          dispatch(toggleCart);
          navigate('/checkout');
        }}
      >
        SHOP NOW
      </CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  toggleCart: toggleCartDropdown,
});

export default connect(mapStateToProps)(CartDropdown);
