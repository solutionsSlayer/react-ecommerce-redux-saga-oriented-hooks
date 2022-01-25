import React, { useState } from 'react';
import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';

const SignUp = ({ signUpStart }) => {
  const [useCredentials, setCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { displayName, email, password, confirmPassword } = useCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Something wrong, please try later.');
      return;
    }

    signUpStart(email, password, displayName);

    setCredentials({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials({
      ...useCredentials,
      [name]: value,
    });
  };

  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form>
        <FormInput
          type='text'
          label='Name'
          name='displayName'
          handleChange={handleChange}
          value={displayName}
        />
        <FormInput
          type='email'
          label='Email'
          name='email'
          handleChange={handleChange}
          value={email}
        />
        <FormInput
          type='password'
          label='Password'
          name='password'
          handleChange={handleChange}
          value={password}
        />
        <FormInput
          type='password'
          label='Confirm password'
          name='confirmPassword'
          handleChange={handleChange}
          value={confirmPassword}
        />

        <CustomButton type='submit' onClick={handleSubmit}>
          SIGN UP
        </CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (email, password, name) =>
    dispatch(signUpStart({ email, password, name })),
});

export default connect(null, mapDispatchToProps)(SignUp);
