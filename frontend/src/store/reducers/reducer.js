
const initialStore = {
    uploadedResume: null
}

const reducer = (state = initialStore, action) => {
    
    if (action.type === "UPLOADRESUME") {

        return {
            ...state,
            uploadedResume: action.payload,
        }
    }

    return state;
}

export default reducer;