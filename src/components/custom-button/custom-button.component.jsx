import React from 'react';
import './custom-button.component.scss';

const CustomButton = ({ children, isGoogleSignIn, reverse, ...otherProps }) => (
  <button
    className={`custom-button ${isGoogleSignIn ? 'google-sign-in' : ''} ${
      reverse ? 'reverse' : ''
    }`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
