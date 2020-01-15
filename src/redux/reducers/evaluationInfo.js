import actionTypes from "../actions/actionTypes"

const initState = {
    isLoading:false,
    selectFirmCode:'123456',
    selectFirmName:'Virtual公司',
    basicInfo:{},
    relativeEvaInfo:[],
    absoluteEvaInfo:{},
}

export default (state=initState,action)=>{
    switch(action.type){
        case actionTypes.START_REQUEST:
            return {
                ...state,
                isLoading:true
            }
        
        case actionTypes.GET_EVA:
            return {
                ...state,
                basicInfo:action.payload.basicInfo,
                relativeEvaInfo:action.payload.relativeEvaInfo,
                absoluteEvaInfo:action.payload.absoluteEvaInfo,
            }
        case actionTypes.SELECT_FIRM:
            return {
                ...state,
                selectFirmCode:action.payload.stkcd,
                selectFirmName:action.payload.firmName,
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