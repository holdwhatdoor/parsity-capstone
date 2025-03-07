import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useStore } from 'react-redux';

const CreateAccountPage = () => {
  
  const store = useStore();
  const navigate = useNavigate();

  const handleOnClickCreateAcctBtn = () => {

  }

  const handleOnClickCancelBtn = () => {
    navigate('/')
  }
  
  return(
    <div>
      <label>Create New Account</label>
      <div>
        <label>Username: </label>
        <input 
          type='text' 
          placeholder='User name'/>
        <label>Password: </label>
        <input
          type='password' 
          placeholder='password'
          />
        <label>Confirm Password: </label>
          <input
            type='password' 
            placeholder='password'
          />
      </div>
      <div>
      <button id='create-account-create-btn classic' onClick={ handleOnClickCancelBtn }>
          Create Account
        </button>
        <button id='create-account-cancel-btn classic' onClick={ handleOnClickCancelBtn }>
          Cancel
        </button>
      </div>
    </div>
  )

}

export default CreateAccountPage;