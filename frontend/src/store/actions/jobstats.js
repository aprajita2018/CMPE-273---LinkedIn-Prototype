import axios from '../../axios-setup';

import * as actionTypes from './actionTypes';

<<<<<<< HEAD
export const getgraphSuccess = (result,appmonSelect, appstatusSelect) => {
=======
export const getgraphSuccess = (result,appmonSelect, appstatusSelect,appbycitySelect) => {
>>>>>>> 8e03b24762dc7524e630e5a36f41105216f10660
    return {
        type: actionTypes.GET_GRAPH_DATA_SUCCESS,
        grapherrFlag : false,
        graphsuccFlag:true,
        apppermonth : result[0],
        appmonSelect : appmonSelect,
        appsaves : result[1],
        appstatus : result[2],
        toplowapps : result[3],
<<<<<<< HEAD
=======
        appbycity : result[4],
        appclicks : result[1],
        appbycitySelect: appbycitySelect,
>>>>>>> 8e03b24762dc7524e630e5a36f41105216f10660
        appstatusSelect : appstatusSelect,
    };
};


export const getgraphFail = () => {
    return {
        type: actionTypes.GET_GRAPH_DATA_FAIL,
        grapherrFlag : true,
        graphsuccFlag : false,
    };
};


export const getgraphdata = (username) => {
    return dispatch => {
          
   
     
    let appmonSelect =  [];
    let appstatusSelect = [];
<<<<<<< HEAD
=======
    let appbycitySelect =[];
>>>>>>> 8e03b24762dc7524e630e5a36f41105216f10660
        axios.get('/graphdata',{
           params: {
               username : username,
               
               
             }
        }) 
       .then((response) => {
    
          
          
           console.log("Status Code : ",response.status);
           if(response.status === 200){
                   
            console.log("Success Graph data fetch");
                   console.log(response.data);
            
            //console.log("options", options);
            for(var i =0;i < response.data.results[0].length;i++){
                    appmonSelect.push({
                    label:response.data.results[0][i].jobtitle,
                    value:response.data.results[0][i].jobid,
                })
       
            }

<<<<<<< HEAD
            for(var i =0;i < response.data.results[0].length;i++){
                appstatusSelect.push({
                label:response.data.results[0][i].jobtitle,
                value:response.data.results[0][i].jobid,
            })
   
        }

       //console.log("options", appmonSelect); 
       dispatch(getgraphSuccess(response.data.results, appmonSelect, appstatusSelect));
=======
            for(i=0;i < response.data.results[1].length;i++){
                appstatusSelect.push({
                label:response.data.results[1][i].jobtitle,
                value:response.data.results[1][i].jobid,
               })
   
            }
            
            for(i=0;i < response.data.results[4].length;i++){
                appbycitySelect.push({
                label:response.data.results[4][i].location,
                value:response.data.results[4][i].location,
               })
   
            }



       //console.log("options", appmonSelect); 
       dispatch(getgraphSuccess(response.data.results, appmonSelect, appstatusSelect, appbycitySelect));
>>>>>>> 8e03b24762dc7524e630e5a36f41105216f10660
               
                   //ispatch(getgraphSuccess(response.data.results)); 
                   //dispatch(getgraphSuccess(response.data))  ; 
                  
                
                  
           }else{
                   
                  
                  console.log("Error in Response");
    
               }
          
           
           })
           .catch((error) => {
            
            //dispatch(getgraphSuccess(result)); 
            dispatch(getgraphFail());
            
        });    
       
       
    };
};