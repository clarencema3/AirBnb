import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../assests/images/logo.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-container'>
      <ul className='nav-items'>
        <div className='left-nav'>
          <li className='nav-name'>
            <NavLink className='nav-name' exact to="/">
              <img src={logo} alt='logo' className='logo-image'/>
              themeNB
            </NavLink>
          </li>
        </div>
        <div className='right-nav'>
          {sessionUser && (
            <li className='create-spot'>
              <NavLink className='create-link' to='/spots/new'>Create a New Spot</NavLink>
            </li>
          )}
          {isLoaded && (
            <li className='nav-profile'>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Navigation;