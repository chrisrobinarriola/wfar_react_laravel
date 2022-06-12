import axios from 'axios';
import React, {Component} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import swal from 'sweetalert';

function withComponent(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
}

class Index extends Component
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
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 d-flex mt-5 justify-content-center">
                        <img src="/bulsu_logo2.png" alt="BULSU Logo" className="home_logo m-3" height={"200px"}/>
                        <img src="/CICT.png" alt="CICT Logo" className="home_logo m-3" height={"200px"}/>
                    </div>
                    <div className="col-sm-12 mt-5 text-center">
                        <h1>College of Information and Communications Technology</h1>
                        <h1>Weekly Faculty Accomplishments Report Management System</h1>
                        <Link to="/login" className="btn btn-light mt-5 ps-4 pe-4">Login</Link>
                    </div>
                </div>
                <div className="row mt-5 mb-5">
                    <div className="col-sm-6 goals">
                    <h2>Vision</h2>
                        Bulacan State University is a progressive knowledge-generating institution globally recognized for excellent instruction, pioneering research, and responsive community engagements
                    </div>
                    <div className="col-sm-6 goals">
                    <h2>Mission</h2>
                        Bulacan State University exists to produce highly competent, ethical and service-oriented professionals that contribute to the sustainable socio-economic growth and development of the nation
                    </div>
                </div>
                <hr/>
                <div className="row mt-5 mb-5">
                    <div className="col-12 mb-5">
                        <h2>Goals</h2>
                        In the pursuit of its mission, the initiatives and efforts of the University are geared towards the attainment of the following goals:
                    </div>
                    <div className="col-sm-6 goals">
                        <h4>Quality and Excellence</h4>
                        Quality and Excellence. Promoting quality and relevant educational programs that meet international standards.
                    </div>
                    <div className="col-sm-6 goals">
                        <h4>Relevance and Responsiveness</h4>
                        Generation and dissemination of knowledge in the broad range of disciplines relevant and responsive to the dynamically changing domestic and international environments.
                    </div>
                    <div className="col-sm-6 goals">
                        <h4>Access and Equity</h4>
                        Broadening the access of deserving and qualified students to educational opportunities.
                    </div>
                    <div className="col-sm-6 goals">
                        <h4>Efficiency and Effectiveness</h4>
                        Optimizing of social, institutional and individual returns and benefits derived from the utilization of higher education resources.
                    </div>
                </div>
                <hr/>
                <div className="row mt-5 mb-5">
                    <div className="col-sm-12 mb-5">
                        <h2>Objectives</h2>
                        <p>To provide students with holistic training by introducing new technologies in Information and Communication Technology and allowing them to experience actual workplace environment.</p>
                        <p>To inculcate discipline towards the achievements of professional competencies, integrity, moral and ethical values.</p>
                        <p>Bachelor of Science in Information Technology: To produce students knowledgeable in programming, networking, database management, game development, web development, multi media, mobile applications and with expertise on system analysis and design by providing appropriate trainings and laboratories.</p>
                        <p>To promote culture of teamwork, discipline, good study, habits and standards of learning by exploring hardware and software technology in an environment conducive to learning.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withComponent(Index);