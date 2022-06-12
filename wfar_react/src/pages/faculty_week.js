import axios from 'axios';
import React, {Component} from 'react';
import {Link, useParams} from 'react-router-dom';

import swal from 'sweetalert';

const withParams = (Component) => {
    return props => <Component {...props} params={useParams()} />;
}

class Faculty_Week extends Component
{
    state = {
        faculty: localStorage.getItem('id'),
        weeks: [],
        loading: true
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async componentDidMount(){
        //const id = this.props.params.id;

        const res = await axios.post(`http://127.0.0.1:8000/api/faculty-week/`, this.state);

        if(res.data.status === 200){
            this.setState({
                faculty: localStorage.getItem('id'),
                weeks: res.data.weeks,
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
                                <Link to={`/faculty-add-wfar/${item.id}`} className="btn btn-dark btn-sm">Add WFAR</Link>
                            </td>
                        </tr>
                    );
                });
            }
        } else if(this.state.weeks.length === 0){
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
                        <Link to={`/faculty-add-wfar/${this.state.weeks.id}`} className="btn btn-success btn-sm">Add WFAR</Link>
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
                                <h4>Available Weeks
                                    <Link to={'/faculty-landing/'} className="btn btn-warning btn-sm float-end"> Back </Link>
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

export default withParams(Faculty_Week);