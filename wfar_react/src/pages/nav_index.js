import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert';

class Navigation_Index extends Component
{

    render(){
        
        return (

<nav className="navbar navbar-expand-sm navbar-dark fixed-top">
  <div className="container-fluid d-flex justify-content-end">

    <ul className="navbar-nav">
        <li className="nav-item" style={{visibility: 'hidden'}}>
          <Link to={`/login`} className="nav-link active">Login</Link>
        </li>
      </ul>
  </div>
</nav>
        );
    }
}

export default Navigation_Index;