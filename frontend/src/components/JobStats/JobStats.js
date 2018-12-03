import React, { Component } from 'react';
import './JobStats.css';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Bar, Pie } from 'react-chartjs-2';
//import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';

import NavBar from '../NavBar/NavBar';
<<<<<<< HEAD

// const testop = [
// {label: "Software Engineering", value: "1"},
//  {label: "Junior Manager", value: "2"},
// {label: "Senior Manager", value: "3"},
//  {label: "Software Intern", value: "6"},
//  {label: "Marketing Intern", value: "7"},
// ]
=======
//import { Stats } from 'fs';


>>>>>>> 8e03b24762dc7524e630e5a36f41105216f10660
class JobStats extends Component {
  constructor(props) {
    //Call the constructor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {

      company: '',
      appmonData : [],
      appmonSelectState : [],
      appmonSel : this.props.appmonSelect?this.props.appmonSelect[0]:null,
      appstatusSel : this.props.appstatusSelect?this.props.appstatusSelect[0]:null,
<<<<<<< HEAD
=======
      appbycitySel : this.props.appbycitySelect?this.props.appbycitySelect[0]:null
>>>>>>> 8e03b24762dc7524e630e5a36f41105216f10660
    }
    


  }
  componentDidMount() {
<<<<<<< HEAD
    // this.props.minGraphData("recruiter1@mail.com" /this.props.email/);
=======
>>>>>>> 8e03b24762dc7524e630e5a36f41105216f10660

    this.props.getgraphData('recruiter1@mail.com');
   


  }

  handleChange = name => value => {
   
        this.setState({
          [name] : value,
            
      })
      
      

    }

render() {
<<<<<<< HEAD
var MinAppsBar = null;
=======
var showappclicks = null;
>>>>>>> 8e03b24762dc7524e630e5a36f41105216f10660
var showmonthapp = null;
var showappstatus = null;
var showsaveapp = null;
let showtoplowapp = null;
let statuspiedata = [];
let appmonbardata = [];
<<<<<<< HEAD
=======
let appbycitydata = [];
let showappbycity = [];
let redirectVar = null;

if(!this.props.token){
        
  // redirectVar = <Redirect to= "/"/>
}
>>>>>>> 8e03b24762dc7524e630e5a36f41105216f10660


if(this.props.apppermonth){
  
if(this.state.appmonSel){
  let val = this.state.appmonSel.value;
  let temp = this.props.apppermonth;
  let j = 0;
  for(var i=0;i<temp.length ;i++){
    if(val === temp[i].jobid) {
      j = i;
    }
    
     
  } 
  
  appmonbardata = Object.values(this.props.apppermonth[j]);  

}
else{

     appmonbardata = Object.values(this.props.apppermonth[0]);  
    
}

var appmonthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July','Aug','Sep','Oct','Nov','Dec'],
  datasets: [
    {
      label: 'Applications',
      backgroundColor: 'blue',
      borderWidth: 1,
      data: appmonbardata.splice(2,12),
    }
  ]
};

  showmonthapp =   
  <Bar
  data={appmonthData}
  width={220}
  height={400}
  options={{
    maintainAspectRatio: false
  }}
/>



}else{

  showmonthapp = <h4>No Data Found</h4>
}

if(this.props.appstatus){
  

  //console.log("apppermonth", this.props.apppermonth)
  if(this.state.appstatusSel){
    let val = this.state.appstatusSel.value;
    let temp = this.props.apppermonth;
    let j = 0;
    for( i=0;i<temp.length ;i++){
      if(val === temp[i].jobid) {
        j= i;
      }
      
       
    } 
    
     statuspiedata = Object.values(this.props.appstatus[j]);  
    

  }
  else{
  
      statuspiedata = Object.values(this.props.appstatus[0]);  
      
  
  }
  
  var appstatusData = 
      {

          datasets: [{
            data: statuspiedata.splice(2,5),
            backgroundColor: ['green','purple', 'red',]
          }],
          labels: ['Completed','Half Filled','Read',],
        };
  
  
  showappstatus =   
     <Pie
              data={appstatusData}
              width={220}
              height={400}
              options={{
                maintainAspectRatio: false
              }}
            /> 
  
  
  
  }else{
  
    showappstatus = <h4>No Data Found</h4>
  }

if(this.props.appsaves){
var propsave =  this.props.appsaves; 
var appsavelabel =[];
var appsavedata = [];
  for(i =0;i < propsave.length;i++){

    appsavedata.push(propsave[i].saves);
    appsavelabel.push(propsave[i].jobtitle);

  }  
// console.log("appsavelabel", appsavelabel);
// console.log("appsavedata", appsavedata);

  var appsaveData = {

      datasets: [{
        data: appsavedata,
        backgroundColor: ['purple', 'coral','blue','burlyWood','darkOrchid','fuchsia','hotPink','orange','violet','cyan','olive','green']
      }],
      labels: appsavelabel,
    };
  
  showsaveapp =  
    <Pie
    data={appsaveData}
    width={220}
    height={400}
    options={{
      maintainAspectRatio: false
    }}
  />

}
else{

  showsaveapp = <h4>No Data Found</h4>
}
    
if(this.props.toplowapps){
  var toplowapp =  this.props.toplowapps; 
  var toplowapplabel =[];
  var toplowappdata = [];
    for( i =0;i < toplowapp.length;i++){
  
      toplowappdata.push(toplowapp[i].count);
      toplowapplabel.push(toplowapp[i].jobtitle);
  
    }    
    var apptoplowData = {
  
        datasets: [{
          data: toplowappdata,
          backgroundColor: ['orange','violet','cyan','olive','green','purple', 'coral','blue','burlyWood','darkOrchid','fuchsia','hotPink']
        }],
        labels: toplowapplabel ,
      };
    
    showtoplowapp =  
      <Pie
      data={apptoplowData}
      width={220}
      height={400}
      options={{
        maintainAspectRatio: false
      }}
    />
  
  }
  else{
  
    showtoplowapp = <h4>No Data Found</h4>
  }

<<<<<<< HEAD
=======
  if(this.props.appbyCity){
  
    if(this.state.appbycitySel){
       let val = this.state.appbycitySel.value;
       let temp = this.props.appbyCity;
       let j = 0;
      for(var i=0;i<temp.length ;i++){
        if(val === temp[i].location) {
          j = i;
        }
        
         
      } 
      
      appbycitydata = Object.values(this.props.appbyCity[j]);  
    
    }
    else{
    
      appbycitydata = Object.values(this.props.appbyCity[0]);  
        
    }
    
    var appbycityData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July','Aug','Sep','Oct','Nov','Dec'],
      datasets: [
        {
          label: 'Applications',
          backgroundColor: 'coral',
          borderWidth: 1,
          data: appbycitydata.splice(1,12),
        }
      ]
    };
    
    showappbycity =   
      <Bar
      data={appbycityData}
      width={220}
      height={400}
      options={{
        maintainAspectRatio: false
      }}
    />
    
    
    
    }else{
    
      showappbycity = <h4>No Data Found</h4>
    }


    if(this.props.appClicks){
      var propclicks =  this.props.appClicks; 
      var appclicksabel =[];
      var appclicksdata = [];
        for(i =0;i < propsave.length;i++){
      
          appclicksdata.push(propclicks[i].saves);
          appclicksabel.push(propclicks[i].jobtitle);
      
        }  
      
      
        var appclicksData = {
      
            datasets: [{
              data: appclicksdata,
              backgroundColor: ['purple', 'coral','blue','burlyWood','darkOrchid','fuchsia','hotPink','orange','violet','cyan','olive','green']
            }],
            labels: appclicksabel,
          };
        
        showappclicks =  
          <Pie
          data={appclicksData}
          width={220}
          height={400}
          options={{
            maintainAspectRatio: false
          }}
        />
      
      }
      else{
      
        showappclicks = <h4>No Data Found</h4>
      }





>>>>>>> 8e03b24762dc7524e630e5a36f41105216f10660


    return (
      <div>
        <NavBar />
        
        <div className="container" style={{ minWidth: '1300px', padding:'5px'}}>
        <div className="row">
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>  
          <h4>Applications per month</h4>
          </div>
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>
           <h4>Application Status by Job</h4>
          </div>
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>
<<<<<<< HEAD
               <h4>Saved Applications</h4>
=======
               <h4>Applications by City </h4>
>>>>>>> 8e03b24762dc7524e630e5a36f41105216f10660
          </div>
        </div>
       </div>

        <div className="container" style={{ minWidth : '1300px', padding:'5px'}}>
     
        <div className="row">
        
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px' ,borderWidth: '1px', borderStyle: 'groove' }}>  
          
          {showmonthapp}

          </div>

          <div className="col-sm-5" style={{ maxWidth: '400px',margin:'10px' , borderWidth: '1px', borderStyle: 'groove' }}>

            {showappstatus}
            
            {/* <Pie
              //data={piedata}
              width={220}
              height={400}
              options={{
                maintainAspectRatio: false
              }}
            /> */}
          </div>
          <div className="col-sm-5" style={{ maxWidth: '400px',margin:'10px' ,borderWidth: '1px', borderStyle: 'groove' }}>
            
<<<<<<< HEAD
          {showsaveapp}
=======
          
          {showappbycity}

>>>>>>> 8e03b24762dc7524e630e5a36f41105216f10660
            {/* <Bar
              // data={MinAppsBar}
              redraw
              width={220}
              height={400}
              options={{
                maintainAspectRatio: false
              }}
            /> */}
          </div>
        </div>
       </div>
       
       <div className="container" style={{ minWidth: '1300px', padding:'5px'}}>
        <div className="row">
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>  
          <label >Select Job Title to View Graph</label>
          <CreatableSelect options={this.props.appmonSelect} defaultValue={this.props.appmonSelect?this.props.appmonSelect:null} name="appmonSel" onChange={this.handleChange('appmonSel')} />
          </div>
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>
          <label >Select Job Title to View Graph</label>
          <CreatableSelect options={this.props.appstatusSelect} defaultValue={this.props.appstatusSelect?this.props.appstatusSelect:null} name="appstatusSel" onChange={this.handleChange('appstatusSel')} />
          
          </div>
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>
<<<<<<< HEAD
          {/* <label >Select Job to View Graph</label> */}
          {/* <Select></Select> */}
=======
          <label >Select City to View Graph</label>
          <CreatableSelect options={this.props.appbyCitySelect} defaultValue={this.props.appbyCitySelect?this.props.appbyCitySelect:null} name="appbycitySel" onChange={this.handleChange('appbycitySel')}  />
>>>>>>> 8e03b24762dc7524e630e5a36f41105216f10660
          </div>
        </div>
       </div>  

        <div className="container" style={{ minWidth: '1300px', padding:'5px'}}>
        <div className="row">
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>  
          <h4>Top 5 Lowest Applications</h4>
          </div>
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>
<<<<<<< HEAD
           <h4>Applications by City</h4>
=======
           <h4>Applications Saves</h4>
>>>>>>> 8e03b24762dc7524e630e5a36f41105216f10660
          </div>
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>
               <h4>Total Clicks</h4>
          </div>


        </div>

       </div>
        
        <div className="container" style={{ minWidth: '1300px', padding:'5px'}}>
        <div className="row">
        
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px' ,borderWidth: '1px', borderStyle: 'groove' }}>  
          
          {showtoplowapp}

          </div>

          <div className="col-sm-5" style={{ maxWidth: '400px',margin:'10px' , borderWidth: '1px', borderStyle: 'groove' }}>

<<<<<<< HEAD
            {/* <Pie
              // data={piedata}
              width={220}
              height={400}
              options={{
                maintainAspectRatio: false
              }}
            /> */}
          </div>
          <div className="col-sm-5" style={{ maxWidth: '400px',margin:'10px' ,borderWidth: '1px', borderStyle: 'groove' }}>
            {/* <Bar
              data={MinAppsBar}
              width={220}
              height={400}
              options={{
                maintainAspectRatio: false
              }}
            /> */}
=======
           {showsaveapp}

          </div>
          <div className="col-sm-5" style={{ maxWidth: '400px',margin:'10px' ,borderWidth: '1px', borderStyle: 'groove' }}>
            
            {showappclicks}
            
           
>>>>>>> 8e03b24762dc7524e630e5a36f41105216f10660
          </div>


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
    apppermonth : state.jobstats.apppermonth,
    appmonSelect : state.jobstats.appmonSelect,
    appsaves : state.jobstats.appsaves,
    appstatus : state.jobstats.appstatus, 
    toplowapps : state.jobstats.toplowapps,
    appstatusSelect : state.jobstats.appstatusSelect,
<<<<<<< HEAD
    mingraphjobs: state.reducer_mingraph.mingraphjobs

=======
    appbyCity : state.jobstats.appbycity,
    appbyCitySelect : state.jobstats.appbycitySelect,
    appClicks : state.jobstats.appclicks,
    token : state.user.token,
>>>>>>> 8e03b24762dc7524e630e5a36f41105216f10660
  };
};

const mapDispatchStateToProps = dispatch => {
  return {
<<<<<<< HEAD
    //getchartdata:(jobid) =>dispatch(actions.getinitdata(jobid)),
    getgraphData : (username) => dispatch( actions.getgraphdata(username) ),
    // minGraphData: (username) => {
      

    //   axios.get(BACKEND_HOST + "/mingraph/" + username, { headers: { authorization: "jwt" + sessionStorage.getItem("usertoken") } })
    //     .then((response) => {
    //       dispatch({ type: "GET_GRAPH_DATA", payload: response.data, statusCode: response.status })
    //     })
    // }
=======
    getgraphData : (username) => dispatch( actions.getgraphdata(username) ),
    
>>>>>>> 8e03b24762dc7524e630e5a36f41105216f10660
  };
};

export default connect(mapStateToProps, mapDispatchStateToProps)(JobStats);