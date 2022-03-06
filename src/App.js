import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/hompage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.components';
import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"

function App() {

  const [currentUser, setCurrentUser] = useState(null)


  useEffect(() => {
    const unsubscriptionFromAuth = onAuthStateChanged(auth, async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        onSnapshot(userRef, (snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        });
      } else {
        setCurrentUser(null)
      }
    })
    return unsubscriptionFromAuth
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
