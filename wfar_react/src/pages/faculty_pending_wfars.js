import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert';

let user = localStorage.getItem('username');

class Faculty_Pending_WFARS extends Component
{

    state = {
        wfars: [],
        loading: true,
    }

    async componentDidMount(){
        const res = await axios.get('http://127.0.0.1:8000/api/faculty-pending-wfars/' + user);
        
        if(res.data.status === 200){
            this.setState({
                wfars: res.data.wfars,
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
                        <td>
                            <Link to={`/faculty-edit-wfar/${item.id}`} className="btn btn-dark btn-sm">Edit</Link>
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
                                <h4>Your WFARs</h4>
                            </div>
                            <div className="card-body">
                            <h6 className="d-flex justify-content-center">These are your submitted "for checking" WFARS</h6>
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Subject</th>
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

export default Faculty_Pending_WFARS;