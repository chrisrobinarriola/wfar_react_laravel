import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert';

class Chair_Semester extends Component
{

    state = {
        wfars: [],
        chair: localStorage.getItem('id'),
        loading: true,
    }

    async componentDidMount(){
        const res = await axios.post('http://127.0.0.1:8000/api/new-wfar', this.state);
        
        if(res.data.status === 200){
            this.setState({
                wfars: res.data.wfars,
                chair: localStorage.getItem('id'),
                loading: false,
            });
        }
    }

    render(){
        var wfars_HTMLTABLE = "";
        if(this.state.loading){
            wfars_HTMLTABLE = <tr><td colSpan="7"> <h2>Loading...</h2> </td></tr>;
        } else{
            wfars_HTMLTABLE = 
            this.state.wfars.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.subject}</td>
                        <td>{item.date_of_class}</td>
                        <td>
                            <Link to={`/chair-submitted-wfar/${item.id}`} className="btn btn-dark btn-sm">View</Link>
                        </td>
                    </tr>
                );
            });
        }
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>WFARs</h4>
                            </div>
                            <div className="card-body">
                            <h6 className="d-flex justify-content-center">View Semesters and Manage the Weeks</h6>
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Subject</th>
                                            <th>Date of Class</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wfars_HTMLTABLE}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chair_Semester;