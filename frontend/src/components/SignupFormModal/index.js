import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  useEffect(() => {
    const errors = [];
    if (username.length < 4) errors.push('Username must be greater than 4 characters');
    if (password.length < 6) errors.push('Password must be at least 6 characters');
    setErrors(errors);
  }, [username, password, email])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
      <div className="signup__container">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <form className='signupform' onSubmit={handleSubmit}>
          <ul className="signupError">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className="signup__field__container">
            <div className="signup__field">
              <label>
                Email
                <input
                  className="signup__input"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          <div className="signup__field__container">
            <div className="signup__field">
              <label>
                Username
                <input
                  className="signup__input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          <div className="signup__field__container">
            <div className="signup__field">
              <label>
                First Name
                <input
                  className="signup__input"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          <div className="signup__field__container">
            <div className="signup__field">
              <label>
                Last Name
                <input
                  className="signup__input"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          <div className="signup__field__container">
            <div className="signup__field">
              <label>
                Password
                <input
                  className="signup__input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>             
            </div>
          </div>
          <div className="signup__field__container">
            <div className="signup__field">
              <label>
                Confirm Password
                <input
                  className="signup__input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>            
            </div>
          </div>
          <div className="signup__submit__container">
            <button 
            className='signup__submit' 
            type="submit"
            disabled={errors.length ? true : false}
            >Sign Up
            </button>
          </div>
        </form>

      </div>
    </>
  );
}

export default SignupFormModal;