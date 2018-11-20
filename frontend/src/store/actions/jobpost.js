import axios from '../../axios-setup';

import * as actionTypes from './actionTypes';

export const showInit = () => {
    
    return {
     type:actionTypes.SHOW_INIT_JOB,   
     showinit:true,
     
       
    }
}  

export const showJobdesc = () => {
    
        return {
         type:actionTypes.SHOW_JOB_DESC,   
         
         show1stform : true,
         activeSteps : null,
         
           
        }
}


export const showJobqual = () => {
    
    return {
     type:actionTypes.SHOW_JOB_QUAL,   
     show2ndform:true,
     activeSteps : 0,  
    }
 
 
 }
 
 export const showJobcheckout = () => {
     
     return {
        type : actionTypes.SHOW_JOB_CHECKOUT, 
        show3rdform :true,
        activeSteps : 1, 
        
     }
  
  
  }

  export const initsubmit = (data) => {
    return {
       type : actionTypes.SHOW_INIT_JOB_POST, 
       company : data.company,
       jobtitle : data.jobtitle,
       address : data.address, 
       
    }
 
 
 }


 export const jobPostSuccess= () => {
    return {
        type: actionTypes.POST_JOB_CHECKOUT_SUCCESS,
        
        errorFlag : false,
        errormsg: '',
    };
};

export const jobPostFail = () => {
    return {
        type: actionTypes.POST_JOB_CHECKOUT_FAIL,
        
        errorFlag : false,
        errormsg: '',
    };
};




export const continueJobdesc = (data) => {
    return {
        type: actionTypes.POST_JOB_DESC,
        
        company : data.company,
       jobtitle : data.jobtitle,
       address : data.address,
       jobfunc : data.jobfunc,
       emptype : data.emptype,
       industry : data.industry,
       senlevel : data.senlevel,
       jobdes : data.jobdes,
       recapp : data.recapp,
       source : data.source,
       show1stform : true,
       activeSteps : 0,
    };
};

export const continueJobqual = (data) => {
    return {
       type: actionTypes.POST_JOB_QUAL,
       skills: data.skills,
       explevel : data.explevel, 
       edulevel : data.edulevel,
       show2ndform : true,
       activeSteps : 1,
    };
};


 export const jobcheckout = (data) => {
    return dispatch => {
        axios.defaults.withCredentials = true;
    //     let token = JSON.parse(localStorage.getItem("token"));
    //     console.log("print token", token );
    //     var config = {
    //         headers: {'Authorization': token}
    //    };
    axios.post('/jobupdate',data) 
    .then((response) => {
       console.log("Status Code : ",response.status);
       if(response.status === 200){
               //this.setState({httpres: response.data.concat(response.data) })
               console.log("Success Post");

               
               console.log(response.data);
              
               
               //console.log("showform.showPhotoForm ",showform.showPhotoForm , val );
               //console.log("response.data.progBarVal : ",listing.progBarVal);
               dispatch(jobPostSuccess());

           
       }
      
       
       })
       .catch(err => {
        if(err.response){
            //console.log("error  response is : ",err.response.status);
            if(err.response.status===401)
            {
                //dispatch(unauthRedirectOwner());
            }
            else{
                dispatch(jobPostFail(err.response));
            }
        }        
        
        
    });
       

    
    }
}   

