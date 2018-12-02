import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
// import '../../drawer.css'


class PeopleCard extends Component {
  constructor() {
    super();
    this.state = {
      easy_apply: 1,
      text: "Applicants and recruiters ",
    }
    this.routeToProfile = this.routeToProfile.bind(this);

  }

  componentDidMount() {

    console.log("card in search for each card")
    // console.log(this.props)

    this.setState = {
      // easy_apply: this.props.props.easyapply
    }
  }

  routeToProfile = (e) => {
    console.log("in clicked");
    this.props.onClick(this.props.id);
    // console.log("this.props");
    // console.log(this.props);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    today = mm + '/' + dd + '/' + yyyy;
    console.log("today" + today);
    let date = new Date()
    let newDate = new Date(date.setDate(date.getDate() - 30))
    console.log(newDate.getMonth() + 1 + '/' + newDate.getDate() + '/' + newDate.getFullYear())

    const data = {
      applicant_id: this.props.props._id,
    }
    //console.log("app" + applicant_id);

    axios.defaults.withCredentials = true;

    axios.post('http://localhost:3001/profileviews', data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("success")

        } else {
          console.log("error")
        }
      });


  };




  render() {

    //console.log(this.props.props)
    const { classes, theme } = this.props;

    return (

      <div class="card" >
        <div class="card-body">
          <h5 class="card-title"> {this.props.props.firstName} {this.props.props.lastName}</h5>
          <h6 class="card-subtitle mb-2 text-muted"> {this.props.props.headline}</h6>
          <p class="card-text">{this.props.props.location}</p>
          <a href="#" class="card-link" onClick={this.routeToProfile}>View Profile</a>
        </div>
      </div>

    );

  }
}

PeopleCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

// export default withStyles(styles, { withTheme: true })(PeopleCard);
export default PeopleCard;