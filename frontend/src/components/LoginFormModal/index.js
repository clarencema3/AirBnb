import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [validations, setValidations] = useState([]);
  const { closeModal } = useModal();

  useEffect(() => {
    const errors = [];
    if (credential.length < 4) errors.push('Username must be greater than 4 characters');
    if (password.length < 6) errors.push('Password must be at least 6 characters');
    setValidations(errors);
  }, [credential, password])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  const demoUser = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password"}))
      .then(closeModal)
  }

  return (
    <>
      <div className="loginform__container">
        <div className="logintext">
          <h1>Log In</h1>
        </div>
        <form className='loginform' onSubmit={handleSubmit}>
          <ul className="loginError">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="field__container">
            <div className="field">
              <label>
                Username or Email
                <input
                  className="field__input"
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          <div className="field__container">
          <div className="field">
            <label>
              Password
              <input
                className="field__input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          </div>
          <div className="login__submit__container">
           <button 
           className='login__submit'
            type="submit"
            disabled={validations.length ? true : false}
            >Log In
            </button>
          </div>
          <div className="demologin__container">
            <button className='demologin__button' onClick={demoUser}>Demo User</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;