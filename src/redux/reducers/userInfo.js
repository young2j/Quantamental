import actionTypes from '../../redux/actions/actionTypes'
import _ from 'lodash'

const initState = {
  isLoading:false,
  follows:['000000','111111','222222','333333','444444','555555','666666','777777'],
  searches:['888888']
  // predictInfos:[
  //   {
  //     stkcd: "888888",
  //     name: "增斗必千公司",
  //     stockPriceLastDay: 95.44,
  //     stockPriceNextDay: 74.88,
  //     InDecreasePredict: 94.78,
  //     predictProb: 86.33,
  //     predictStdErr: 0.1300768,
  //   }
  // ],

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

    case actionTypes.END_REQUEST:
      return {
        ...state,
        isLoading:false
      }
  
    default:
      return state
  }
}