import axios from 'axios';
import React, {Component} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import swal from 'sweetalert';

function withComponent(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
}

class Login extends Component
{
    state = {
        name: '',
        error_list: ''
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    login = async (e) => {        
        if(this.state.username == "Admin" || this.state.username == "admin"){
            this.props.navigate('/admin-landing');
        } else if(this.state.username == "Chair" || this.state.username == "chair"){
            this.props.navigate('/chair-landing');
        } else if(this.state.username == "Faculty" || this.state.username == "faculty"){
            this.props.navigate('/faculty-landing');
        } else{
            this.setState({
                error_list: "Your credentials doesn't match a record in our database."
            })
        }
    }

    loginPost = async (e) => {        
        e.preventDefault();
        const res = await axios.post('http://127.0.0.1:8000/api/login_post', this.state);
        if(res.data.status === 200){
            if(res.data.role == "admin"){
                this.props.navigate('/admin-landing');
            } else if(res.data.role == "chair"){
                this.props.navigate('/chair-landing');
            } else if(res.data.role == "faculty"){
                this.props.navigate('/faculty-landing');
            } else{
                this.setState({
                    error_list: "Your credentials doesn't match a record in our database."
                })
            }
            swal({
                title: "Welcome!",
                text: res.data.message,
                icon: "success",
                button: "OK",
            });
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('name', res.data.name);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('id', res.data.id);
            localStorage.setItem('token', res.data.token);
        } else{
            swal({
                title: "User not found!",
                text: res.data.message,
                icon: "error",
                button: "OK",
            });
        }
    }

    render(){
        return (
            <div className="container d-flex justify-content-center">
                <div className="row w-25">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header d-flex justify-content-center">
                                <h4>WFAR Login</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.loginPost}>
                                    <div className="form-group mb-3">
                                        <input type="text" name="username" onChange={this.handleInput} value={this.state.username} className="form-control" placeholder="Username"/>
                                    </div>

                                    <div className="form-group mb-3">                                        
                                        <input type="password" name="password" onChange={this.handleInput} value={this.state.password} className="form-control" placeholder="Password"/>
                                        <span className="text-danger">{this.state.error_list}</span>
                                    </div>
                                    
                                    <div className="form-group mb-3">
                                        {/* <label className="btn btn-dark w-100" onClick={this.login}>LOGIN</label> */}
                                        <input type="submit" className="btn btn-dark w-100" value="LOGIN"/>
                                    </div>
                                    <div className="form-group mb-3 d-flex justify-content-center">
                                        <Link to='/register'>Don't have an account yet?</Link>
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

export default withComponent(Login);