import { combineReducers } from 'redux'

import financeInfo from './financeInfo'
import evaluationInfo from './evaluationInfo'
import qualityInfo from './qualityInfo'

export default combineReducers({
    financeInfo,
    evaluationInfo,
    qualityInfo
})


