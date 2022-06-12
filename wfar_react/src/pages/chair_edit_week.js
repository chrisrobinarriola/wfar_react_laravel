import axios from 'axios';
import React, {Component} from 'react';
import {Link, useParams} from 'react-router-dom';

import swal from 'sweetalert';

const withParams = (Component) => {
    return props => <Component {...props} params={useParams()} />;
}

class Edit_Week extends Component
{
    state = {
        name: '',
        added_by: '',
        wfars: [],
        loading: true
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async componentDidMount(){
        const id = this.props.params.id;

        const res = await axios.get(`http://127.0.0.1:8000/api/edit-week/${id}`);

        if(res.data.status === 200){
            this.setState({
                name: res.data.week.name,
                added_by: res.data.added_by,
                wfars: res.data.wfars,
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

    updateWeek = async (e) => {
        e.preventDefault();

        document.getElementById('updateBtn').innerText = "Updating";
        document.getElementById('updateBtn').disabled = true;
        
        const id = this.props.params.id;
        const res = await axios.put(`http://127.0.0.1:8000/api/update-week/${id}`, this.state);
        
        if(res.data.status === 200){
            swal({
                title: "Week Updated!",
                text: res.data.message,
                icon: "success",
                button: "OK",
            });

            document.getElementById('updateBtn').innerText = "Save Changes";
            document.getElementById('updateBtn').disabled = false;
        }
    }

    render(){
        if(this.state.wfars.length >= 0){
            var wfars_HTMLTABLE = "";
            if(this.state.loading){
                wfars_HTMLTABLE = <tr><td colSpan="7"> <h2>Loading...</h2> </td></tr>;
            } else{
                wfars_HTMLTABLE = 
                this.state.wfars.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.subject}</td>
                            <td>
                                <Link to={`/chair-edit-wfar/${item.id}/${this.props.params.id}`} className="btn btn-dark btn-sm">View</Link>
                            </td>
                        </tr>
                    );
                });
            }
        } else if(this.state.wfars.length == 0){
            var wfars_HTMLTABLE = "";
            if(this.state.loading){
                wfars_HTMLTABLE = <tr><td colSpan="7"> <h2>Loading...</h2> </td></tr>;
            } else{
                wfars_HTMLTABLE = 
                <tr>
                    
                </tr>
            }
        } else{
            var wfars_HTMLTABLE = "";
            if(this.state.loading){
                wfars_HTMLTABLE = <tr><td colSpan="7"> <h2>Loading...</h2> </td></tr>;
            } else{
                wfars_HTMLTABLE = 
                <tr key={this.state.wfars.id}>
                    <td>{this.state.wfars.id}</td>
                    <td>{this.state.wfars.subject}</td>
                    <td>
                        <Link to={`/edit-wfar/${this.state.wfars.id}`} className="btn btn-dark btn-sm">View</Link>
                    </td>
                </tr>
            }
        }

        let weekName = '';
        let updateBtn = "";
        
        if(this.state.added_by === localStorage.getItem('name')){
            weekName = <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control"/>
            updateBtn = <div className="form-group mb-3">
                            <button id="updateBtn" type="submit" className="btn btn-dark">Save Changes</button>
                        </div>
        } else {
            weekName = <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control" disabled/>
            //document.getElementById('updateBtn').style.display = 'none';
            updateBtn = "";
        }
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Week
                                    <Link to={'/chair-edit-semester/' + this.props.params.semester_id} className="btn btn-warning btn-sm float-end"> BACK </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.updateWeek}>
                                    <div className="form-group mb-3">
                                        <label>Week Name</label>
                                        
                                        {weekName}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Added by</label>
                                        <input type="text" name="added_by" onChange={this.handleInput} value={this.state.added_by} className="form-control" disabled/>
                                    </div>
                                    {updateBtn}
                                </form>
                            </div>
                            <div className="card-header">
                                <h4>WFARs on this week
                                    <Link to={'/chair-wfars/'} className="btn btn-light btn-sm float-end"> Add WFAR </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>WFARs</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wfars_HTMLTABLE}
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

export default withParams(Edit_Week);