import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useStore } from 'react-redux';

const LandingPage = () => {

  const store = useStore();
  const navigate = useNavigate();

  const handleOnUserLoginClick = () => {
    const userLoginURL = 'user-login'
    navigate(userLoginURL)
  }

  const handleOnCreateAccountClick = () => {
    const createAccountURL = 'create-account';
    navigate(createAccountURL)
  }

  const handleOnSearchClick = () => {
    const searchURL = 'search';
    navigate(searchURL)
  }
  
  return(
    <div>
      <h2 className='main-title'>Nutrition Tracker</h2>
      <div>
        <button id='existing-user-login classic' onClick={ handleOnUserLoginClick }>
          Go to Login</button>
      </div>
      <div>
        <button id='create-account-btn classic' onClick={ handleOnCreateAccountClick }>
          Create User Account
          </button>
      </div>
      <div>
        <button id='search-btn classic' onClick={ handleOnSearchClick }>
          Search Page
        </button>
      </div>
    </div>
  )
}

export default LandingPage;