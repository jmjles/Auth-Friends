import React,{useState,useEffect} from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom'
import Login from './components/Login'
import FriendList from './components/FriendList'
import PrivateRoute from './components/PrivateRoute'
import { Button } from '@material-ui/core';

function App() {
  const [storage,setStorage]= useState(window.localStorage.getItem("key"));
  
  const logout = () => {
    window.localStorage.removeItem("key")
    setStorage(window.localStorage.getItem("key"));
  }
  return (
    <div className="App">
      <Button color="secondary" onClick={logout} variant="outlined">
        Log Out
      </Button>
      <Switch>
        <Route path="/login"  render={props => <Login  {...props} setStorage={setStorage}/>} />
        <PrivateRoute
          path="/friendlist"
          component={FriendList}
          storage={storage}
        />
      </Switch>
    </div>
  );
}

export default App;
