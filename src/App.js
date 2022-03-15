import React, { Component } from 'react';
import HomePage from './pages/homepage/homepage.component';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument} from './firebase/firebase.utils';


class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      createUserProfileDocument(userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(onSnapshot => {
          this.setState({
            id: onSnapshot.id,
            ...onSnapshot.data()
          })
        })
        // console.log(this.state);
      }
      else{
        this.setState({currentUser: userAuth});
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render () {
  return (
    <div>
       <Routes>
        <Route  path='/' element={<Header/>} />
          <Route index component={<HomePage />} />
          <Route path='/shop' component={<ShopPage />} />
          <Route path='/signin' component={<SignInAndSignUp />} />
      </Routes>
    </div>
  );
}
}

export default App;
