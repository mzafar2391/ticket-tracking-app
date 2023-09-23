import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

function Register(props){
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    //const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function submitRegistration(e) {
        e.preventDefault();
        
        client.post(
          "/register/",
          {
            email: email,
            username: props.username,
            password: password
          }
        ).then(function(res) {
            navigate('/home');
          })}
    

      return (
        <div>
            <form onSubmit={e => submitRegistration(e)}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required></input>
            <br></br>
              
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" placeholder="username" value={props.username} onChange={e => props.setUsername(e.target.value)} required></input>
            <br></br>

            <label htmlFor="pass">Password:</label>
            <input type="password" id="pass" name="pass" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required></input>
            <br></br>
            <button type="submit">Register</button>
            </form>
            <br/>
            <Link to="/login">login</Link>
        </div>
       



      );
}

export default Register;