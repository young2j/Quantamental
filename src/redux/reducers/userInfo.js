import actionTypes from '../../redux/actions/actionTypes'
import _ from 'lodash'

const initState = {
  isLoading:false,
  follows:['000000','000001','111111','444444','555555','666666','777777','999999'],
  blacksheet:['222222','333333'],
  searches:['888888'],
}

export default (state=initState,action)=>{
  switch (action.type) {
    case actionTypes.START_REQUEST:
      return {
        ...state,
        isLoading:true,
      }
    
    case actionTypes.SELECT_FIRM:
      const {searches} = state
      return {
        ...state,
        searches: _.union(searches, [action.payload.stkcd])
      }
    
    case actionTypes.ADD_BLACKSHEET:
      return {
        ...state,
        blacksheet:[
          ...state.blacksheet,
          action.payload
        ]
      }
    case actionTypes.DELETE_BLACKSHEET:
      return {
        ...state,
        blacksheet:state.blacksheet.filter(item=>item!==action.payload)
      }  

    case actionTypes.ADD_MYFOLLOWS:
      return {
        ...state,
        follows:[
          ...state.follows,
          action.payload
        ]
      }
    case actionTypes.DELETE_MYFOLLOWS:
      return {
        ...state,
        follows:state.follows.filter(item=>item!==action.payload)
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