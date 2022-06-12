import axios from 'axios';
import React, {Component} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import swal from 'sweetalert';

function withComponent(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
}

class Register extends Component
{
    state = {
        name: '', 
        username: '',
        email: '',
        role: 'faculty',
        status: 'active',
        password: '',
        password_confirmation: '',
        error_list: []
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveUser = async (e) => {        
        e.preventDefault();
        const res = await axios.post('http://127.0.0.1:8000/api/register', this.state);
        if(res.data.status === 200){
            swal({
                title: "Sent!",
                text: res.data.message,
                icon: "success",
                button: "OK",
            });

            this.props.navigate('/');

            this.setState({
                name: '', 
                username: '',
                email: '',
                role: '',
                status: 'active',
                password: '',
                password_confirmation: ''
            })

            this.setState({
                error_list: [],
            })
        } else{
            this.setState({
                error_list: res.data.validate_err,
            })
        }
    }

    render(){
        return (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Register
                                    <Link to={'/'} className="btn btn-warning btn-sm float-end"> BACK </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.saveUser}>
                                    <div className="form-group mb-3">
                                        <label>Name</label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control" placeholder="e.g Juan Dela Cruz"/>
                                        <span className="text-danger">{this.state.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Username</label>
                                        <input type="text" name="username" onChange={this.handleInput} value={this.state.username} className="form-control" placeholder="e.g Juandc2017"/>
                                        <span className="text-danger">{this.state.error_list.username}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="text" name="email" onChange={this.handleInput} value={this.state.email} className="form-control" placeholder="e.g juandc@email.com"/>
                                        <span className="text-danger">{this.state.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Role</label>
                                        <select name="role" onChange={this.handleInput} className="form-select" value={this.state.role}>
                                            <option value="faculty">Faculty</option>
                                            <option value="chair">Department Head</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" onChange={this.handleInput} value={this.state.password} className="form-control" placeholder="Password"/>
                                        <span className="text-danger">{this.state.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Confirm Password</label>
                                        <input type="password" name="password_confirmation" onChange={this.handleInput} value={this.state.password_confirmation} className="form-control" placeholder="Confirm Password"/>
                                        <span className="text-danger">{this.state.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-dark float-end">Save</button>
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

export default withComponent(Register);