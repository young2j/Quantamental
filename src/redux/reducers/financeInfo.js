import actionTypes from "../actions/actionTypes";

const initState = {
    currentFirmCode: '123456',
    isLoading:false,
    data:[],
    firmCount:5,
}

export default (state=initState,action)=>{
    switch (action.type) {
        case actionTypes.START_REQUEST:
            return {
                ...state,
                isLoading:true
            }
        case actionTypes.SEARCH_FIRM:
            return {
                ...state,
                currentFirmCode:action.payload.stkcd,
                data:action.payload.data
            }
        
        case actionTypes.ADD_FIRM:
            return {
                ...state,
                firmCount:state.firmCount+1,
                data:state.data.concat(action.payload)
            }
        case actionTypes.DELETE_FIRM:
            return {
                ...state,
                firmCount: state.firmCount - 1,
                data:state.data.filter(item=>item.stkcd!==action.payload)
            }

        case actionTypes.END_REQUEST:
            return {
                ...state,
                isLoading:false
            }
        default:
            return state
    }
}