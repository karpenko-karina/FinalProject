import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {NaviBar} from './Components/Navibar';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import {Home}     from './Pages/Home'
import {Users}    from './Pages/Users'
import {Product}  from './Pages/Product'
import {Cart}     from './Pages/Cart'
import {Signin}   from './Pages/Signin';
import {Register} from './Pages/Register';
import {Profile} from './Pages/Profile';

function App() {
  return (
    <>
      <Router>
        <NaviBar />

        <Switch>
            <Route exact path="/"       component={Home} />
            <Route path="/users"        component={Users} />
            <Route path="/signin"       component={Signin} />
            <Route path="/register"     component={Register} />
            <Route path="/product/:id?" component={Product} />
            <Route path="/cart/:id?"    component={Cart} />
            <Route path="/profile"      component={Profile} />
        </Switch>
      </Router>
    </>
  );
}

export default App;