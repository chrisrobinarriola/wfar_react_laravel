import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Student from './pages/Student';
import Addstudent from './pages/Addstudent';
import Editstudent from './pages/Editstudent';

import Users from './pages/users';
import Users_Request from './pages/users_request';
import Add_User from './pages/add_user';
import Edit_User from './pages/edit_user';
import Edit_User_Request from './pages/edit_user_request';

import Home from './pages/home';
import Semester from './pages/semester';
import Add_Semester from './pages/add_semester';
import Edit_Semester from './pages/edit_semester';

import Add_Week from './pages/add_week';
import Edit_Week from './pages/edit_week';

import Add_WFAR from './pages/add_wfar';
import Edit_WFAR from './pages/edit_wfar';

import Index from './pages/index';
import Login from './pages/login';
import Profile_View from './pages/profile_view';
import Register from './pages/register';
import Navigation_Bar from './pages/nav';
import Navigation_Index from './pages/nav_index';
import Navigation_Login from './pages/nav_login';
import Spacing from './pages/spacing';

import Faculty_Landing from './pages/faculty_landing';
import Faculty_Week from './pages/faculty_week';
import Faculty_Add_WFAR from './pages/faculty_add_wfar';
import Faculty_Pending_WFARS from './pages/faculty_pending_wfars';
import Faculty_Edit_WFAR from './pages/faculty_edit_wfar';


import Chair_Landing from './pages/chair_landing';
import Chair_Semester from './pages/chair_semester';
import Chair_Edit_Semester from './pages/chair_edit_semester';
import Chair_Add_Week from './pages/chair_add_week';
import Chair_Edit_Week from './pages/chair_edit_week';
import Chair_WFAR from './pages/chair_wfars';
import Chair_Submitted_WFAR from './pages/chair_submitted_wfar';
import Chair_Edit_WFAR from './pages/chair_edit_wfar';

import NotFound from './pages/NotFound'

import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/api/";

function Logout(){
  localStorage.clear();
}

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<><Navigation_Index /><Index/></>} />
        <Route exact path="/login" element={<><Navigation_Login /><Spacing /><Login/></>} />
        <Route exact path="/register" element={<><Navigation_Login /><Spacing /><Register/></>} />
        <Route path="/student" element={<Student/>} />
        <Route path="/add-student" element={<Addstudent/>} />
        <Route path="/edit-student/:id" element={<Editstudent/>} />

        <Route path="/profile/:id" element={<><Navigation_Bar /><Spacing /><Profile_View/></>} />

        <Route path="/admin-landing" element={<><Navigation_Bar /><Spacing /><Home/></>} />
        <Route path="/semester" element={<><Navigation_Bar /><Spacing /><Semester/></>} />
        <Route path="/add-semester" element={<><Navigation_Bar /><Spacing /><Add_Semester/></>} />
        <Route path="/edit-semester/:id" element={<><Navigation_Bar /><Spacing /><Edit_Semester/></>} />

        <Route path="/add-week/:id" element={<><Navigation_Bar /><Spacing /><Add_Week/></>} />
        <Route path="/edit-week/:id/:semester_id" element={<><Navigation_Bar /><Spacing /><Edit_Week/></>} />

        <Route path="/add-wfar/:id" element={<><Navigation_Bar /><Spacing /><Add_WFAR/></>} />
        <Route path="/edit-wfar/:id/:week_number" element={<><Navigation_Bar /><Spacing /><Edit_WFAR/></>} />

        <Route path="/faculty-landing" element={<><Navigation_Bar /><Spacing /><Faculty_Landing/></>} />
        <Route path="/faculty-week" element={<><Navigation_Bar /><Spacing /><Faculty_Week/></>} />
        <Route path="/faculty-add-wfar/:id" element={<><Navigation_Bar /><Spacing /><Faculty_Add_WFAR/></>} />
        <Route path="/faculty-pending-wfars/:id" element={<><Navigation_Bar /><Spacing /><Faculty_Pending_WFARS/></>} />
        <Route path="/faculty-edit-wfar/:id" element={<><Navigation_Bar /><Spacing /><Faculty_Edit_WFAR/></>} />

        <Route path="/chair-landing" element={<><Navigation_Bar /><Spacing /><Chair_Landing/></>} />
        <Route path="/chair-semester" element={<><Navigation_Bar /><Spacing /><Chair_Semester/></>} />
        <Route path="/chair-edit-semester/:id" element={<><Navigation_Bar /><Spacing /><Chair_Edit_Semester/></>} />
        <Route path="/chair-add-week/:id" element={<><Navigation_Bar /><Spacing /><Chair_Add_Week/></>} />
        <Route path="/chair-edit-week/:id/:semester_id" element={<><Navigation_Bar /><Spacing /><Chair_Edit_Week/></>} />
        <Route path="/chair-wfars" element={<><Navigation_Bar /><Spacing /><Chair_WFAR/></>} />
        <Route path="/chair-edit-wfar/:id/:week_number" element={<><Navigation_Bar /><Spacing /><Chair_Edit_WFAR/></>} />
        <Route path="/chair-submitted-wfar/:id/" element={<><Navigation_Bar /><Spacing /><Chair_Submitted_WFAR/></>} />

        <Route path="/users" element={<><Navigation_Bar /><Spacing /><Users/></>} />
        <Route path="/users-request" element={<><Navigation_Bar /><Spacing /><Users_Request/></>} />
        <Route path="/add-user" element={<><Navigation_Bar /><Spacing /><Add_User/></>} />
        <Route path="/edit-user/:id" element={<><Navigation_Bar /><Spacing /><Edit_User/></>} />
        <Route path="/edit-user-request/:id" element={<><Navigation_Bar /><Spacing /><Edit_User_Request/></>} />

        <Route path="/logout" element={<><Navigate to="/" replace /><Logout/></>} />

        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
