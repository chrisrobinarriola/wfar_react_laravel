import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert';

class Semester extends Component
{

    state = {
        semesters: [],
        loading: true,
    }

    async componentDidMount(){
        const res = await axios.get('http://127.0.0.1:8000/api/semester');
        
        if(res.data.status === 200){
            this.setState({
                semesters: res.data.semesters,
                loading: false,
            });
        }
    }

    deleteStudent = async (e, id) => {

        const delete_button = e.currentTarget;
        delete_button.innerText = "Deleting";

        const res = await axios.delete(`http://127.0.0.1:8000/api/delete-student/${id}`);

        if(res.data.status === 200){
            this.componentDidMount();

            swal({
                title: "Student Deleted!",
                text: res.data.message,
                icon: "success",
                button: "OK",
            });
        }
    }

    render(){
        var semesters_HTMLTABLE = "";
        if(this.state.loading){
            semesters_HTMLTABLE = <tr><td colSpan="7"> <h2>Loading...</h2> </td></tr>;
        } else{
            semesters_HTMLTABLE = 
            this.state.semesters.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                            <Link to={`/edit-semester/${item.id}`} className="btn btn-dark btn-sm">View</Link>
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
                                <h4>Semesters
                                    <Link to={'/add-semester'} className="btn btn-light btn-sm float-end"> Add Semester </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <h6 className="d-flex justify-content-center">View Semesters and Manage the Weeks</h6>
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Semester</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {semesters_HTMLTABLE}
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

export default Semester;