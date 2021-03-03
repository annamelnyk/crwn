import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import CheckoutPage from './pages/checkout/checkout';
import {
  auth,
  createUserProfileDocument,
  addCollectionAndDocuments,
} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectSelectionsForPreview } from './redux/shop/shop.selectors';
import './App.css';

class App extends Component {
  unSubscribedFromAuth = null;

  componentDidMount() {
    const {
      setCurrentUser,
      collections,
    } = this.props;

    this.unSubscribedFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      let userRef = null;
      if (userAuth) {
        userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()   
          });
        })
      }

      setCurrentUser(userAuth);

      // we need uncomment to put collection in DB

      // console.log('collections ', collections);
      // addCollectionAndDocuments('collections', collections.map(
      //   ({ title, items }) => ({ title, items }))
      // );
    });
  }

  componentWillUnmount() {
    this.unSubscribedFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route path="/signin" render={() =>
            this.props.currentUser 
            ? (<Redirect to='/' />) 
            : (<SignInAndSignUpPage />) 
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collections: selectSelectionsForPreview,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
