import React, { Component } from 'react';
import '../../App.css';
import '../../drawer.css'
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';




class NormalApply extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
            jobtitle:'',
            company:'',
            address:'',
            poststatus:'',
            jobdes:'',
            senlevel:'',
            jobid:'',
            _id:'',
            source:'',
            firstname: '',
            lastname: '',
            phoneno : '', 
            email : '',
            easy_apply:'',
            recruiterid:'',
            applicantaddress:'',
            applicantdisability:'',
            applicantcity:'',
            gender:'',
            hearabout:'',
            applicantzipcode:'',
            applicantstate:'',
            applicantrace:'',
            hasError: false,
           







      }

        this.applyJob = this.applyJob.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    applyJob = (e) => {
        // const url = "https://www.facebook.com/";
        // window.open(url, '_blank');
        console.log(this.state)
        const data = {
            jobtitle:this.state.jobtitle,
            company:this.state.company,
            address:this.state.address,
            poststatus:this.state.poststatus,
            jobdes:this.state.jobdes,
            senlevel:this.state.senlevel,
            jobid:this.state.jobid,
            _id:this.state._id,
            source:this.state.source,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phoneno : this.state.phoneno, 
            email : this.state.email,
            easy_apply:this.state.easy_apply,
            recruiterid:this.state.recruiterid,
            applicantaddress:this.state.applicantaddress,
            applicantdisability:this.state.applicantdisability,
            applicantcity:this.state.applicantcity,
            gender:this.state.gender,
            hearabout:this.state.hearabout,
            applicantzipcode:this.state.applicantzipcode,
            applicantstate:this.state.applicantstate,
            applicantrace:this.state.applicantrace,

        }
        axios.defaults.withCredentials = true;
        console.log(data);
        axios.post('http://localhost:3001/applyjob',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("success")
                    // window.location = '/ownerlogin'
                }else{
                   console.log("error")
                }
            });

    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    componentDidMount(){
        console.log("in normal apply")
        console.log(this.props)
        this.setState({
            jobtitle:this.props.location.state.profile.jobtitle,
            company:this.props.location.state.profile.company,
            address:this.props.location.state.profile.address,
            poststatus:this.props.location.state.profile.poststatus,
            jobdes:this.props.location.state.profile.jobdes,
            easy_apply:this.props.location.state.profile.easy_apply,
            senlevel:this.props.location.state.profile.senlevel,
            jobid:this.props.location.state.profile.jobid,
            _id:this.props.location.state.profile._id,
            source:this.props.location.state.profile.source,
            recruiterid:this.props.location.state.profile.recruiterid,
        })
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
     

      }
   


    render() {
        const { applyJob } = this.props;
        if(this.state.hasError)
        {
            return <h1>Error: </h1>;
        }
        else{
        return (

            <div>
                <div className="container">
                    <div className="apply-div">

                        <form>
                            <div class="form-row">
                                <div class="col">
                                    <b><h4>Job Position - {this.state.jobid}</h4></b>
                                    <h3>{this.state.company}</h3>
                                    <h3>{this.state.address}</h3>
                                  
                                </div>
                                <div class="col">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" height="100" width="100"></img>
                                </div>
                            </div>

                            <br />
                            <br />
                            <b>Requirements</b><br />
                            <p class="text-justify">
                                Inside and out of the classroom, learning never stops. As University students, whether interns or new graduates, we grow quickly by taking on responsibility and making an impact on core projects. We’re students from across the world, from many different backgrounds, who have all come to Asana to continue our learning journeys.
                            </p>

                            <br />

                            <b>Apply for this Job:</b><br /><br />
                            <div class="form-row">
                                <div class="col">
                                    <label for="firstName">First Name</label>
                                    <input type="text" class="form-control" name="FirstName" placeholder="First name" onChange={this.handleChange('firstname')}/>
                                </div>
                                <div class="col">
                                    <label for="firstName">Last Name</label>
                                    <input type="text" class="form-control" placeholder="Last name" onChange={this.handleChange('lastname')}/>
                                </div>
                            </div>
                            <br />
                            <div class="form-row">
                                <div class="col">
                                    <label for="firstName">Email ID</label>
                                    <input type="text" class="form-control" name="email" placeholder="First name" onChange={this.handleChange('email')}/>
                                </div>
                                <div class="col">
                                    <label for="firstName">Phone Number</label>
                                    <input type="text" class="form-control" placeholder="Phone Number" onChange={this.handleChange('phoneno')}/>
                                </div>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="inputAddress">Address</label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" onChange={this.handleChange('applicantaddress')} />
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="inputCity">City</label>
                                    <input type="text" class="form-control" id="inputCity" onChange={this.handleChange('applicantcity')}/>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="inputState">State</label>
                                    <select id="inputState" class="form-control" onChange={this.handleChange('applicantstate')}>
                                        <option selected>Choose...</option>
                                        <option>AL</option>
                                        <option>AK</option>
                                        <option>AS</option>
                                        <option>AZ</option>
                                        <option>AR</option>
                                        <option>CA</option>
                                        <option>CO</option>
                                        <option>CT</option>
                                        <option>DE</option>
                                        <option>DC</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="inputZip">Zip</label>
                                    <input type="text" class="form-control" id="inputZip" onChange={this.handleChange('applicantzipcode')}/>
                                </div>
                            </div>
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
                        <div class="form-group">
                            <label for="inputState">How Did You Hear About Us?:</label>
                            <select id="inputState" class="form-control" onChange={this.handleChange('hearabout')}>
                                <option selected>Choose...</option>
                                <option>Career Fair</option>
                                <option>University Recruiting</option>
                                <option>Referral</option>
                                <option>Friend</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <br />
                        <th />
                        <div class="form-row">
                            <label for="inputState">U.S. Equal Opportunity Employment Information (Completion is voluntary)</label>
                            <h5>
                                <p class="text-justify">
                                    Individuals seeking employment are considered without regards to race, color, religion, national origin, age, sex, marital status, ancestry, physical or mental disability, veteran status, gender identity, or sexual orientation. You are being given the opportunity to provide the following information in order to help us comply with federal and state Equal Employment Opportunity/Affirmative Action record keeping, reporting, and other legal requirements.
                            Completion of the form is entirely voluntary. Whatever your decision, it will not be considered in the hiring process or thereafter. Any information that you do provide will be recorded and maintained in a confidential file.</p>
                            </h5>
                            <div class="col">

                                <b>Gender:</b>
                                <select id="inputState" class="form-control" onChange={this.handleChange('gender')}>
                                    <option selected>Choose...</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Decline to Self Identify</option>
                                </select>
                                <br />
                            </div>
                            <div class="col">
                                <b>Please Identify your race:</b>
                                <select id="inputState" class="form-control" onChange={this.handleChange('applicantrace')}>
                                    <option selected>Choose...</option>
                                    <option>American Indian</option>
                                    <option>Asian</option>
                                    <option>Black or African American</option>
                                    <option>Hispanic or Latino</option>
                                    <option>White</option>
                                    <option>Decline to Self Identify</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="inputState">Voluntary Self-Identification of Disability</label>
                            <h5>
                                <p class="text-justify">
                                    You are considered to have a disability if you have a physical or mental impairment or medical condition that substantially limits a major life activity, or if you have a history or record of such an impairment or medical condition.</p>
                            </h5>
                            <b>Disability Status:</b>
                            <select id="inputState" class="form-control" onChange={this.handleChange('applicantdisability')}>
                                <option selected>Choose...</option>
                                <option>Yes, I have a disability</option>
                                <option>No, I do not have a disability</option>
                                <option>Decline to Self Identify</option>
                            </select>

                        </div>
                        <br />
                        <button
                            type="button"
                            class="btn btn-primary btn-lg btn-block"
                            onClick={this.applyJob}>
                            Submit Application
                        </button>


                    </div>
                </div>
            </div>
        )
    }
}
}

function validate(values) {
    const errors = {};

    if (!values.FirstName) {
        errors.FirstName = "Please Enter Name";
    }

    return errors;
}

export default NormalApply;