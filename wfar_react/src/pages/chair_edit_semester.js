import axios from 'axios';
import React, {Component} from 'react';
import {Link, useParams} from 'react-router-dom';

import swal from 'sweetalert';

import {CSVLink} from 'react-csv';

const withParams = (Component) => {
    return props => <Component {...props} params={useParams()} />;
}

class Chair_Edit_Semester extends Component
{
    state = {
        name: '',
        weeks: [],
        faculty: [],
        reports: [],
        loading: true
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async componentDidMount(){
        const id = this.props.params.id;

        const res = await axios.get(`http://127.0.0.1:8000/api/edit-semester/${id}`);

        if(res.data.status === 200){
            this.setState({
                name: res.data.semester.name,
                weeks: res.data.weeks,
                faculty: res.data.faculty,
                reports: res.data.reports,
                loading: false
            });
        } else if(res.data.status === 404){
            swal({
                title: "SEMESTER ID NOT FOUND",
                text: res.data.message,
                icon: "error",
                button: "OK",   
            });
        }
    }

    render(){
        const headers = [
            { label: "Week", key: "week" },
            { label: "Faculty", key: "faculty" },
            { label: "Number of WFARs Passed", key: "counter" },
        ];

        let data = [];
        let temp = [];

        this.state.reports.map((item) => {
            temp.push({ faculty: item.added_by, counter: item.counters, week: item.name})
        });

        data = temp;
        
        const csvReport = {
            data: data,
            headers: headers,
            filename: this.state.name + '.csv'
        };

        if(this.state.weeks.length >= 0){
            var weeks_HTMLTABLE = "";
            if(this.state.loading){
                weeks_HTMLTABLE = <tr><td colSpan="7"> <h2>Loading...</h2> </td></tr>;
            } else{
                weeks_HTMLTABLE = 
                this.state.weeks.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <Link to={`/chair-edit-week/${item.id}/${this.props.params.id}`} className="btn btn-dark btn-sm">View</Link>
                            </td>
                        </tr>
                    );
                });
            }
        } else if(this.state.weeks.length == 0){
            var weeks_HTMLTABLE = "";
            if(this.state.loading){
                weeks_HTMLTABLE = <tr><td colSpan="7"> <h2>Loading...</h2> </td></tr>;
            } else{
                weeks_HTMLTABLE = 
                <tr>
                    
                </tr>
            }
        } else{
            var weeks_HTMLTABLE = "";
            if(this.state.loading){
                weeks_HTMLTABLE = <tr><td colSpan="7"> <h2>Loading...</h2> </td></tr>;
            } else{
                weeks_HTMLTABLE = 
                <tr key={this.state.weeks.id}>
                    <td>{this.state.weeks.id}</td>
                    <td>{this.state.weeks.name}</td>
                    <td>
                        <Link to={`/chair-edit-week/${this.state.weeks.id}/${this.props.params.id}`} className="btn btn-dark btn-sm">View</Link>
                    </td>
                </tr>
            }
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Viewing Semester
                                    <Link to={'/chair-semester'} className="btn btn-warning btn-sm float-end"> BACK </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.updateSemester}>
                                    <div className="form-group mb-3">
                                        <label>Semester Name</label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control" disabled/>
                                    </div>
                                </form>
                            </div>
                            <div className="card-header">
                                <h4>Weeks on this semester
                                    <Link to={'/chair-add-week/' + this.props.params.id} className="btn btn-light btn-sm float-end"> Add Week </Link>
                                    <CSVLink {...csvReport} className="btn btn-success btn-sm float-end me-2">Generate Reports</CSVLink>
                                </h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Week</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {weeks_HTMLTABLE}
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

export default withParams(Chair_Edit_Semester);