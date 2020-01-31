import actionTypes from '../../redux/actions/actionTypes'
import _ from 'lodash'

const loginInfo = JSON.parse(window.localStorage.getItem('loginInfo')) ||
                 JSON.parse(window.sessionStorage.getItem('loginInfo'));


const initState = {
  isLoading:false,
  username: loginInfo === null ?  'stranger' : loginInfo.username,
  avatar: loginInfo === null ?    '' : loginInfo.avatar,
  role: loginInfo === null ?      '' : loginInfo.role,
  isLogin: Boolean(loginInfo),
  follows:['000000','000001','111111','444444','555555','666666','777777','999999'],
  blacksheet:['222222','333333'],
  searches:['888888'],
  notifications:[]
}

export default (state=initState,action)=>{
  switch (action.type) {
    //----
    case actionTypes.START_REQUEST:
      return {
        ...state,
        isLoading:true,
      }
      
    case actionTypes.END_REQUEST:
      return {
        ...state,
        isLoading:false
      }
    
    //---------
    case actionTypes.SELECT_FIRM:
      const {searches} = state
      return {
        ...state,
        searches: _.union(searches, [action.payload.stkcd])
      }
    
    //---------
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
    
    //---------
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
    
    //---------
    case actionTypes.START_MARK:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.FINISH_MARK:
      return {
        ...state,
        isLoading: false
      }

    //---------
    case actionTypes.GET_NOTIFICATION:
      return {
        ...state,
        notifications:action.payload
      }

    case actionTypes.MARK_NOTIFICATION:
      const newList = state.notifications.map(item => {
        if (item.id === action.payload.id) {
          item.hasRead = true
        }
        return item
      })
      return {
        ...state,
        notifications: newList
      }

    case actionTypes.MARK_ALL_NOTFICATIONS:
      const newAllList = state.notifications.map(item => {
        if (!item.hasRead) {
          item.hasRead = true
        }
        return item
      })
      return {
        ...state,
        notifications: newAllList
      }
    //-------------------
    case actionTypes.LOGIN:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isLogin: true
      }

    case actionTypes.LOGOUT:
      window.localStorage.removeItem('loginInfo')
      window.sessionStorage.removeItem('loginInfo')
      return {
        ...state,
        username:'stranger',
        avatar:'',
        role:'',
        isLogin: false
      }
    //-----------
    default:
      return state
  }
}