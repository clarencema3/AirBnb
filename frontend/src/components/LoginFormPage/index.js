import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='loginform__container'>
    <form className='loginform' onSubmit={handleSubmit}>
      <p className='logintext'>Log In</p>
      <ul className='loginError'>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className='credentialField'>
        <label>
          Username or Email
          <input
            className='credentialField__input'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
      </div>
      <div className='passwordField'>
        <label>
          Password
          <input
            className='passwordField__input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <div className='login__submit__container'>
        <button className='login__submit' type="submit">Log In</button>
      </div>
    </form>

    </div>
  );
}

export default LoginFormPage;