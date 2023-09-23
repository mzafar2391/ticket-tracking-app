//import logo from './logo.svg';

import './App.css';


import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddNew from './AddNew';
import Register from './Register';
import { Route, Routes, Link } from "react-router-dom"
import Login from './Login';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function App(){



  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [page, setPage] = useState('');
  const [projectlist, setList] = useState([]);

  // useEffect(() => {
  //   client.get("/api/user")
  //   .then(function(res) {
  //     setCurrentUser(true);
  //   })
  //   .catch(function(error) {
  //     setCurrentUser(false);
  //   });
  // }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "/register/",
      {
        email: email,
        username: username,
        password: password
      }
    )
    .then(function(res){
        setPage('home');
    })
    .catch((error)=> {
      if (error.response) {
        // The request was made and the server responded with a status code 
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log('he');
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        console.log('her')
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
  });
    
    // .then(function(res) {
    //   client.post(
    //     "/api/login",
    //     {
    //       email: email,
    //       password: password
    //     }
    //   ).then(function(res) {
    //     setCurrentUser(true);
    //   });
    // });
  }

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/api/login",
      {
        email: email,
        password: password
      }
    ).then(function(res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });
  }

  if(page==='home'){

    return(
      <AddNew email={email}></AddNew>
    );

  }

  else{ 
  return(     
    
    
  <div>
    <Routes>
      <Route exact path='/' element={<Register username={username} setUsername={setUsername} />} />
      <Route path='/home' element={<AddNew username={username} projectlist={projectlist}/>}/>
      <Route path='/login' element={<Login username={username} setUsername={setUsername} setList={setList}/>}/>

    </Routes>
    {/* <form onSubmit={e => submitRegistration(e)}>
    <label htmlFor="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required></input>
    <br></br>

    <label htmlFor="username">Username:</label>
    <input type="text" id="username" name="username" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} required></input>
    <br></br>

    <label htmlFor="pass">Password:</label>
    <input type="password" id="pass" name="pass" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required></input>
    <br></br>
    <button type="submit">Register</button>
    </form> */}
  </div>

    

    );}
  }


  




export default App;