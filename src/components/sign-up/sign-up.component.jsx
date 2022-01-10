import React from 'react';
import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, createUserProfileDoc } from '../../firebase/firebase.utils';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert('Something wrong, please try later.');
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await createUserProfileDoc(user, { displayName });

      this.state = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form>
          <FormInput
            type='text'
            label='Name'
            name='displayName'
            handleChange={this.handleChange}
            value={displayName}
          />
          <FormInput
            type='email'
            label='Email'
            name='email'
            handleChange={this.handleChange}
            value={email}
          />
          <FormInput
            type='password'
            label='Password'
            name='password'
            handleChange={this.handleChange}
            value={password}
          />
          <FormInput
            type='password'
            label='Confirm password'
            name='confirmPassword'
            handleChange={this.handleChange}
            value={confirmPassword}
          />

          <CustomButton type='submit' onClick={this.handleSubmit}>
            {' '}
            SIGN UP{' '}
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
