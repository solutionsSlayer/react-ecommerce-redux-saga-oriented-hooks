import React from 'react';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import CheckoutForm from './checkout-form.component';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_ogYeih0zAUUmWcS6XGPCqzmo009p71X5cU');

const StripeCheckout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm price={250} />
    </Elements>
  );
};

export default StripeCheckout;
