import actionTypes from './actionTypes'
import { getFinancialData,getFinancialsData } from '../../api'
import { message } from 'antd'

//====================通用==============
const startRequest = () => {
    return {
        type: actionTypes.START_REQUEST
    }
}
const endRequest = () => {
    return {
        type: actionTypes.END_REQUEST
    }
}

//-------------点击横向分析-------------
export const horizontalComparision=()=> dispatch =>{
    dispatch({
        type:actionTypes.HORIZONTAL
    })
}

//----------搜索公司-------------
//默认返回搜索公司及所处行业前5家公司信息
export const searchFirm= stkcd => dispatch => {
    dispatch(startRequest())
    getFinancialsData(stkcd) //这里实际需要提供stkcd
    .then(resp=>{        
            if(resp.code==="200"){
                dispatch({
                    type:actionTypes.SEARCH_FIRM,
                    payload:{
                        stkcd,
                        data:resp.data
                    }
                })
                dispatch(endRequest())
            } else{
                message.error('数据请求失败!')
            }
        }
    )
}

//------------添加可比公司--------------
export const addFirm=stkcd=>dispatch=>{
    dispatch(startRequest())
    // stkcd? getFinancialData(stkcd):getFinancialData() 这里根据是否提供stkcd确定是默认添加还是指定添加
    getFinancialData(stkcd)
    .then(resp=>{
        if(resp.code==='200'){
            dispatch({
                type:actionTypes.ADD_FIRM,
                payload:resp.data //1d array
            })
            dispatch(endRequest())
        }else{
            message.error("数据请求错误,添加失败!")
        }
    })
}
//-------------删除可比公司---------------
const deleteFirmSync = (stkcd)=>{
    return {
        type: actionTypes.DELETE_FIRM,
        payload: stkcd
    }
}
export const deleteFirm= stkcd=>{
    return dispatch=>{
        dispatch(deleteFirmSync(stkcd))
    }
}

//---------------关注公司-------------
const followFirmSync = (stkcd)=>{
    return {
        type:actionTypes.FOLLOW_FIRM,
        payload:stkcd
    }
}
export const followFirm=stkcd=>{
    return dispatch=>{
        dispatch(followFirmSync(stkcd))
    }
}