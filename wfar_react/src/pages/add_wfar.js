import axios from 'axios';
import React, {Component} from 'react';
import {Link, useParams} from 'react-router-dom';

import swal from 'sweetalert';

const withParams = (Component) => {
    return props => <Component {...props} params={useParams()} />;
}

class Add_WFAR extends Component
{
    state = {
        subject: '',
        week_number: this.props.params.id,
        date_of_class: '',
        course_year_section: '',
        number_of_attendees: '',
        meeting_link: '',
        learning_activities: '',
        other_details: '',
        attachment_1: '',
        added_by: localStorage.getItem('name'),
        error_list: [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleInputChangeFile1 = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (event) => {
            this.setState({
                attachment_1: event.target.result,
              })
        }
    }

    saveWFAR = async (e) => {  
        e.preventDefault();

        const id = this.props.params.id;
        const res = await axios.post(`http://127.0.0.1:8000/api/add-wfar/${id}`, this.state);

        if(res.data.status === 200){
            swal({
                title: "WFAR Added!",
                text: res.data.message,
                icon: "success",
                button: "OK",
            });

            this.setState({
                subject: '',
                week_number: this.props.params.id,
                date_of_class: '',
                course_year_section: '',
                number_of_attendees: '',
                meeting_link: '',
                learning_activities: '',
                other_details: '',
                attachment_1: '',
                added_by: localStorage.getItem('name'),
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
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add WFAR
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.saveWFAR}>
                                    <div className="form-group mb-3">
                                        <label>WFAR subject</label>
                                        <input type="text" name="subject" onChange={this.handleInput} value={this.state.subject} className="form-control" placeholder="e.g History"/>
                                        <span className="text-danger">{this.state.error_list.subject}</span>                                        
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Date of Class</label>
                                        <input type="text" name="date_of_class" onChange={this.handleInput} value={this.state.date_of_class} className="form-control" placeholder="e.g 10/10/2022"/>
                                        <span className="text-danger">{this.state.error_list.date_of_class}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Course Year and Section</label>
                                        <input type="text" name="course_year_section" onChange={this.handleInput} value={this.state.course_year_section} className="form-control" placeholder="e.g 1ITA"/>
                                        <span className="text-danger">{this.state.error_list.course_year_section}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Number of Attendees</label>
                                        <input type="text" name="number_of_attendees" onChange={this.handleInput} value={this.state.number_of_attendees} className="form-control" placeholder="0"/>
                                        <span className="text-danger">{this.state.error_list.number_of_attendees}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Meeting Link</label>
                                        <input type="text" name="meeting_link" onChange={this.handleInput} value={this.state.meeting_link} className="form-control" placeholder="Meeting Link"/>
                                        <span className="text-danger">{this.state.error_list.meeting_link}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Learning Activities</label>
                                        <input type="text" name="learning_activities" onChange={this.handleInput} value={this.state.learning_activities} className="form-control" placeholder="Learning Activities"/>
                                        <span className="text-danger">{this.state.error_list.learning_activities}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Other Details</label>
                                        <input type="text" name="other_details" onChange={this.handleInput} value={this.state.other_details} className="form-control" placeholder="Other Details"/>
                                        <span className="text-danger">{this.state.error_list.other_details}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Meeting Screenshot (.jpg only)</label>
                                        <input type="file" name="attachment_1" onChange={this.handleInputChangeFile1} className="form-control" accept=".jpg"/>    
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-dark float-end">Add WFAR</button>
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

export default withParams(Add_WFAR);