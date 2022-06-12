import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert';

class Chair_Landing extends Component
{
    render(){        
        return (
            <div className="container d-flex justify-content-center">
                <div className="row w-50">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="text-center">Welcome Chair!</h4>
                            </div>
                            
                            <div className="d-flex align-items-start card-body">
                                <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Semesters</button>
                                    <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">WFARs</button>
                                </div>
                                <div className="tab-content w-100 border pb-4" id="v-pills-tabContent">
                                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        <h5 className="text-center mt-4 mb-4">View Semesters</h5>
                                        <p className="text-center mt-4 mb-4">You can view the existing semesters, weeks, and WFARs</p>
                                        <div className="d-flex justify-content-center">
                                            <Link to={`/chair-semester`} className="btn btn-dark btn-sm w-50">VIEW SEMESTERS</Link>
                                        </div>
                                    </div>
                                    
                                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                        <h5 className="text-center mt-4 mb-4">Manage new WFARs</h5>
                                        <p className="text-center mt-4 mb-4">You can manage the new submitted WFARs here. The new WFARs must be approved first to become viewable to the official list of WFARs</p>
                                        <div className="d-flex justify-content-center">
                                            <Link to={`/chair-wfars`} className="btn btn-dark btn-sm w-50">VIEW SUBMITTED WFARs</Link>
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

export default Chair_Landing;