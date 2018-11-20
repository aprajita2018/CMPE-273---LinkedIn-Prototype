import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState ={
  showinit : true,
  show1stform : false,
  show2ndform : false,
  show3rdform :false,
  activeSteps : 0,
  company : '',
  jobtitle : '',
  address : '',
  jobfunc : '',
  emptype : '',
  industry : '',
  senlevel : '',
  jobdes : '',
  recapp : '',
  source : '',
  skills : '',
  explevel : '',
  edulevel: '',
  rate : '',

}


const initJobsuccess = (state, action) => {
    
   return updateObject (state,{
       
    initSuccess: true,
    initFail : false,
    listing : action.listing,
    progBarVal : action.progBarVal,
    showAddressForm : action.showAddressForm,
     showPropertyForm : action.showPropertyForm,
     showBookingForm : action.showBookingForm,
     showPhotoForm : action.showPhotoForm, 
     
   })


}

const initJobfail = (state, action) => {
    
    return updateObject (state,{
        initFail: true,
        initSuccess:false,
        errormsg: action.errormsg,
        showAddressForm : true,
        progBarVal: '2%',

    })
 
 
 }




// const unauthRedirectOwner = (state ,action) => {
//     return updateObject (state,{
        
//         unAuthRedirect : action.unAuthRedirect,
    
//     })
// }

const showInit = (state ,action) => {
    return updateObject (state,{
        
        showinit:action.showinit,
        show1stform:false,
        show2ndform:false,
        show3rdform:false,

    })
}
const showJobdesc = (state ,action) => {
    return updateObject (state,{
        
        showinit:false,
        show1stform:action.show1stform,
        show2ndform:false,
        show3rdform:false,
        activeSteps : action.activeSteps, 

    
    })
}
const showJobqual = (state ,action) => {
    return updateObject (state,{
        
        showinit:false,
        show1stform:false,
        show2ndform:action.show2ndform,
        show3rdform:false,
        activeSteps : action.activeSteps,
    
    })
}
const showJobcheckout = (state ,action) => {
    return updateObject (state,{
        
        showinit:false,
        show1stform:false,
        show2ndform:false,
        show3rdform:action.show3rdform,
        activeSteps : action.activeSteps
    
    })
}

const initsubmit = (state ,action) => {
    return updateObject (state,{
    
       company : action.company,
       jobtitle : action.jobtitle,
       address : action.address,
    
    })
}

const continueJobdesc = (state ,action) => {
    return updateObject (state,{
    
       company : action.company,
       jobtitle : action.jobtitle,
       address : action.address,
       jobfunc : action.jobfunc,
       emptype : action.emptype,
       industry : action.industry,
       senlevel : action.senlevel,
       jobdes : action.jobdes,
       recapp : action.recapp,
       source : action.source,
       show1stform : action.show1stform,
       activeSteps : action.activeSteps,
    
    })
}

const continueJobqual = (state ,action) => {
    return updateObject (state,{
       skills : action.skills,
       explevel : action.explevel,
       edulevel : action.edulevel,
       show2ndform : action.show2ndform,
       activeSteps : action.activeSteps,
    
    })
}


const jobPostSuccess = (state ,action) => {
    return updateObject (state,{
       skills : action.skills,
       explevel : action.explevel,
       edulevel : action.edulevel,
       show2ndform : action.show2ndform,
       activeSteps : action.activeSteps,
    
    })
}



const jobPostFail = (state ,action) => {
    return updateObject (state,{
       skills : action.skills,
       explevel : action.explevel,
       edulevel : action.edulevel,
       show2ndform : action.show2ndform,
       activeSteps : action.activeSteps,
    
    })
}

 const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.INIT_JOB_POST_SUCCESS: return initJobsuccess(state, action);
        case actionTypes.INIT_JOB_POST_FAIL: return initJobfail(state, action);
        case actionTypes.SHOW_INIT_JOB: return showInit(state, action);
        case actionTypes.SHOW_JOB_DESC: return showJobdesc(state, action);
        case actionTypes.SHOW_JOB_QUAL: return showJobqual(state, action);
        case actionTypes.SHOW_JOB_CHECKOUT: return showJobcheckout(state, action);
        case actionTypes.SHOW_INIT_JOB_POST: return initsubmit(state,action);
        case actionTypes.POST_JOB_DESC: return continueJobdesc(state,action);
        case actionTypes.POST_JOB_QUAL: return continueJobqual(state,action);
        case actionTypes.POST_JOB_CHECKOUT_SUCCESS : return jobPostSuccess(state, action);
        case actionTypes.POST_JOB_CHECKOUT_FAIL: return jobPostFail(state, action);
        // case actionTypes.POST_JOB_COST_SUCCESS: return unauthRedirectOwner(state, action);
       
        default :   
            return state;
    }
};

export default reducer;
