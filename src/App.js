import React from "react";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import {  Switch, Route  } from "react-router-dom";
import HeaderComponent from "./components/header/header.component";
import SignInSignUp from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, () => console.log(this.state));
        });
      }
      this.setState({currentUser: userAuth});
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className='body'>
        <HeaderComponent currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage}  />
          <Route exact path="/shop" component={ShopPage}  />
          <Route exact path="/signin" component={SignInSignUp}  />
        </Switch>
      </div>
    );
  }
}

export default App;
