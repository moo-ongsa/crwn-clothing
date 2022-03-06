import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/hompage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.components';
import Header from './components/header/header.component';

import { auth } from "./firebase/firebase.utils";

function App() {

  const [currentUser, setCurrentUser] = useState(null)


  useEffect(() => {
    const unsubscriptionFromAuth = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      console.log("🚀 ~ file: App.js ~ line 19 ~ useEffect ~ user", user)
    })
    return unsubscriptionFromAuth()
  }, [])

  return (
    <div className="App">
      <Header currentUser={currentUser} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/signin' element={<SignInAndSignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
