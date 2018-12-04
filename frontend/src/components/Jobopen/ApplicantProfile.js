import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import PDF from 'react-pdf-js';
import './apply.css'


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



       // console.log(this.state);

        return (
            <div>
               {/* Resume */}
              
               <iframe id="inlineFrameExample"
    title="Inline Frame Example"
    width="300"
    height="700"
    src="file:///home/rajas/Documents/audio.jpg">
</iframe>
    {/* <Document
        file="https://ijcsmc.com/docs/papers/September2015/V4I9201521.pdf"
        /> */}
        {/* <PDF
        file="https://ijcsmc.com/docs/papers/September2015/V4I9201521.pdf"/> */}

              

            </div>
        )
    }
}

PersonProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default PersonProfile;