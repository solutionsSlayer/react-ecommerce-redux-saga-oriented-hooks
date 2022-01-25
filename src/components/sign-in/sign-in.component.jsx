import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { connect } from 'react-redux';
import {
  signInWithGoogleStart,
  signInWithEmailStart,
} from '../../redux/user/user.actions';

import './sign-in.styles.scss';

const SignIn = ({ signInWithGoogleStart, signInWithEmailStart }) => {
  const [useCredentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = useCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    signInWithEmailStart(email, password);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setCredentials({ ...useCredentials, [name]: value });
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={email}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          handleChange={handleChange}
          label='password'
          required
        />

        <div className='buttons'>
          <CustomButton type='submit'>Sign in</CustomButton>
          <CustomButton
            type='button'
            onClick={signInWithGoogleStart}
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signInWithGoogleStart: () => dispatch(signInWithGoogleStart()),
  signInWithEmailStart: (email, password) =>
    dispatch(signInWithEmailStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
