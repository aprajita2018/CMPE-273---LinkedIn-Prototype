import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import '../../drawer.css'

class EasyApply extends Component {


    constructor(props) {
        super(props);

        this.applyJob = this.applyJob.bind(this);
    }

    applyJob = (e) => {
        const url = "https://www.facebook.com/";
        window.open(url, '_blank');
    }

    cancelApplication = (e) => {

    }
   

    render() {
        const { applyJob } = this.props;
        return (

            <div>
                <div className="container">
                    <div className="eapply-div">

                        <form>
                            <div class="form-row">
                                <div class="col">
                                    <b><h3>Apply to Job Position - ID</h3></b>
                                    <h4>Company Name</h4>
                                    Location
                                </div>
                            </div>

                            <br />

                            <div class="form-row">
                                <div class="col">
                                    <h4>
                                        <label for="firstName">FirstName LastName</label>
                                    </h4>

                                    <button type="button" class="btn btn-primary">View Profile</button>
                                </div>
                            </div>

                            <br />


                            <b>Apply for this Job:</b><br /><br />
                            <div class="form-row">
                                <div class="col">
                                    <label for="firstName">First Name</label>
                                    <input type="text" class="form-control" name="FirstName" placeholder="First name" />
                                </div>
                                <div class="col">
                                    <label for="firstName">Last Name</label>
                                    <input type="text" class="form-control" placeholder="Last name" />
                                </div>
                            </div>
                            <br />

                            <div class="form-row">
                                <div class="col">
                                    <label for="firstName">Email</label>
                                    <input type="text" class="form-control" name="FirstName" placeholder="Email" />
                                </div>
                                <div class="col">
                                    <label for="firstName">Phone</label>
                                    <input type="text" class="form-control" placeholder="Phone" />
                                </div>
                            </div>

                            <br />
                        </form>
                        <th />
                        <div class="form-row">
                            <div class="col">
                                <label for="exampleFormControlFile1">Upload Resume:</label>
                                <input type="file" class="form-control-file" id="exampleFormControlFile1" />
                            </div>
                            <div class="col">
                                <label for="exampleFormControlFile1">Upload Cover Letter: (Optional)</label>
                                <input type="file" class="form-control-file" id="exampleFormControlFile1" />
                            </div>
                        </div>
                        <br />
                        <th />

                        <br />

                        <div class="form-row">
                            <div class="col">
                                <center>
                                    <object align="right">
                                    <button
                                        type="button"
                                        class="btn btn-danger btn-lg"
                                        onClick={this.applyJob}>
                                        Cancel
                                    </button></object>
                                </center>

                            </div>
                            <div class="col">
                                <center>
                                    <button
                                        type="button"
                                        class="btn btn-primary btn-lg btn-block"
                                        onClick={this.cancelApplication}>
                                        Submit Application
                                    </button>
                                </center>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default EasyApply;