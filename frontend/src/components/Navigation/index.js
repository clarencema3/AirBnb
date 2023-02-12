import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../assests/images/logo.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-container'>
      <ul className='nav-items'>
          <li className='nav-name'>
            <NavLink className='nav-name' exact to="/">
              <img src={logo} alt='logo' className='logo-image'/>
              themeNB
            </NavLink>
          </li>
          {isLoaded && (
            <li className='nav-profile'>
              <ProfileButton user={sessionUser} />
            </li>
          )}
      </ul>
    </div>
  );
}

export default Navigation;