import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { store } from './store.js'
import LandingPage from './components/landing-page'
import UserLoginPage from './components/user-login-page'
import CreateAccountPage from './components/create-account'
import UserPage from './components/user-page'
import './index.css'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes >
        <Route path='/' Component={ LandingPage } />
        <Route path='/user-login' Component={ UserLoginPage } />
        <Route path='/create-account' Component={ CreateAccountPage } />
        <Route path='/:user' Component={ UserPage } />
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
