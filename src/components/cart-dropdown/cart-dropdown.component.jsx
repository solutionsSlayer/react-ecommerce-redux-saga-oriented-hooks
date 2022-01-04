import React from 'react';
import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.component.scss';

export const CartDropdown = () => (
  <div className='cart-dropdown'>
    <div className='cart-items'></div>
    <CustomButton>SHOP NOW</CustomButton>
  </div>
);
