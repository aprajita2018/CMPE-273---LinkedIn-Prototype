import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';


class PersonProfile extends Component {
    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            applicantid: '',
            jobtitle: '',
            phoneno: '',
        }

    }

    componentDidMount() {
        console.log("card in search for person" + this.props);
    }

    componentDidUpdate() {
        if (this.props.props !== undefined) {

            this.state.firstname = this.props.props.firstname;
            this.state.lastname = this.props.props.lastname;
            this.state.applicantid = this.props.props.applicantid;
            this.state.jobtitle = this.props.props.jobtitle;
            this.state.phoneno = this.props.props.phoneno;

        }
    }

    render() {



        //console.log(this.state);

        return (
            <div>
               Resume
            </div>
        )
    }
}

PersonProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default PersonProfile;