import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './ProfileButton.css'
import { NavLink, useHistory } from 'react-router-dom'; 

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className='icon-button' onClick={openMenu}>
        <i className="fa-solid fa-bars"></i>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="menu__container">
              <div className="menu__items">
                <li>Hello, {user.firstName}</li>
                <li>{user.email}</li>
              </div>
              <div className="manage__container">
                <NavLink className='manage__link' to='/spots/current'>Manage Spots</NavLink>
              </div>
                <div className="logout-button__container">
                  <li>
                    <button className="logout-button" onClick={logout}>Log Out</button>
                  </li>
                </div>
            </div>
          </>
        ) : (
          <>
            <li className="login-modal">
              <OpenModalMenuItem
                 className='modal-form'
                 itemText="Log In"
                 onItemClick={closeMenu}
                 modalComponent={<LoginFormModal />}
               />

            </li>
            <li className="signup-modal">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;