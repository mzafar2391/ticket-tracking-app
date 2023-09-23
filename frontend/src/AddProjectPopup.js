import axios from 'axios'
import { useState } from 'react';
import './App.css';

function AddProjectPopup(props) {



  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Add Project</h2>
        {/* Add form or content for adding a project */}
        <button onClick={props.close}>Close</button>
      </div>
    </div>
  );
};



export default AddProjectPopup;