
const initialStore = {
    mingraphjobs : null,
    clicksgraphdata : null,
    savesgraphdata:null,
    tracegraphdata:null,
    selectedCriteria : 'All'

}

const reducer_graph = (state = initialStore, action) => {

    if (action.type === "GET_MINGRAPH_DATA" && action.statusCode == 200)
    {
        return {
            ...state,
            mingraphjobs : action.payload

        }
    }

    if (action.type === "GET_CLICKSGRAPH_DATA" && action.statusCode == 200)
    {
      
        return {
            ...state,
            clicksgraphdata : action.payload
        }
    }

    if (action.type === "GET_SAVESGRAPH_DATA" && action.statusCode == 200)
    {
        
        return {
            ...state,
            savesgraphdata : action.payload
        }
    }

    if (action.type === "GET_TRACEGRAPH_DATA" && action.statusCode == 200)
    {
       
        return {
            ...state,
            tracegraphdata : action.payload

            
        }
    }

     if (action.type === "UPDATE_TRACEGRAPH_CRITERIA")
    {
       
        return {
            ...state,
            selectedCriteria : action.payload

        }
    }

    return state;
}

export default reducer_graph;