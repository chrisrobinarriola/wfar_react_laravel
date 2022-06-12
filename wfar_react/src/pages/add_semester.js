import axios from 'axios';
import React, {Component} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import swal from 'sweetalert';

function withComponent(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
}

class Add_Semester extends Component
{
    state = {
        name: '',
        error_list: []
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveSemester = async (e) => {        
        e.preventDefault();
        const res = await axios.post('http://127.0.0.1:8000/api/add-semester', this.state);
        if(res.data.status === 200){
            swal({
                title: "Semester Added!",
                text: res.data.message,
                icon: "success",
                button: "OK",
            });

            this.props.navigate('/semester');

            this.setState({
                name: ''
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
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Semester
                                    <Link to={'/admin-landing'} className="btn btn-warning btn-sm float-end"> BACK </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.saveSemester}>
                                    <div className="form-group mb-3">
                                        <label>Semester Name</label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control" placeholder="A.Y 2021-2022"/>
                                        <span className="text-danger">{this.state.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-dark float-end">Add Semester</button>
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

export default withComponent(Add_Semester);