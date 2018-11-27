
import React, { Component } from 'react';
import '../../App.css';
import { connect } from "react-redux";
import _ from "lodash";
import {BACKEND_HOST} from '../../store/actions/host_config';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
//import { Graph } from 'react-d3-graph';
import {Bar,Pie} from 'react-chartjs-2';
 

class TraceGraph extends Component {	
   
     
    constructor(props) {
        super(props);
        
       this.updateGraph = this.updateGraph.bind(this);
       this.optionChange = this.optionChange.bind(this);
    }
    componentWillMount()
    {
       const data = {
           username : "recruiter1@mail.com",
           criteria : this.props.selectedCriteria
       }
        this.props.traceGraphData(data);
    }

    updateGraph =  (e) =>
    {
        e.preventDefault();
        const data = {
            username : "recruiter1@mail.com",
            criteria : this.props.selectedCriteria
        }
        this.props.traceGraphData(data);
       
     
       }
       optionChange =  (e) =>
       {
           e.preventDefault();
         this.props.updateCriteria(e.target.value);
      //     this.props.updateGraph(e);
        
          }
    render() {
        const { handleSubmit } = this.props;
var TraceGraph = null;

           if(this.props.tracegraphdata) 
       {
            TraceGraph =  {
          /*  labels: [],
            datasets: [
              {
                label: 'Number of Applicants',
                backgroundColor: 'blue',
                borderWidth: 1,
                labels : [],
               // backGroundColor: [],
                data: []

                
              }
            ]*/
          //  labels: ["Chocolate", "Vanilla", "Strawberry"],
          labels :[],
    datasets: [
        {
            label: "Completed",
            backgroundColor: "blue",
            data: []
        },
        {
            label: "Half Filled",
            backgroundColor: "purple",
            data: []
        },
        {
            label: "Only Read",
            backgroundColor: "green",
            data: []
        }
    ]
          };
       
    if(this.props.tracegraphdata != null)
    {
    //    TraceGraph.labels.push(this.props.tracegraphdata[0].jobid);
     var i = 0;
      for(i = 0; i<this.props.tracegraphdata.length; i++)
      {
        TraceGraph.labels.push(this.props.tracegraphdata[i].jobid);
        TraceGraph.datasets[0].data.push(this.props.tracegraphdata[i].completed);
        TraceGraph.datasets[1].data.push(this.props.tracegraphdata[i].half_filled);
        TraceGraph.datasets[2].data.push(this.props.tracegraphdata[i].onlyread);
    //     TraceGraph.labels.push(this.props.tracegraphdata[i].jobid);
    //    /* TraceGraph.datasets[0].labels.push("Completed");
    //     TraceGraph.datasets[0].labels.push("Half_Filled");
    //     TraceGraph.datasets[0].labels.push("Only Read");
    //     TraceGraph.datasets[0].backGroundColor.push("red");
    //     TraceGraph.datasets[0].backGroundColor.push("blue");
    //     TraceGraph.datasets[0].backGroundColor.push("purple");*/
    //     console.log(this.props.tracegraphdata[i].completed);
    //     console.log(this.props.tracegraphdata[i].half_filled);
    //     console.log(this.props.tracegraphdata[i].onlyread);
    //     console.log(TraceGraph.datasets[i]);
    //     if(typeof(TraceGraph.datasets[i])!='undefined')
    //     {
    //     TraceGraph.datasets[i].data.push(this.props.tracegraphdata[i].completed);
    //     TraceGraph.datasets[i].data.push(this.props.tracegraphdata[i].half_filled);
    //     TraceGraph.datasets[i].data.push(this.props.tracegraphdata[i].onlyread);
         }
      }
     console.log(TraceGraph);
    //}
}
     return (
        <div>
        {/*<NavBar />*/}
        <div className="container mt-5 pt-2">
       
        <div className="form-row">
     

       <div className="form-group col-md-4" style={{textAlign:'center'/*, margin:'30px'*/}}>
      <h4>Application Form Statisics</h4>
      
      </div>
      </div>
          
      <div className="form-row">
     
           <div className="form-group col-md-4" style={{/*marginLeft:'30px' ,*/borderWidth:'1px', borderStyle:'groove'}}>
      
        <Bar
          data={TraceGraph}
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
        
        <div className="form-row">
     
     <div className="form-group col-md-4" style={{/*marginLeft:'30px' ,*/borderWidth:'1px', borderStyle:'groove'}}>

 
 <p>Statistics Critertia</p>
 <form onSubmit = {this.updateGraph}>
 <select name="choice" onChange = {this.optionChange} >
  <option value="All" selected>All Applications</option>
  <option value="San Jose">Applications from San Jose</option> 
  <option value="San Francisco" >Applications from San Francisco</option>
  <option value="Los Angeles">Applications from Los Angeles</option>  
</select>
<button type = "submit" className = "btn btn-primary"  >Update Graph</button>
</form>
     
  
</div>

  </div>
        </div>
        
        </div>
      );
    }
  }

const mapStateToProps = state => {
 

    return {
      tracegraphdata : state.reducer_graph.tracegraphdata,
      selectedCriteria : state.reducer_graph.selectedCriteria

    }
}
const mapDispatchStateToProps = dispatch => {

    return {
       
            traceGraphData : (values) => {
                
                axios.get(BACKEND_HOST + "/tracegraph/" + values.username + "/" + values.criteria, { headers: { authorization: "jwt" + sessionStorage.getItem("usertoken") } })
                .then((response) => {
                    console.log(response);
                    dispatch({ type: "GET_TRACEGRAPH_DATA", payload: response.data, statusCode: response.status })
                })
            },
            
           updateGraph : (values) => {
                
              console.log(values);
            } ,
            updateCriteria : (value) => {
                
                dispatch({ type: "UPDATE_TRACEGRAPH_CRITERIA", payload: value })
              }  
            
    }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(TraceGraph);
