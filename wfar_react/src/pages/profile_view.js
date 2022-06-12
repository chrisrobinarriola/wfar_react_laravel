import axios from 'axios';
import React, {Component} from 'react';
import {Link, useParams} from 'react-router-dom';

import swal from 'sweetalert';

const withParams = (Component) => {
    return props => <Component {...props} params={useParams()} />;
}

class Profile_View extends Component
{
    state = {
        name: '',
        username: '',
        email: '',
        role: '',
        loading: true
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    passwordValidate = (e) => {
        let password = document.getElementById('password').value;
        let password_confirmation = document.getElementById('password_confirm').value;
        if(password === "" || password_confirmation === ""){
            document.getElementById('update_password_btn').disabled = true;
        } else{
            if(password != password_confirmation){
                document.getElementById('update_password_btn').disabled = true;
                document.getElementById('warning').style.visibility = 'visible';
            } else{
                document.getElementById('update_password_btn').disabled = false;
                document.getElementById('warning').style.visibility = 'hidden';
            }
        }
    }

    async componentDidMount(){
        document.getElementById('update_password_btn').disabled = true;
        document.getElementById('warning').style.visibility = 'hidden';
        const id = this.props.params.id;

        const res = await axios.get(`http://127.0.0.1:8000/api/edit-user/${id}`);

        if(res.data.status === 200){
            this.setState({
                name: res.data.user.name,
                username: res.data.user.username,
                email: res.data.user.email,
                role: res.data.user.role,
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

    updateUser = async (e) => {
        e.preventDefault();

        document.getElementById('updateBtn').innerText = "Updating";
        document.getElementById('updateBtn').disabled = true;
        
        const id = this.props.params.id;
        const res = await axios.put(`http://127.0.0.1:8000/api/update-profile/${id}`, this.state);
        
        if(res.data.status === 200){
            swal({
                title: "User Updated!",
                text: res.data.message,
                icon: "success",
                button: "OK",
            });

            document.getElementById('updateBtn').innerText = "Save Changes";
            document.getElementById('updateBtn').disabled = false;
        }
    }

    updatePassword = async (e) => {
        e.preventDefault();

        document.getElementById('updateBtn').innerText = "Updating";
        document.getElementById('updateBtn').disabled = true;
        
        const id = this.props.params.id;
        const res = await axios.put(`http://127.0.0.1:8000/api/update-password/${id}`, this.state);
        
        if(res.data.status === 200){
            swal({
                title: "Password Updated!",
                text: res.data.message,
                icon: "success",
                button: "OK",
            });

            document.getElementById('updateBtn').innerText = "Save Changes";
            document.getElementById('updateBtn').disabled = false;
        }
    }

    render(){
        return (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Your Profile
                                    <Link to="/logout" className="btn btn-warning float-end">Logout  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
</svg></Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.updateUser}>
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
                                        <label className="btn btn-secondary text-light" data-bs-toggle="modal" data-bs-target="#exampleModal">Change Password</label>
                                    </div>
                                    

                                    <div className="form-group mb-3">
                                        <button id="updateBtn" type="submit" className="btn btn-dark float-end">Save Changes</button>
                                    </div>

                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Change Password</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form>
                                                <div className="form-group mb-3">
                                                    <label>Password</label>
                                                    <input type="password" id="password" name="password" onChange={this.passwordValidate} className="form-control" placeholder="Password"/>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Confirm Password</label>
                                                    <input type="password" id="password_confirm" name="password_confirm" onChange={this.passwordValidate} className="form-control" placeholder="Confirm Password"/>
                                                </div>
                                                <div id="warning" class="alert alert-danger" role="alert">
                                                    <h6>Please make your passwords match!</h6>
                                                </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" id="update_password_btn" class="btn btn-dark" onClick={this.updatePassword}>Update Password</button>
                                            </div>
                                            </div>
                                        </div>
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

export default withParams(Profile_View);