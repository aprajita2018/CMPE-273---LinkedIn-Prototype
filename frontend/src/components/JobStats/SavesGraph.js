
import React, { Component } from 'react';
import '../../App.css';
import { connect } from "react-redux";
import _ from "lodash";
import {BACKEND_HOST} from '../../store/actions/host_config';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
//import { Graph } from 'react-d3-graph';
import {Bar,Pie} from 'react-chartjs-2';
 

class SavesGraph extends Component {	
   
    componentWillMount()
    {
       
        this.props.savesGraphData("recruiter1@mail.com");
    }
    render() {
  

var SavesGraph = null;
        console.log("props:",this.props);
       // if(typeof(this.props.savesgraphdata)!='undefined' && this.props.savesgraphdata == null)
       if(this.props.savesgraphdata) 
       {
            SavesGraph =  {
            labels: [],
            datasets: [
              {
                label: 'Saves Per Job Posting',
                backgroundColor: 'blue',
                borderWidth: 1,
                data: []
              }
            ]
          };
       
  //  if(this.props.savesgraphdata != null)
   // {
     var i = 0;
     for(i = 0; i<this.props.savesgraphdata.length; i++)
     {
         
        SavesGraph.labels.push(this.props.savesgraphdata[i].jobid);
        SavesGraph.datasets[0].data.push(this.props.savesgraphdata[i].saves);
     }
    //}
}
     return (
        <div>
        {/*<NavBar />*/}
        <div className="container mt-5 pt-2">
       
        <div className="form-row">
     

       <div className="form-group col-md-4" style={{textAlign:'center'/*, margin:'30px'*/}}>
      <h4>Saves Per Job Posting</h4>
      </div>
      </div>
          
      <div className="form-row">
     
           <div className="form-group col-md-4" style={{/*marginLeft:'30px' ,*/borderWidth:'1px', borderStyle:'groove'}}>
      
        <Bar
          data={SavesGraph}
          width={300}
            height={400}
          options={{
            scales: {
                yAxes: [{
                    ticks: {          
                        min : 0,
                        stepSize: 1  
                    } 
                }]
            }
          }}
        />
        
      </div>
        </div>
        </div>
        
        </div>
      );
    }
  }

const mapStateToProps = state => {
   console.log(state.reducer_graph);

    return {
      savesgraphdata : state.reducer_graph.savesgraphdata

    }
}
const mapDispatchStateToProps = dispatch => {

    return {
       
            savesGraphData : (username) => {
                
                axios.get(BACKEND_HOST + "/savesgraph/" + username, { headers: { authorization: "jwt" + sessionStorage.getItem("usertoken") } })
                .then((response) => {
                    console.log(response);
                    dispatch({ type: "GET_SAVESGRAPH_DATA", payload: response.data, statusCode: response.status })
                })
            }  
    }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(SavesGraph);
