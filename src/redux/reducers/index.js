import { combineReducers } from 'redux'

import financeInfo from './financeInfo'
import evaluationInfo from './evaluationInfo'
import qualityInfo from './qualityInfo'
import strategyInfo from './strategyInfo'

export default combineReducers({
    financeInfo,
    evaluationInfo,
    qualityInfo,
    strategyInfo
})


