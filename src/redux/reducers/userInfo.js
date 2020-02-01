import actionTypes from '../../redux/actions/actionTypes'
import _ from 'lodash'

const loginInfo = JSON.parse(window.localStorage.getItem('loginInfo')) ||
                 JSON.parse(window.sessionStorage.getItem('loginInfo'));


const initState = {
  isLoading:false,
  username: loginInfo === null ?  'stranger' : loginInfo.username,
  avatar: loginInfo === null ?    '' : loginInfo.avatar,
  role: loginInfo === null ?      '' : loginInfo.role,
  password:'******',
  isLogin: Boolean(loginInfo),
  baseInfo:{
    name:'二哈',
    sex:'男',
    city:'成都',
    country:'中国🇨🇳',
    birthday:'2222年2月22日',
    email:'***@example.com',
    phonenumber:'12345678910',
    github:'https://github.com/YangShuangjie/Quantamental'
  },
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
    case actionTypes.SAVE_PROFILE:
      const {username,password,blacksheet,follows,...baseInfo} = action.payload
      
      return {
        ...state,
        baseInfo,
        username, 
        password, 
        blacksheet:state.blacksheet===blacksheet? blacksheet:blacksheet.split(','), //改动了form值就成了字符串而不是数组
        follows: state.follows === follows ? follows : follows.split(','),
      }

    default:
      return state
  }
}