import axios from 'axios';
import React, {Component} from 'react';
import {Link, useParams} from 'react-router-dom';

import swal from 'sweetalert';

const withParams = (Component) => {
    return props => <Component {...props} params={useParams()} />;
}


class Chair_Add_Week extends Component
{
    state = {
        name: '',
        semester_id: this.props.params.id,
        added_by: localStorage.getItem('id'),
        error_list: []
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveWeek = async (e) => {  
        e.preventDefault();

        const id = this.props.params.id;
        const res = await axios.post(`http://127.0.0.1:8000/api/add-week/${id}`, this.state);

        if(res.data.status === 200){
            swal({
                title: "Week Added!",
                text: res.data.message,
                icon: "success",
                button: "OK",
            });

            //this.props.navigate('/semester');

            this.setState({
                name: '',
                semester_id: this.props.params.id,
                added_by: localStorage.getItem('id')
            })

            this.setState({
                error_list: [],
            })
        } else{
            console.log('what is happening')
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
                                <h4>Add Week
                                    <Link to={'/chair-edit-semester/'+ this.props.params.id} className="btn btn-warning btn-sm float-end"> BACK </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.saveWeek}>
                                    <div className="form-group mb-3">
                                        <label>Week Name</label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control" placeholder="Week 1 [May 20, 2022]"/>
                                        <span className="text-danger">{this.state.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-dark">Add Week</button>
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

export default withParams(Chair_Add_Week);