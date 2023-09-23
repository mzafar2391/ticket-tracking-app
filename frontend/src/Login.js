import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

function Login(props){
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function submitLogin(e) {
        e.preventDefault();
        
        client.post(
          "/login/",
          {
            username: props.username,
            password: password
          }
        ).then(function(res) {
            navigate('/home');
            client.post(
              "/projectlist/",
              {
                username: props.username,
                
              }
            ).then(function(res){
              props.setList(res.data['list'])
            })
          })}
    

      return (
        <div>
            <form onSubmit={e => submitLogin(e)}>
              
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" placeholder="username" value={props.username} onChange={e => props.setUsername(e.target.value)} required></input>
            <br></br>

            <label htmlFor="pass">Password:</label>
            <input type="password" id="pass" name="pass" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required></input>
            <br></br>
            <button type="submit">Login</button>
            </form>
        </div>
       



      );
}

export default Login;