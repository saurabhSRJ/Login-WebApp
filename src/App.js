import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import history from "./history"
import Login from "./login";
import HomePage from './components/homePage';
import Registration from './components/Registration';

function App(){
  return(
      <Router history = {history}>
        <Switch>
          <Route path = "/" exact component = {Login}/>
          <Route path = "/home" component = {HomePage}/>
          <Route path = "/registration" component = {Registration}/>
         </Switch>
      </Router>
  );
};

export default App;
