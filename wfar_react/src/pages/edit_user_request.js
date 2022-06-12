import axios from 'axios';
import React, {Component} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';

import swal from 'sweetalert';

const withParams = (Component) => {
    return props => <><Component {...props} params={useParams()} navigate={useNavigate()} /></>;
}

class Edit_User_Request extends Component
{
    state = {
        name: '',
        username: '',
        email: '',
        role: '',
        assigned_to: '',
        status: 'for checking',
        chairs: [],
        loading: true
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async componentDidMount(){
        const id = this.props.params.id;

        const res = await axios.get(`http://127.0.0.1:8000/api/edit-user/${id}`);

        if(res.data.status === 200){
            this.setState({
                name: res.data.user.name,
                username: res.data.user.username,
                email: res.data.user.email,
                role: res.data.user.role,
                assigned_to: res.data.user.assigned_to,
                chairs: res.data.chairs,
                loading: false
            });
        } else if(res.data.status === 404){
            swal({
                title: "USER ID NOT FOUND",
                text: res.data.message,
                icon: "error",
                button: "OK",   
            });
        }
    }

    approve = async (e) => {
        e.preventDefault();
        
        this.setState({
            status: 'active'
        });

        const id = this.props.params.id;
        const res = await axios.post(`http://127.0.0.1:8000/api/approve-registration/${id}`, this.state);
        
        if(res.data.status === 200){
            this.props.navigate('/users-request');
            swal({
                title: "User Accepted!",
                text: res.data.message,
                icon: "success",
                button: "OK",
            });
        }
    }

    reject = async (e) => {
        e.preventDefault();

        this.setState({
            status: 'rejected'
        });

        const id = this.props.params.id;
        const res = await axios.post(`http://127.0.0.1:8000/api/reject-registration/${id}`, this.state);
        
        if(res.data.status === 200){
            this.props.navigate('/users-request');
            swal({
                title: "User Rejected!",
                text: res.data.message,
                icon: "success",
                button: "OK",
            });
        }
    }


    render(){
        let assigned_to = '';

        let options = '';

        options = this.state.chairs.map((item) => {
            return (
                <option value={item.id}>{item.name}</option>
            );
        });

        if(this.state.role === 'faculty'){
            assigned_to = 
            <div className="form-group mb-3">
                <label>Assign to</label>
                <select name="assigned_to" onChange={this.handleInput} className="form-select" value={this.state.assigned_to}>
                    {options}
                </select>
            </div>
        } else{
            assigned_to = '';
        }

        return (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit User</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group mb-3">
                                        <label>Name</label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Username</label>
                                        <input type="text" name="username" onChange={this.handleInput} value={this.state.username} className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="text" name="email" onChange={this.handleInput} value={this.state.email} className="form-control"/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Role</label>
                                        <select name="role" onChange={this.handleInput} className="form-select" value={this.state.role}>
                                            <option value="faculty">Faculty</option>
                                            <option value="chair">Department Head</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>

                                    {assigned_to}

                                    <div className="form-group mb-3 float-end">
                                        <button onClick={this.reject} className="btn btn-danger m-2">REJECT</button>
                                        <button onClick={this.approve} className="btn btn-success m-2">APPROVE</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(Edit_User_Request);