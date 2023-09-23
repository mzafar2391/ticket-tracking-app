import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

function AddNew(props){

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);


    function submitProject(e) {
        e.preventDefault();
        client.post(
          "/project/",
          {
            name: name,
            description: desc,
            username:props.username
          }
        )
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
})
      }

      return (
        <div>
             <button onClick={() => setIsFormVisible(!isFormVisible)}>Add Project</button>
             {isFormVisible && (
                <form onSubmit={submitProject}>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value) } required/>
                    <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} required/>
                    <button type="submit">ADD</button>
                </form>
                )}

        <div>
              <h2>List of Items:</h2>
              <ul>
                {props.projectlist.map((item, index) => (
                  <li key={index}>
                    {/* Create a link for each item */}
                    <Link to={`/tickets`}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

        </div>
       



      );
}

export default AddNew;