import { combineReducers } from 'redux'

import financeInfo from './financeInfo'
import evaluationInfo from './evaluationInfo'
import qualityInfo from './qualityInfo'
import strategyInfo from './strategy'

export default combineReducers({
    financeInfo,
    evaluationInfo,
    qualityInfo,
    strategyInfo
})


