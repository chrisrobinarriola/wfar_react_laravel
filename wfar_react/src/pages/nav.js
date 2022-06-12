import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert';

class Navigation_Bar extends Component
{

    render(){

      let link = "";

      if(localStorage.getItem('role') === 'admin'){
        link = <Link to={`/admin-landing`} className="nav-link active">Home</Link>;
      } else if(localStorage.getItem('role') === 'chair'){
        link = <Link to={`/chair-landing`} className="nav-link active">Home</Link>;
      } else if(localStorage.getItem('role') === 'faculty'){
        link = <Link to={`/faculty-landing`} className="nav-link active">Home</Link>;
      }
        
        return (

<nav className="navbar navbar-expand-sm navbar-dark fixed-top">
  <div className="container-fluid d-flex ">

    <ul className="navbar-nav">
        <li className="nav-item">
          {link}
        </li>
      </ul>
  </div>

  <div className="container-fluid d-flex justify-content-end">

    <ul className="navbar-nav">
        <li className="nav-item">
          <Link to={`/profile/${localStorage.getItem('id')}`} className="nav-link active">{localStorage.getItem('username')}</Link>
        </li>
      </ul>
  </div>
</nav>
        );
    }
}

export default Navigation_Bar;