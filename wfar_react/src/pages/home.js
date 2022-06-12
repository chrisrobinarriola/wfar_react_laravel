import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert';

class Home extends Component
{

    render(){
        
        return (
            <div className="container d-flex justify-content-center">
                <div className="row w-50">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="text-center">Welcome Admin!</h4>
                            </div>
                            
                            <div className="d-flex align-items-start card-body">
                                <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Semesters</button>
                                    <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Users</button>
                                </div>
                                <div className="tab-content w-100 border pb-4" id="v-pills-tabContent">
                                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        <h5 className="text-center mt-4 mb-4">Manage Semesters</h5>
                                        <p className="text-center mt-4 mb-4">You can manage the semesters, view the weeks and WFARs submitted by the faculty.</p>
                                        <div className="d-flex justify-content-center">
                                            <Link to={`/semester`} className="btn btn-dark btn-sm w-50">MANAGE SEMESTERS</Link>
                                        </div>
                                    </div>
                                    
                                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                        <h5 className="text-center mt-4 mb-4">Manage Users</h5>
                                        <p className="text-center mt-4 mb-4">You can add new users and edit current existing users.</p>
                                        <div className="d-flex justify-content-center">
                                            <Link to={`/users`} className="btn btn-dark btn-sm w-50">MANAGE USERS</Link>
                                        </div>
                                        <h5 className="text-center mt-4 mb-4">Accept New Incoming Users</h5>
                                        <p className="text-center mt-4 mb-4">You can accept new incoming requests.</p>
                                        <div className="d-flex justify-content-center">
                                            <Link to={`/users-request`} className="btn btn-dark btn-sm w-50">VIEW NEW REQUESTS</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;