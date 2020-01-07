import actionTypes from '../actions/actionTypes'

export default (state=true,action)=>{
    switch (action.type) {
        case actionTypes.HORIZONTAL:
            return !state
        default:
            return state
    }
}
