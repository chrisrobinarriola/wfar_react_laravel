import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert';

class Users_Request extends Component
{

    state = {
        users: [],
        loading: true,
    }

    async componentDidMount(){
        const res = await axios.get('http://127.0.0.1:8000/api/users-request');
        
        if(res.data.status === 200){
            this.setState({
                users: res.data.users,
                loading: false,
            });
        }
    }

    render(){
        var student_HTMLTABLE = "";
        if(this.state.loading){
            student_HTMLTABLE = <tr><td colSpan="7"> <h2>Loading...</h2> </td></tr>;
        } else{
            student_HTMLTABLE = 
            this.state.users.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>
                            <Link to={`/edit-user-request/${item.id}`} className="btn btn-dark btn-sm">View</Link>
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
                                <h4>Account Requests</h4>
                            </div>
                            <div className="card-body">
                            <h6 className="d-flex justify-content-center">View and manage Account requests</h6>
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student_HTMLTABLE}
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

export default Users_Request;