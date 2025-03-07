import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useStore } from 'react-redux';
import SearchBar from './search-bar';

const UserPage = () => {

  const store = useStore();
  const navigate = useNavigate();

  const handleOnLogoutClick = () => {
    const landingPageUrl = "/"
    navigate(landingPageUrl)
  }
  
  return(
    <div>
      <h2 className='user-header'>User</h2>
      <div>
        <div>
          <SearchBar />
        </div>
        <div>
        <button id='user-logout classic' onClick={ handleOnLogoutClick }>
          Logout</button>
      </div>
      </div>
    </div>
  )
}

export default UserPage;