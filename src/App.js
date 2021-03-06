import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import {auth, firebase_auth, firebase_firestore, createUserProfileDocument} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'

//var async = require('async');

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = firebase_auth.onAuthStateChanged(auth, async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        firebase_firestore.onSnapshot(userRef, (snapShot) => {
            setCurrentUser({
                id: snapShot.id,
                ...snapShot.data()
            });

        })
      }else{
        setCurrentUser(userAuth);
      }  
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div> 
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/shop" component={ShopPage}/>
          <Route exact path="/signin" render = {() => this.props.currentUser ? (<Redirect to='/'/>): <SignInAndSignUpPage/>}/>
          <Route exact path="/checkout" component={CheckoutPage}/>
        </Switch>
      </div>
    );
  }
}

const mapUserToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapUserToProps, 
  mapDispatchToProps
)(App);
