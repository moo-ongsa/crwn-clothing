import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom';

import {
  createUserProfileDocument,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";

import './App.css';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import Home from './routes/home/hompage.component';
import SignInAndSignUp from './routes/sign-in-and-sign-up/sign-in-and-sign-up.components';
import Checkout from './routes/checkout/checkout.component';
import { setCurrentUser } from './store/user/user.action'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserProfileDocument(user);
      }
      dispatch(setCurrentUser(user))
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigation />} >
          <Route path='/' element={<Home />} />
          <Route path='/shop/*' element={<Shop />} />
          <Route path='/signin' element={<SignInAndSignUp />} />
          <Route path='/checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
