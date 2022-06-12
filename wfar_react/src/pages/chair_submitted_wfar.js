import axios from 'axios';
import React, {Component} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';

import swal from 'sweetalert';

const withParams = (Component) => {
    return props => <><Component {...props} params={useParams()} navigate={useNavigate()} /></>;
}

class Chair_Submitted_WFAR extends Component
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
        added_by: '',
        loading: true
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async componentDidMount(){
        const id = this.props.params.id;

        const res = await axios.get(`http://127.0.0.1:8000/api/edit-wfar/${id}`);

        if(res.data.status === 200){
            this.setState({
                subject: res.data.wfar.subject,
                date_of_class: res.data.wfar.date_of_class,
                course_year_section: res.data.wfar.course_year_section,
                number_of_attendees: res.data.wfar.number_of_attendees,
                meeting_link: res.data.wfar.meeting_link,
                learning_activities: res.data.wfar.learning_activities,
                other_details: res.data.wfar.other_details,
                attachment_1: res.data.wfar.attachment_1,
                added_by: res.data.wfar.added_by,
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

    approve = async (e) => {
        e.preventDefault();
        const id = this.props.params.id;
        const res = await axios.post(`http://127.0.0.1:8000/api/approve-wfar/${id}`);
        if(res.data.status === 200){
            swal({
                title: "WFAR Approved!",
                text: res.data.message,
                icon: "success",
                button: "OK",
            });

            this.props.navigate('/chair-wfars');

        } else{
            swal({
                title: "ERROR! Please try again later!",
                text: res.data.message,
                icon: "error",
                button: "OK",
            });
        }
    }

    reject = async (e) => {
        e.preventDefault();
        const id = this.props.params.id;
        const res = await axios.post(`http://127.0.0.1:8000/api/reject-wfar/${id}`);
        if(res.data.status === 200){
            swal({
                title: "WFAR Rejected!",
                text: res.data.message,
                icon: "success",
                button: "OK",
            });

            this.props.navigate('/chair-wfars');

        } else{
            swal({
                title: "ERROR! Please try again later!",
                text: res.data.message,
                icon: "error",
                button: "OK",
            });
        }
    }

    render(){
        var wfar_image = "";
        if(this.state.loading){
            wfar_image = <h2>Loading...</h2>;
        } else{
            wfar_image = this.state.attachment_1
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit WFAR</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group mb-3">
                                        <label>Subject</label>
                                        <input type="text" name="subject" onChange={this.handleInput} value={this.state.subject} className="form-control" disabled/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Date of Class</label>
                                        <input type="text" name="date_of_class" onChange={this.handleInput} value={this.state.date_of_class} className="form-control" disabled/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Course Year and Section</label>
                                        <input type="text" name="course_year_section" onChange={this.handleInput} value={this.state.course_year_section} className="form-control" placeholder="WFAR 1 [May 20, 2022]" disabled/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Number of Attendees</label>
                                        <input type="text" name="number_of_attendees" onChange={this.handleInput} value={this.state.number_of_attendees} className="form-control" placeholder="WFAR 1 [May 20, 2022]" disabled/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Meeting Link</label>
                                        <input type="text" name="meeting_link" onChange={this.handleInput} value={this.state.meeting_link} className="form-control" placeholder="Meeting Link" disabled/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Learning Activities</label>
                                        <input type="text" name="learning_activities" onChange={this.handleInput} value={this.state.learning_activities} className="form-control" placeholder="Learning Activities" disabled/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Remarks</label>
                                        <input type="text" name="other_details" onChange={this.handleInput} value={this.state.other_details} className="form-control" placeholder="Remarks" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Added By</label>
                                        <input type="text" name="added_by" onChange={this.handleInput} value={this.state.added_by} className="form-control" placeholder="Other Details" disabled/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Meeting Screenshot</label>
                                        <img src={wfar_image} alt="Meeting Screenshot" height="auto" width="auto" className="form-control" />
                                    </div>

                                    <div className="form-group mb-3 float-end">
                                        <button onClick={this.reject} className="btn btn-danger m-2">REJECT</button>
                                        <button onClick={this.approve} className="btn btn-success m-2">APPROVE</button>
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

export default withParams(Chair_Submitted_WFAR);