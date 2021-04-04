import React from "react";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import {  Switch, Route  } from "react-router-dom";
import HeaderComponent from "./components/header/header.component";
import SignInSignUp from "./pages/sign-in-sign-up/sign-in-sign-up.component";

import "./App.css";

function App() {
  return (
    <div className='body'>
      <HeaderComponent/>
      <Switch>
        <Route exact path="/" component={HomePage}  />
        <Route exact path="/shop" component={ShopPage}  />
        <Route exact path="/signin" component={SignInSignUp}  />
      </Switch>
    </div>
  );
}

export default App;
