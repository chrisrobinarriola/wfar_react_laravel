import axios from 'axios';
import React, {Component} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';

import swal from 'sweetalert';

//const params = useParams();

const withParams = (Component) => {
    return props => <Component {...props} params={useParams()} />;
}

class Editstudent extends Component
{
    state = {
        name: '', 
        course: '',
        email: '',
        phone: ''
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async componentDidMount(){
        const stud_id = this.props.params.id;
        //const {stud_id} = this.params.id;

        const res = await axios.get(`http://127.0.0.1:8000/api/edit-student/${stud_id}`);
        
        if(res.data.status === 200){
            this.setState({
                name: res.data.student.name, 
                course: res.data.student.course,
                email: res.data.student.email,
                phone: res.data.student.phone
            });
        } else if(res.data.status === 404){
            swal({
                title: "STUDENT ID NOT FOUND",
                text: res.data.message,
                icon: "error",
                button: "OK",   
            });
            //const navigate = useNavigate();
            this.props.navigation('/admin-landing');
        }
    }

    updateStudent = async (e) => {
        e.preventDefault();

        document.getElementById('updateBtn').innerText = "Updating";
        document.getElementById('updateBtn').disabled = true;
        
        const stud_id = this.props.params.id;
        const res = await axios.put(`http://127.0.0.1:8000/api/update-student/${stud_id}`, this.state);
        
        if(res.data.status === 200){
            //console.log(res.data.message)
            swal({
                title: "Student Updated!",
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
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Student
                                    <Link to={'/admin-landing'} className="btn btn-primary btn-sm float-end"> BACK </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.updateStudent}>
                                    <div className="form-group mb-3">
                                        <label>Student Name</label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Course</label>
                                        <input type="text" name="course" onChange={this.handleInput} value={this.state.course} className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Email</label>
                                        <input type="text" name="email" onChange={this.handleInput} value={this.state.email} className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Phone</label>
                                        <input type="text" name="phone" onChange={this.handleInput} value={this.state.phone} className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button id="updateBtn" type="submit" className="btn btn-primary">Save Changes</button>
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

export default withParams(Editstudent);