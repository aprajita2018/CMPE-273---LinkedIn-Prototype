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
       errorFlag : false,
       successFlag: false,
      
    }
 
 
 }


 export const jobDraftSuccess= (data, jobid) => {
    return {
        type: actionTypes.POST_JOB_DRAFT_SUCCESS,
       
       jobid : jobid, 
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
       draftSuccessFlag: true,
       draftFailFlag : false
    };
};

export const jobDraftFail = () => {
    return {
        type: actionTypes.POST_JOB_DRAFT_FAIL,
        
        draftSuccessFlag: false,
        draftFailFlag : true
    };
};


 export const jobPostSuccess= () => {
    return {
        type: actionTypes.POST_JOB_CHECKOUT_SUCCESS,
        
        errorFlag : false,
        successFlag: true,
        activeSteps : 2,
    };
};

export const jobPostFail = () => {
    return {
        type: actionTypes.POST_JOB_CHECKOUT_FAIL,
        
        errorFlag : true,
        successFlag: false,
        activeSteps : 1,
    };
};

export const jobresetErrors = () => {
    return {
        type: actionTypes.POST_JOB_RESET_ERRORS,
        
        errorFlag : false,
        //successFlag: false,
        draftSuccessFlag: false,
        draftFailFlag : false
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
   
    axios.post('/jobupdate',data) 
    .then((response) => {
       console.log("Status Code : ",response.status);
       if(response.status === 200){
               console.log("Success Post");   
               console.log(response.data);
               if(data.poststatus ==='draft'){
                   dispatch(jobDraftSuccess(data,response.data.jobid)); 
               }
               else{
                dispatch(jobPostSuccess());
               }
               

       }
       
       })
       .catch(err => {
        if(data.poststatus ==='draft'){
            dispatch(jobDraftFail()); 
        } 
        else{
            dispatch(jobPostFail()); 
        }   
                      
    });
    
    }
}   

