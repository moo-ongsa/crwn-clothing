import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import Home from './routes/home/hompage.component';
import SignInAndSignUp from './routes/sign-in-and-sign-up/sign-in-and-sign-up.components';
import Checkout from './routes/checkout/checkout.component';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigation />} >
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/signin' element={<SignInAndSignUp />} />
          <Route path='/checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
