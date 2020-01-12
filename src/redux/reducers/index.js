import { combineReducers } from 'redux'

import financeInfo from './financeInfo'
import evaluationInfo from './evaluation'

export default combineReducers({
    financeInfo,
    evaluationInfo
})


