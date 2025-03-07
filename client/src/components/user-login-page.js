import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useStore } from 'react-redux';

const UserLoginPage = () => {
  
  const store = useStore();
  const navigate = useNavigate();
  
  const handleOnCancelBtnClick = () => {
    navigate('/')
  }

  return(
    <div className='user-input-container' >
      <div classname="user-login-title">
        <label>User Sign-in</label>
      </div>
      <div className='user-login-input'>
        <label>Username: </label>
        <input className='username-input'></input>
        <label>Password: </label>
        <input className='user-password-input' type='password'></input>
      </div>
      <button id='user-login-submit-btn classic'>Submit</button>
      <button id='user-login-cancel-btn classic' onClick={ handleOnCancelBtnClick }>Cancel</button>
    </div>
  )
}

export default UserLoginPage;