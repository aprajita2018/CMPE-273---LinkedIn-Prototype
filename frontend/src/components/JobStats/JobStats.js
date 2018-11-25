import React, { Component } from 'react';
import './JobStats.css';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Bar, Pie } from 'react-chartjs-2';
import { BACKEND_HOST } from '../../store/actions/host_config';

const Bardata = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Application Count',
      backgroundColor: 'blue',
      borderWidth: 1,
      data: [65, 59, 80, 81, 56, 55, 40, 10]
    }
  ]
};


const piedata = {

  datasets: [{
    data: [80, 50, 120, 60],
    backgroundColor: [
      'red',
      'green',
      'purple',
      'blue',
      'white',
    ],

  }],
  labels: [
    'Sunnyvale',
    'San Jose',
    'Cupertino',
    'Milpitas',

  ],
};



class JobStats extends Component {
  constructor(props) {
    //Call the constructor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {

      company: '',

    }



  }
  componentDidMount() {
    this.props.minGraphData("recruiter1@mail.com" /*this.props.email*/);


  }

  startJobHandler() {



  }











  render() {
    var MinAppsBar = null;

    if (this.props.mingraphjobs) {
      MinAppsBar = {
        labels: [],
        datasets: [
          {
            label: 'Number of Applications',
            backgroundColor: 'blue',
            borderWidth: 1,
            data: []
          }
        ]
      };


      var i = 0;
      for (i = 0; i < 5; i++) {
        if (typeof (this.props.mingraphjobs[i]) != "undefined") {
          MinAppsBar.labels.push(this.props.mingraphjobs[i]._id.jobtitle);
          MinAppsBar.datasets[0].data.push(this.props.mingraphjobs[i].count);
        }
      }
    }


    return (
      <div>

        <div className="form-row">
          <div className="form-group col-md-4" style={{ textAlign: 'center'/*, margin:'30px'*/ }}>
            <h4>Application Count per month</h4>
          </div>
          <div className="form-group col-md-4" style={{ textAlign: 'center'/*, margin:'30px'*/ }}>
            <h4>Citywise Application Count </h4>
          </div>
          <div className="form-group col-md-4" style={{ textAlign: 'center'/*, margin:'30px'*/ }}>
            <h4>Top 5 Job Postings with Minimum Applications</h4>
          </div>
        </div>

        <div className="form-row">

          <div className="form-group col-md-4" style={{/*marginLeft:'30px' ,*/borderWidth: '1px', borderStyle: 'groove' }}>

            <Bar
              data={Bardata}
              width={300}
              height={400}
              options={{
                maintainAspectRatio: false
              }}
            />

          </div>

          <div className="form-group col-md-4" style={{/*marginLeft:'30px' ,*/borderWidth: '1px', borderStyle: 'groove' }}>

            <Pie
              data={piedata}
              width={300}
              height={400}
              options={{
                maintainAspectRatio: false
              }}
            />
          </div>
          <div className="form-group col-md-4" style={{/*marginLeft:'30px' ,*/borderWidth: '1px', borderStyle: 'groove' }}>
            <Bar
              data={MinAppsBar}
              width={300}
              height={400}
              options={{
                scales: {
                  yAxes: [{
                    ticks: {
                      min: 0,
                      // stepSize: 10  
                    }
                  }]
                }
              }}
            />
          </div>


        </div>


      </div>

    )
  }
}



const mapStateToProps = state => {
  return {

    email: state.user.user.email,
    user_type: state.user.user_type,
    name: state.user.name,
    token: state.user.token,

    mingraphjobs: state.reducer_mingraph.mingraphjobs

  };
};

const mapDispatchStateToProps = dispatch => {
  return {
    //getchartdata:(jobid) =>dispatch(actions.getinitdata(jobid)),
    minGraphData: (username) => {
      axios.get(BACKEND_HOST + "/mingraph/" + username, { headers: { authorization: "jwt" + sessionStorage.getItem("usertoken") } })
        .then((response) => {
          dispatch({ type: "GET_GRAPH_DATA", payload: response.data, statusCode: response.status })
        })
    }
  };
};

export default connect(mapStateToProps, mapDispatchStateToProps)(JobStats);