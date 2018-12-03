import React, { Component } from "react";

import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Card } from "@material-ui/core";
import ConnCard from "../Cards/ConnCard";
import ConnReqCard from "./ConnReqCard";
import Typography from "@material-ui/core/Typography";
import NavBar from "../NavBar/NavBar";
import { connect } from "react-redux";

class Carddrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authFlag: false,
      cons: 0,
      authFlagConnReq: "",
      authFlagConn: "",
      conn_req_list: ["as", "as"],
      conn_list: []
    };
  }

  componentWillMount() {
    this.setState({
      authFlagConnReq: false,
      authFlagConn: false
    });
  }

  componentDidMount() {
    const connData = {
      email: this.props.email
    };

    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:3001/getConns", { params: connData })
      //also send counters with axios on a different route
      .then(response => {
        console.log("Status Code : ", response);
        if (response.status === 200) {
          this.setState({
            conn_list: this.state.conn_list.concat(response.data.conn),
            authFlag: true
          });
          //window.location = '/travellerlogin'
        } else {
        }
      });

    axios
      .get("http://localhost:3001/getConnsReq", { params: connData })
      //also send counters with axios on a different route
      .then(response => {
        console.log("Status Code : ", response);
        if (response.status === 200) {
          this.setState({
            conn_req_list: this.state.conn_req_list.concat(
              response.data.connReq
            ),
            authFlag: true
          });
          //window.location = '/travellerlogin'
        } else {
        }
      });

    this.setState({
      cons: this.state.conn_list.length
    });
  }

  render() {
    let jobs = null;
    if (this.state.authFlagConn == true) {
      var arrConn = Object.values(this.state.conn_list);
      // console.log(arr)

      // console.log(this.state.property_list.length)
      var elementsConn = [];
      // console.log(arr.length)
      for (var i = 0; i < arrConn.length; i++) {
        elementsConn.push(<ConnCard />);
      }
    }

    if (this.state.authFlagConnReq == true) {
      var arrConnReq = Object.values(this.state.conn_req_list);
      // console.log(arr)

      // console.log(this.state.property_list.length)
      var elementsConnReq = [];
      // console.log(arr.length)
      for (var i = 0; i < arrConnReq.length; i++) {
        elementsConnReq.push(<ConnReqCard />);
      }
    }

    return (
      <div>
        <section class="search-box ">
          <div class="clearfix" />
          <br />

          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6 listing-block-connections">
                <Typography gutterBottom variant="h4" color="primary">
                  Connections : {this.state.cons}
                </Typography>
                {elementsConn}
              </div>
              <div class="col-md-6 listing-block-connections">
                {/* <iframe width="100%" height="595" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.co.uk/maps?f=q&source=s_q&hl=en&geocode=&815&sspn=8.047465,13.666992&ie=UTF8&hq=&hnear=15+Springfield+Way,+Hythe+CT21+5SH,+United+Kingdom&t=m&z=14&ll=51.077429,1.121722&output=embed"></iframe>
                 */}
                <Typography gutterBottom variant="h4" color="primary">
                  Connection Requests
                </Typography>
                {elementsConnReq}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    name: state.user.name,
    email: state.user.email
  };
};

export default connect(mapStatetoProps)(Carddrawer);
