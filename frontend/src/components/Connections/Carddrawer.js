import React, { Component } from "react";

import "../../drawer.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Card } from "@material-ui/core";
import ConnCard from "../Cards/ConnCard";
import ConnReqCard from "./ConnReqCard";
import Typography from "@material-ui/core/Typography";
import NavBar from "../NavBar/NavBar";

class Carddrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authFlag: false,
      cons: 5
    };
  }

  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }

  render() {
    return (
      <div>
        <section class="search-box ">
          <div class="clearfix" />
          <br />

          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6 listing-block">
                <Typography gutterBottom variant="h4" color="primary">
                  Connections : {this.state.cons}
                </Typography>
                <ConnCard />
                <ConnCard />
                <ConnCard />
                <ConnCard />
                <ConnCard />
                <ConnCard />
              </div>
              <div class="col-md-6 listing-block">
                {/* <iframe width="100%" height="595" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.co.uk/maps?f=q&source=s_q&hl=en&geocode=&815&sspn=8.047465,13.666992&ie=UTF8&hq=&hnear=15+Springfield+Way,+Hythe+CT21+5SH,+United+Kingdom&t=m&z=14&ll=51.077429,1.121722&output=embed"></iframe>
                 */}
                <Typography gutterBottom variant="h4" color="primary">
                  Connection Requests
                </Typography>
                <ConnReqCard />
                <ConnReqCard />
                <ConnReqCard />
                <ConnReqCard />
                <ConnReqCard />
                <ConnReqCard />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Carddrawer;
