import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert';

class Navigation_Login extends Component
{

    render(){
        
        return (

<nav className="navbar navbar-expand-sm navbar-dark fixed-top">
  <div className="container-fluid d-flex justify-content-end">

    <ul className="navbar-nav">
        <li className="nav-item">
          <Link to={`/`} className="nav-link active">Home</Link>
        </li>
      </ul>
  </div>
</nav>
        );
    }
}

export default Navigation_Login;