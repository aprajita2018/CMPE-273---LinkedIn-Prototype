
const initialStore = {
    image : null,
    name: null,
    education: null,
    headline: null,
    experience: null,
    location: null,
    current_position: null,
    industry: null,
    contact: null,
    education_id : null,
    edit_edu_id : null,
    edit_edu_school : null,
    edit_edu_degree : null,
    edit_edu_field : null,
    edit_edu_fromYear : null,
    edit_edu_toYear : null,
    edit_exp_id : null,
    edit_exp_title : null,
    edit_exp_company : null,
    edit_exp_location : null,
    edit_exp_fromYear : null,
    edit_exp_toYear : null,
    edit_exp_fromMonth : null,
    edit_exp_toMonth : null,

    modal_contact: false,
    modal_add_education: false,
    modal_add_experience: false,
    modal_edit_intro: false,
    modal_edit_education: false,
    modal_edit_experience: false,

    updated: false
}

const reducer_profile = (state = initialStore, action) => {

    if (action.type === "GETPROFILE" && action.statusCode == 200) {
        console.log("Enterting Reducer_Profile");
        return {
            ...state,
            image : action.payload.image, 
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            education: action.payload.education,
            headline: action.payload.headline,
            experience: action.payload.experience,
            location: action.payload.location,
            current_position: action.payload.current_position,
            industry: action.payload.industry,
            contact: action.payload.contact,
            updated: false

        }
    }

    if (action.type === "GETPROFILE_EXPERIENCE" && action.statusCode == 200) {
            console.log(action.payload.experience);
        return {
            ...state,
            experience: action.payload.experience,
            updated: false
        }
    }

    if (action.type === "GETPROFILE_EDUCATION" && action.statusCode == 200) {

        return {
            ...state,
            education: action.payload.education,
            updated: false
        }
    }


    if (action.type === "ADDEDUCATION" && action.payload == "Updated") {
        console.log("Updating State");
        return {
            ...state,
            updated: true

        }
    }

    if (action.type === "ADDEXPERIENCE" && action.payload == "Updated") {
        console.log("Updating State");
        return {
            ...state,
            updated: true

        }
    }


    if (action.type === "EDITINTRO" && action.payload.updated == true) {
        var image, firstName, lastName, headline, location, current_position, industry, contact;
        if(action.payload.image)
            image = action.payload.image; 
        if (action.payload.firstName)
            firstName = action.payload.firstName;
        else
            firstName = state.firstName;

        if (action.payload.lastName)
            lastName = action.payload.lastName;
        else
            lastName = state.lastName;

        if (action.payload.headline)
            headline = action.payload.headline;
        else
            headline = state.headline;

        if (action.payload.location)
            location = action.payload.location;
        else
            location = state.location;

        if (action.payload.current_position)
            current_position = action.payload.current_position;
        else
            current_position = state.current_position;

        if (action.payload.industry)
            industry = action.payload.industry;
        else
            industry = state.industry;

        if (action.payload.contact)
            contact = action.payload.contact;
        else
            contact = state.contact;
        return {
            ...state,
            image : image, 
            firstName: firstName,
            lastName: lastName,
            headline: headline,
            location: location,
            current_position: current_position,
            industry: industry,
            contact: contact,
        }
    }


    if (action.type === "EDITEDUCATION" && action.payload == "Updated") {
        return {
            ...state,
            updated: true
        }
       /* var school, degree, field, fromYear, toYear;
        if (action.payload.school)
            school = action.payload.school;
        else
            school = state.school;

        if (action.payload.degree)
            degree = action.payload.degree;
        else
            degree = state.degree;

        if (action.payload.field)
            field = action.payload.field;
        else
            field = state.field;

        if (action.payload.fromYear)
            fromYear = action.payload.fromYear;
        else
            fromYear = state.fromYear;

        if (action.payload.toYear)
            toYear = action.payload.toYear;
        else
            toYear = state.toYear;

        return {
            ...state,
            school: school,
            degree: degree,
            field: field,
            fromYear: fromYear,
            toYear: toYear
        }*/
    }


    if (action.type === "EDITEXPERIENCE" && action.payload == "Updated") {
        return {
            ...state,
            updated: true
        }
    }

    if (action.type === "DELETE_EDUCATION" && action.payload == "Deleted") {
        return {
            ...state,
            updated: true
        }
    }
    if (action.type === "DELETE_EXPERIENCE" && action.payload == "Deleted") {
        return {
            ...state,
            updated: true
        }
    }
    if (action.type === "POSTPROFILE" && action.payload == "Updated") {

        return {
            ...state,
            updated: true

        }
    }

    if (action.type === "EDITEDUCATION_ID") {

        return {
            ...state,
            education_id: action.payload
        }
    }


    if (action.type === "EDITEDUCATION_VALUES") {
        console.log("Setting State");
        console.log(action.payload);
        console.log(action.payload.toYear);
        
        return {
            ...state,
            edit_edu_id : action.payload._id,
            edit_edu_school : action.payload.school,
            edit_edu_degree : action.payload.degree,
            edit_edu_field : action.payload.field,
            edit_edu_fromYear : action.payload.fromYear,
            edit_edu_toYear : action.payload.toYear
        }
    }
    if (action.type === "EDITEXPERIENCE_VALUES") {
        console.log("Setting State");
        console.log(action.payload);
        console.log(action.payload.toYear);
        
        return {
            ...state,
            edit_exp_id : action.payload._id,
            edit_exp_title : action.payload.title,
            edit_exp_location : action.payload.location,
            edit_exp_fromMonth : action.payload.edit_exp_fromMonth,
            edit_exp_fromYear : action.payload.fromYear,
            edit_exp_toMonth : action.payload.toMonth,
            edit_exp_toYear : action.payload.toYear
        }
    }
    if (action.type === "RESETUPDATED") {

        return {
            ...state,
            updated: false
        }
    }

    if (action.type === "LOGOUT") {
        return {
            ...state,
            name: null,
            phone: null,
            aboutme: null,
            city: null,
            country: null,
            company: null,
            school: null,
            hometown: null,
            languages: null,
            gender: null,
            updated: false
        }
    }

   if(action.type === "TOGGLE_CONTACT")
   {
       console.log("Toggle Contact RP");
       return{
           ...state,
         modal_contact: !state.modal_contact
       }
    }

      if(action.type === "TOGGLE_ADD_EDUCATION")
   {
       return{
           ...state,
         modal_add_education: !state.modal_add_education
       }
    }

    if(action.type === "TOGGLE_ADD_EXPERIENCE")
    {
        return{
            ...state,
          modal_add_experience: !state.modal_add_experience
        }
     }

     if(action.type === "TOGGLE_EDIT_INTRO")
     {
         return{
             ...state,
           modal_edit_intro: !state.modal_edit_intro
         }
      }

      if(action.type === "TOGGLE_EDIT_EDUCATION")
      {
          return{
              ...state,
            modal_edit_education: !state.modal_edit_education
          }
       }
   

       if(action.type === "TOGGLE_EDIT_EXPERIENCE")
       {
           return{
               ...state,
             modal_edit_experience: !state.modal_edit_experience
           }
        }

        if(action.type === "UPLOADIMAGE" ){
  
            return {
                ...state,
                image : action.payload
            
            }
        }


    return state;
}

export default reducer_profile;