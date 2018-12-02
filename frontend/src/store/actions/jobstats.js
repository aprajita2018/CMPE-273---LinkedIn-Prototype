import axios from '../../axios-setup';

import * as actionTypes from './actionTypes';

export const getgraphSuccess = (result,appmonSelect, appstatusSelect) => {
    return {
        type: actionTypes.GET_GRAPH_DATA_SUCCESS,
        grapherrFlag : false,
        graphsuccFlag:true,
        apppermonth : result[0],
        appmonSelect : appmonSelect,
        appsaves : result[1],
        appstatus : result[2],
        toplowapps : result[3],
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

            for(var i =0;i < response.data.results[0].length;i++){
                appstatusSelect.push({
                label:response.data.results[0][i].jobtitle,
                value:response.data.results[0][i].jobid,
            })
   
        }

       //console.log("options", appmonSelect); 
       dispatch(getgraphSuccess(response.data.results, appmonSelect, appstatusSelect));
               
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