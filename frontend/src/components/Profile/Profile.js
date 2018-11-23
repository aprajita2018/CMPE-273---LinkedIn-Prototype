import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Glyphicon, Nav } from "react-bootstrap";
import ProfileContact from './ProfileContact';
import NavBar from '../NavBar/NavBar';
//import BACKEND_HOST from '.../store/actions/host_config';
import {BACKEND_HOST} from '../host_config';
class Profile extends Component {

    constructor(props) {
        super(props);
        this.contact_toggle = this.contact_toggle.bind(this);
        this.add_education_toggle = this.add_education_toggle.bind(this);
        this.add_experience_toggle = this.add_experience_toggle.bind(this);
        this.edit_intro_toggle = this.edit_intro_toggle.bind(this);
        this.edit_education_toggle = this.edit_education_toggle.bind(this);
        this.edit_experience_toggle = this.edit_experience_toggle.bind(this);
        this.editEducation = this.editEducation.bind(this);
        this.editExperience = this.editExperience.bind(this);
       
    }


    contact_toggle() {
        this.props.toggleContact();
    }

    add_education_toggle() {
        this.props.toggleAddEducation();
    }
    add_experience_toggle() {
        this.props.toggleAddExperience();
    }

    edit_intro_toggle() {
        this.props.toggleEditIntro();
    }

    editIntro(values) {
        console.log("Enterting edit intro");
        values.username = "applicant1@mail.com";

        const image  = this.props.image;
        console.log(image);
        let formData = new FormData();
        formData.append('image',image);
        values.image = formData;    
         
        const data = {
            username : 'applicant1@mail.com' 
        }

        console.log(formData);

        axios.post('http://localhost:3001/uploadphotos/setname',data )
        .then(() => {
            axios.post('http://localhost:3001/uploadphotos', formData)
            .then(() => {  this.props.editIntro(values); });
        });
          

       
    }

    edit_education_toggle(selected) {
        console.log("Toggle Education Modal");
        var education = "";
        if (selected.target.name == "edit") {

            if (selected.target.value != "" && selected.target.value != null)
                education = JSON.parse(selected.target.value);

            this.props.editEduValues(education);
        }

        if (selected.target.name == "delete") {
            const data = {
                id: selected.target.id,
                username: "applicant1@mail.com"
            }
            this.props.deleteEducation(data);
        }

        this.props.toggleEditEducation();
    }


    edit_experience_toggle(selected) {
        console.log("Toggle Experience Modal");
        var experience = "";
        if (selected.target.name == "edit") {
            if (selected.target.value != "" && selected.target.value != null) {
                experience = JSON.parse(selected.target.value);
            }

            this.props.editExpValues(experience);
        }

        if (selected.target.name == "delete") {
            const data = {
                id: selected.target.id,
                username: "applicant1@mail.com"
            }
            this.props.deleteExperience(data);

        }
        this.props.toggleEditExperience();
    }
    onChangeimage = (e) => {
      
           var values = e.target.files;
       
         this.props.uploadimage(values);
     
       }

    componentWillMount() {
        console.log("Will Mount Profile");
        this.props.getprofile("applicant1@mail.com");
    }

    addEducation(values) {
        console.log("Enterting add education");
        values.username = "applicant1@mail.com";
        this.props.addEducation(values);
    }

    addExperience(values) {
        console.log("Enterting add experience");
        values.username = "applicant1@mail.com";
        this.props.addExperience(values);
    }




    editEducation = (values) => {
        const resetForm = this.props;

        values.preventDefault();

        const data = {
            id: this.props.edit_edu_id,
            username: "applicant1@mail.com"
        }
        if (values.target.school.value != "")
            data['school'] = values.target.school.value;
        if (values.target.degree.value != "")
            data['degree'] = values.target.degree.value;
        if (values.target.field.value != "")
            data['field'] = values.target.field.value;
        if (values.target.fromYear.value != "")
            data['fromYear'] = values.target.fromYear.value;
        if (values.target.toYear.value != "")
            data['toYear'] = values.target.toYear.value;
        console.log("Entering Edit Education Function");
        // this.props.resetForm("edit_education_form");
        this.props.editEducation(data);
    }

    editExperience = (values) => {
        const resetForm = this.props;

        values.preventDefault();

        const data = {
            id: this.props.edit_exp_id,
            username: "applicant1@mail.com"
        }
        if (values.target.title.value != "")
            data['title'] = values.target.title.value;
        if (values.target.company.value != "")
            data['company'] = values.target.company.value;
        if (values.target.location.value != "")
            data['location'] = values.target.location.value;
        if (values.target.fromMonth.value != "")
            data['fromMonth'] = values.target.fromMonth.value;
        if (values.target.toMonth.value != "")
            data['toMonth'] = values.target.toMonth.value;
        if (values.target.fromYear.value != "")
            data['fromYear'] = values.target.fromYear.value;
        if (values.target.toYear.value != "")
            data['toYear'] = values.target.toYear.value;

        //this.props.resetForm("edit_experience_form");
        this.props.editExperience(data);
    }


    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <input className="form-control" initialValue={field.initialValue} hidden={field.hidden} label={field.label} pattern={field.pattern} value="" placeholder={field.placeholder} type={field.type} {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    render() {
        console.log("Inside Profile Render");
        const { handleSubmit } = this.props;
        const closeEditEducation = <button className="close" onClick={this.edit_education_toggle}>&times;</button>;
        const closeEditExperience = <button className="close" onClick={this.edit_experience_toggle}>&times;</button>;
        var image, firstName, lastName, headline, location, education, experience, contact, current_position, industry;
        if(this.props.image)
        image = 'data:image/jpg;base64, ' + this.props.image;
        if (this.props.firstName)
            firstName = this.props.firstName;
        else
            firstName = "";

        if (this.props.lastName)
            lastName = this.props.lastName;
        else
            lastName = "";

        if (this.props.headline)
            headline = this.props.headline;
        else
            headline = "";

        if (this.props.location)
            location = this.props.location;
        else
            location = "";

        if (this.props.education) {
            education = this.props.education.map(user_education => {


                const EditEducationButton = <button id={user_education._id} name="edit" value={JSON.stringify(user_education)} className="btn btn-link float-right" onClick={this.edit_education_toggle}>Edit</button>;
                return (
                    <div>
                        <div className="row">
                            <div className="col-sm-11">
                                <h6><b>{user_education.school}</b></h6>
                                <h6>{user_education.degree}, {user_education.field}</h6>
                                <h6>{user_education.fromYear} - {user_education.toYear}</h6>
                            </div>
                            <div className="col-sm-1">
                                <h5>{EditEducationButton}</h5>

                            </div>
                        </div>
                    </div>
                )
            }

            )
        }
        else
            education = "";


        if (this.props.experience) {
            experience = this.props.experience.map(user_experience => {
                const EditExperienceButton = <button id={user_experience._id} name="edit" value={JSON.stringify(user_experience)} className="btn btn-link float-right" onClick={this.edit_experience_toggle}>Edit</button>;

                return (
                    <div>
                        <div className="row">
                            <div className="col-sm-11">
                                <h6><b>{user_experience.title}</b></h6>
                                <h6>{user_experience.company}</h6>
                                <h6>{user_experience.fromMonth} {user_experience.fromYear}  - {user_experience.toMonth} {user_experience.toYear}</h6>
                                <h6>{user_experience.location}</h6>
                            </div>
                            <div className="col-sm-1">
                                <h5>{EditExperienceButton}</h5>

                            </div>
                        </div>
                    </div>
                )
            }

            )
        }

        else
            experience = "";
        if (this.props.contact)
            contact = this.props.contact;
        else
            contact = "";

        if (this.props.current_position)
            current_position = this.props.current_position;
        else
            current_position = "";

        if (this.props.industry)
            industry = this.props.industry;
        else
            industry = "";
        const closeContact = <button className="close" onClick={this.contact_toggle}>&times;</button>;
        const closeAddEducation = <button className="close" onClick={this.add_education_toggle}>&times;</button>;
        const closeAddExperience = <button className="close" onClick={this.add_experience_toggle}>&times;</button>;

        const addEducationButton = <button className="btn btn-link float-right" onClick={this.add_education_toggle}>+</button>;
        const addExperienceButton = <button className="btn btn-link float-right" onClick={this.add_experience_toggle}>+</button>;

        const EditIntroButton = <button className="btn btn-link float-right" onClick={this.edit_intro_toggle}>Edit</button>;
        const closeEditIntro = <button className="close" onClick={this.edit_intro_toggle}>&times;</button>;

        var redirectVar = null, redirectModal = null;

        if (this.props.updated) {
            redirectVar = <Redirect to="/profile" />
        }

        if (this.props.modal_contact)
            redirectModal = <Redirect to="/profile/contact-information" />
     //   else if (this.props.modal_edit_intro)
      //      redirectModal = <Redirect to="/profile/edit-intro" />
        else
          redirectModal = <Redirect to="/profile" />
        console.log(this.props.modal_contact);

        return (
            <div>
                <NavBar />
                <div className="container mt-5 pt-2">
                    <div className="signup-form">
                        <div className="main-div">
                            <div className="panel">
                                <div className="bordered-div">

                                    <div className="row">
                                        <div className="col-sm-4">
                                        <img width={'100em'} height={'100em'} src={image} />
                                            <h5><b>{firstName}{" "}{lastName}</b></h5>
                                            <h6>{headline}</h6>
                                            <h6>{location}</h6>

                                            <h6>{current_position}</h6>
                                            <h6>{industry}</h6>
                                        </div>

                                        <div className="col-sm-4">
                                        </div>

                                        <div className="col-sm-4">
                                            <h5>{EditIntroButton}</h5>
                                            <Modal isOpen={this.props.modal_edit_intro} toggle={this.edit_intro_toggle} >
                                                <ModalHeader toggle={this.edit_intro_toggle} close={closeEditIntro}>Edit intro</ModalHeader>
                                                <ModalBody>

                                                    <form name={"edit_intro_form"} enctype="multipart/form-data"  onSubmit={handleSubmit(this.editIntro.bind(this))} >
                                                        {/*   <input type="file" name="images" onChange={this.onChangeimages} />
                                                       Image
                                                       <Field
                                                            name="photo"
                                                            type="file"
                                                            component={this.renderField}
                                                        /> */}
                                                           Upload Profile Image
                                                        <input type="file" name="image"  onChange={this.onChangeimage} />
                                  
                                                        First Name
                                                        <Field
                                                            placeholder={firstName}
                                                            name="firstName"
                                                            type="text"
                                                            component={this.renderField}
                                                        />
                                                        Last Name
                                                        <Field
                                                            placeholder={lastName}
                                                            name="lastName"
                                                            type="text"
                                                            component={this.renderField}
                                                        />
                                                        Headline
                                                        <Field
                                                            placeholder={headline}
                                                            name="headline"
                                                            type="text"
                                                            component={this.renderField}
                                                        />
                                                        Current Position
                                                        <Field
                                                            placeholder={current_position}
                                                            name="current_position"
                                                            type="text"
                                                            component={this.renderField}
                                                        />

                                                        Industry
                                                        <Field
                                                            placeholder={industry}
                                                            name="industry"
                                                            type="text"
                                                            component={this.renderField}
                                                        />

                                                        Contact Information
                                                        <Field
                                                            placeholder={contact}
                                                            name="contact"
                                                            type="text"
                                                            component={this.renderField}
                                                        />

                                                        Country/Region
                                                        <Field
                                                            placeholder={location}
                                                            name="location"
                                                            type="text"
                                                            component={this.renderField}
                                                        />
                                                        {/* <button onClick= /*{this.submitUpdate} {handleSubmit(this.submitUpdate.bind(this))} className="btn btn-primary">Update</button> */}
                                                        <button type="submit" onClick={this.edit_intro_toggle} className="btn btn-primary">Save</button>
                                                    </form>
                                                </ModalBody>

                                            </Modal>

                                            <input className="float-right btn btn-link" onClick={this.contact_toggle} value="See contact info"></input>
                                            {redirectModal}

                                            <input className="float-right btn btn-link" /*onClick={this.toggle}*/ value="See connections"></input>
                                        </div>
                                    </div>

                                </div>

                                <div className="bordered-div">
                                    {redirectVar}
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <h5>Experience</h5>

                                        </div>
                                        <div className="col-sm-6">
                                            <h5>{addExperienceButton}</h5>
                                            <Modal isOpen={this.props.modal_add_experience} toggle={this.add_experience_toggle} >
                                                <ModalHeader toggle={this.add_experience_toggle} close={closeAddExperience}>Add Experience</ModalHeader>
                                                <ModalBody>

                                                    <form name={"add_experience_form"} onSubmit={handleSubmit(this.addExperience.bind(this))} >
                                                        Title
                                                        <Field
                                                            name="title"
                                                            type="text"
                                                            component={this.renderField}
                                                        />
                                                        Company
                                                        <Field
                                                            name="company"
                                                            type="text"
                                                            component={this.renderField}
                                                        />
                                                        Location
                                                        <Field
                                                            name="location"
                                                            type="text"
                                                            component={this.renderField}
                                                        />
                                                        From
                                                        <Field
                                                            placeholder="Month"
                                                            name="fromMonth"
                                                            type="text"
                                                            component={this.renderField}
                                                        />

                                                        <Field
                                                            placeholder="Year"
                                                            name="fromYear"
                                                            type="text"
                                                            component={this.renderField}
                                                        />
                                                        To
                                                        <Field
                                                            placeholder="Month"
                                                            name="toMonth"
                                                            type="text"
                                                            component={this.renderField}
                                                        />
                                                        <Field
                                                            placeholder="Year"
                                                            name="toYear"
                                                            type="text"
                                                            component={this.renderField}
                                                        />

                                                        {/* <button onClick= /*{this.submitUpdate} {handleSubmit(this.submitUpdate.bind(this))} className="btn btn-primary">Update</button> */}
                                                        <button type="submit" onClick={this.add_experience_toggle} className="btn btn-primary">Save</button>
                                                    </form>
                                                </ModalBody>

                                            </Modal>
                                        </div>
                                    </div>
                                    <div>{experience}</div>

                                    <Modal isOpen={this.props.modal_edit_experience} toggle={this.edit_experience_toggle} >
                                        <ModalHeader toggle={this.edit_experience_toggle} close={closeEditExperience}>Edit experience</ModalHeader>
                                        <ModalBody>

                                            <form id={this.props.edit_exp_id} name={"edit_experience_form"} onSubmit={this.editExperience.bind(this)} >
                                                Title
<Field
                                                    placeholder={this.props.edit_exp_title}
                                                    name="title"
                                                    type="text"
                                                    component={this.renderField}
                                                />
                                                Company
<Field
                                                    placeholder={this.props.edit_exp_company}
                                                    name="company"
                                                    type="text"
                                                    component={this.renderField}
                                                />
                                                Location
                                                        <Field
                                                    placeholder={this.props.edit_exp_location}
                                                    name="location"
                                                    type="text"
                                                    component={this.renderField}
                                                />
                                                From
                                                        <Field
                                                    placeholder={this.props.edit_exp_fromMonth}
                                                    name="fromMonth"
                                                    type="text"
                                                    component={this.renderField}
                                                />


                                                <Field
                                                    placeholder={this.props.edit_exp_fromYear}
                                                    name="fromYear"
                                                    type="text"
                                                    component={this.renderField}
                                                />
                                                To
                                                        <Field
                                                    placeholder={this.props.edit_exp_toMonth}
                                                    name="toMonth"
                                                    type="text"
                                                    component={this.renderField}
                                                />
                                                <Field
                                                    placeholder={this.props.edit_exp_toYear}
                                                    name="toYear"
                                                    type="text"
                                                    component={this.renderField}
                                                />
                                                <button type="button" id={this.props.edit_exp_id} name="delete" onClick={this.edit_experience_toggle} className="btn btn-primary">Delete</button>


                                                <button type="submit" name="save" onClick={this.edit_experience_toggle} className="float-right btn btn-primary">Save</button>
                                            </form>
                                        </ModalBody>

                                    </Modal>
                                </div>
                                <div className="bordered-div">

                                    {redirectVar}
                                    <div className="row">

                                        <div className="col-sm-6">
                                            <h5>Education</h5>

                                        </div>

                                        <div className="col-sm-6">
                                            <h5>{addEducationButton}</h5>
                                            <Modal isOpen={this.props.modal_add_education} toggle={this.add_education_toggle} >
                                                <ModalHeader toggle={this.add_education_toggle} close={closeAddEducation}>Add Education</ModalHeader>
                                                <ModalBody>

                                                    <form name={"add_education_form"} onSubmit={handleSubmit(this.addEducation.bind(this))} >
                                                        School
                                                        <Field
                                                            name="school"
                                                            type="text"
                                                            component={this.renderField}
                                                        />
                                                        Degree
                                                        <Field
                                                            name="degree"
                                                            type="text"
                                                            component={this.renderField}
                                                        />
                                                        Field of Study
                                                        <Field
                                                            name="field"
                                                            type="text"
                                                            component={this.renderField}
                                                        />
                                                        From Year
                                                        <Field
                                                            name="fromYear"
                                                            type="text"
                                                            component={this.renderField}
                                                        />
                                                        To Year
                                                        <Field
                                                            name="toYear"
                                                            type="text"
                                                            component={this.renderField}
                                                        />

                                                        {/* <button onClick= /*{this.submitUpdate} {handleSubmit(this.submitUpdate.bind(this))} className="btn btn-primary">Update</button> */}
                                                        <button type="submit" onClick={this.add_education_toggle} className="btn btn-primary">Save</button>
                                                    </form>
                                                </ModalBody>

                                            </Modal>

                                        </div>
                                    </div>


                                    <div>{education}</div>

                                    <Modal isOpen={this.props.modal_edit_education} toggle={this.edit_education_toggle} >
                                        <ModalHeader toggle={this.edit_education_toggle} close={closeEditEducation}>Edit education</ModalHeader>
                                        <ModalBody>

                                            <form id={this.props.edit_edu_id} name={"edit_education_form"} onSubmit={this.editEducation.bind(this)} >
                                                School
<Field
                                                    placeholder={this.props.edit_edu_school}
                                                    name="school"
                                                    type="text"
                                                    component={this.renderField}
                                                />
                                                Degree
<Field
                                                    placeholder={this.props.edit_edu_degree}
                                                    name="degree"
                                                    type="text"
                                                    component={this.renderField}
                                                />
                                                Field
<Field
                                                    placeholder={this.props.edit_edu_field}
                                                    name="field"
                                                    type="text"
                                                    component={this.renderField}
                                                />
                                                fromYear
<Field
                                                    placeholder={this.props.edit_edu_fromYear}
                                                    name="fromYear"
                                                    type="text"
                                                    component={this.renderField}
                                                />

                                                toYear
<Field
                                                    placeholder={this.props.edit_edu_toYear}
                                                    name="toYear"
                                                    type="text"
                                                    component={this.renderField}
                                                />


                                                <button type="button" id={this.props.edit_edu_id} name="delete" onClick={this.edit_education_toggle} className="btn btn-primary">Delete</button>

                                                <button type="submit" name="save" onClick={this.edit_education_toggle} className="float-right btn btn-primary">Save</button>
                                            </form>
                                        </ModalBody>

                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}


const mapStateToProps = state => {
console.log(state);

    return {
        image : state.reducer_profile.image, 
        firstName: state.reducer_profile.firstName,
        lastName: state.reducer_profile.lastName,
        headline: state.reducer_profile.headline,
        location: state.reducer_profile.location,
        current_position: state.reducer_profile.current_position,
        education: state.reducer_profile.education,
        experience: state.reducer_profile.experience,
        industry: state.reducer_profile.industry,
        contact: state.reducer_profile.contact,
        education_id: state.reducer_profile.education_id,
        updated: state.reducer_profile.updated,

        edit_edu_id: state.reducer_profile.edit_edu_id,
        edit_edu_school: state.reducer_profile.edit_edu_school,
        edit_edu_degree: state.reducer_profile.edit_edu_degree,
        edit_edu_field: state.reducer_profile.edit_edu_field,
        edit_edu_fromYear: state.reducer_profile.edit_edu_fromYear,
        edit_edu_toYear: state.reducer_profile.edit_edu_toYear,


        edit_exp_id: state.reducer_profile.edit_exp_id,
        edit_exp_title: state.reducer_profile.edit_exp_title,
        edit_exp_company: state.reducer_profile.edit_exp_company,
        edit_exp_location: state.reducer_profile.edit_exp_location,
        edit_exp_fromYear: state.reducer_profile.edit_exp_fromYear,
        edit_exp_toYear: state.reducer_profile.edit_exp_toYear,
        edit_exp_fromMonth: state.reducer_profile.edit_exp_fromMonth,
        edit_exp_toMonth: state.reducer_profile.edit_exp_Month,

        modal_contact: state.reducer_profile.modal_contact,
        modal_add_education: state.reducer_profile.modal_add_education,
        modal_add_experience: state.reducer_profile.modal_add_experience,
        modal_edit_intro: state.reducer_profile.modal_edit_intro,
        modal_edit_education: state.reducer_profile.modal_edit_education,
        modal_edit_experience: state.reducer_profile.modal_edit_experience,

    }
}
const mapDispatchStateToProps = dispatch => {

    return {
        getprofile: (username) => {
            console.log("Getting Profile");
            axios.get(BACKEND_HOST + '/profile/' + username, { headers: { authorization: "jwt" + sessionStorage.getItem("usertoken") } })
                .then((response) => {
                    dispatch({ type: "GETPROFILE", payload: response.data, statusCode: response.status })
                })
        },
        /*  postprofile: (values) => {
              axios.post(BACKEND_HOST + '/profile', values)
                  .then((response) => {
  
                      dispatch({ type: "POSTPROFILE", payload: response.data })
                  })
          },*/
        addEducation: (values) => {

            axios.post(BACKEND_HOST + '/profile/education', values)
                .then((response) => {
                    console.log("Dispacting ADDEDUCATION");
                    dispatch({ type: "ADDEDUCATION", payload: response.data });

                })
            axios.get(BACKEND_HOST + '/profile/education/' + values.username, { headers: { authorization: "jwt" + sessionStorage.getItem("usertoken") } })
                .then((response) => {

                    dispatch({ type: "GETPROFILE_EDUCATION", payload: response.data, statusCode: response.status })
                })

        },

        addExperience: (values) => {

            axios.post(BACKEND_HOST + '/profile/experience', values)
                .then((response) => {
                    dispatch({ type: "ADDEXPERIENCE", payload: response.data });

                })
            axios.get(BACKEND_HOST + '/profile/experience/' + values.username, { headers: { authorization: "jwt" + sessionStorage.getItem("usertoken") } })
                .then((response) => {

                    dispatch({ type: "GETPROFILE_EXPERIENCE", payload: response.data, statusCode: response.status })
                })
        },



        editEducation: (values) => {
            axios.put(BACKEND_HOST + '/profile/education', values)
                .then((response) => {
                    dispatch({
                        type: "EDITEDUCATION", payload: response.data
                    });
                })

            axios.get(BACKEND_HOST + '/profile/education/' + values.username, { headers: { authorization: "jwt" + sessionStorage.getItem("usertoken") } })
                .then((response) => {
                    dispatch({ type: "GETPROFILE_EDUCATION", payload: response.data, statusCode: response.status });
                })
        },

        editEducationID: (value) => {
            dispatch({
                type: "EDITEDUCATION_ID", payload: value
            });

        },
        editEduValues: (values) => {
            dispatch({
                type: "EDITEDUCATION_VALUES", payload: values
            });
        },

        editExperience: (values) => {

            axios.put(BACKEND_HOST + '/profile/experience', values)
                .then((response) => {
                    dispatch({
                        type: "EDITEXPERIENCE", payload: response.data
                    });
                })

            axios.get(BACKEND_HOST + '/profile/experience/' + values.username, { headers: { authorization: "jwt" + sessionStorage.getItem("usertoken") } })
                .then((response) => {
                    dispatch({ type: "GETPROFILE_EXPERIENCE", payload: response.data, statusCode: response.status })
                });
        },

        editExpValues: (values) => {
            dispatch({
                type: "EDITEXPERIENCE_VALUES", payload: values
            });
        },

        deleteEducation: (value) => {
            axios.delete(BACKEND_HOST + '/profile/education', { data: value })
                .then((response) => {
                    dispatch({
                        type: "DELETE_EDUCATION", payload: response.data
                    });
                })

            axios.get(BACKEND_HOST + '/profile/education/' + value.username, { headers: { authorization: "jwt" + sessionStorage.getItem("usertoken") } })
                .then((response) => {

                    dispatch({ type: "GETPROFILE_EDUCATION", payload: response.data, statusCode: response.status })
                })
        },

        deleteExperience: (value) => {
            console.log(value);
            axios.delete(BACKEND_HOST + '/profile/experience', { data: value })
                .then((response) => {
                    dispatch({
                        type: "DELETE_EDUCATION", payload: response.data
                    });
                })

            axios.get(BACKEND_HOST + '/profile/experience/' + value.username, { headers: { authorization: "jwt" + sessionStorage.getItem("usertoken") } })
                .then((response) => {

                    dispatch({ type: "GETPROFILE_EXPERIENCE", payload: response.data, statusCode: response.status })
                })
        },

        resetupdated: () => {

            dispatch({ type: "RESETUPDATED" })
        },

        showmodal: () => {
            console.log("Dispatching Show Modal");
            dispatch({ type: "SHOW_MODAL" })
        },
        resetForm: (value) => {
            dispatch(reset(value));
        },
        toggleContact: () => {
            dispatch({ type: "TOGGLE_CONTACT" });
        },
        toggleEditIntro: () => {
            dispatch({ type: "TOGGLE_EDIT_INTRO" });
        },
        toggleAddEducation: () => {
            dispatch({ type: "TOGGLE_ADD_EDUCATION" });
        },
        toggleEditEducation: () => {
            dispatch({ type: "TOGGLE_EDIT_EDUCATION" });
        },
        toggleAddExperience: () => {
            dispatch({ type: "TOGGLE_ADD_EXPERIENCE" });
        },
        toggleEditExperience: () => {
            dispatch({ type: "TOGGLE_EDIT_EXPERIENCE" });
        },
        editIntro: (values) => {
            console.log("Dispatching Action EI");
            axios.put(BACKEND_HOST + '/profile/intro', values)
                .then((response) => {
                    console.log("Response", response.data);
                    dispatch({
                        type: "EDITINTRO", payload: response.data
                    });
                })
        },
        uploadimage : (values) =>{
           
            dispatch({type:"UPLOADIMAGE",payload: values})
        },

    }
}


function validate(values) {

    const errors = {};
    if (!values.school) {
        errors.school = "Enter School";
    }


    return errors;
}



export default reduxForm({
    validate,
    form: "ProfileForm",
    reducer: "ProfileReducer"
})(connect(mapStateToProps, mapDispatchStateToProps)(Profile));

