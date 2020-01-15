import actionTypes from './actionTypes'
import { 
    getFinanceInfos,
    getFinanceYearInfos,
    getFinanceYearsInfos,
    getEvaluationInfo,
    getQualityInfo
} from '../../api'

import { message } from 'antd'

//--------------------通用----------------------
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
//==================================Finance=============================================
//-------------------点击横向分析---------------
export const horizontalComparision=()=> dispatch =>{
    dispatch({
        type:actionTypes.HORIZONTAL
    })
}

//-------------------搜索公司------------------
//默认返回搜索公司及所处行业前5家公司信息
export const searchFirm = (stkcd,firmName,startDate,endDate) => async dispatch => {
    dispatch(startRequest())
    //获取横向数据
    const respData = await getFinanceInfos(stkcd, startDate, endDate)

    if (respData.code==="200"){
        const data = respData.data
        dispatch({
                    type:actionTypes.SEARCH_FIRM,
                    payload:{
                            stkcd,
                            firmName,
                            data
                        }
                })
        dispatch(endRequest())
    } else {
        message.error('数据请求失败!')
    }    
}


//-------------------添加可比公司---------------
export const addFirm = (stkcd, startDate, endDate)=>dispatch=>{
    dispatch(startRequest())
    getFinanceYearsInfos(stkcd, startDate, endDate)
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

//-------------------添加时间维度---------------
export const addDate= (stkcd,date)=>dispatch=>{ //实际应该传入当前显示或添加的所有公司代码
    dispatch(startRequest())
    getFinanceYearInfos(stkcd,date)
        .then(resp => {
            if (resp.code === '200') {
                dispatch({
                    type: actionTypes.ADD_DATE,
                    payload: resp.data //1d array
                })
                dispatch(endRequest())
            } else {
                message.error("数据请求错误,添加失败!")
            }
        })
}
//-------------------删除时间维度----------------
export const deleteDate = (stkcd, date) => dispatch => { //实际应该传入当前显示或添加的所有公司代码
    dispatch({
        type: actionTypes.DELETE_DATE,
        stkcd,
        date
    })
}

//-------------------选择时间维度-----------------
export const selectDate = (date)=>dispatch=>{
    dispatch({
        type:actionTypes.SELECT_DATE,
        date
    })
}
//-------------------改变时间范围-----------------
export const changeRange = (stkcd, startDate, endDate)=>dispatch=>{ //实际应该传入当前显示或添加的所有公司代码
    dispatch(startRequest())
    getFinanceYearsInfos(stkcd,startDate,endDate)
        .then(resp => {
            if (resp.code === '200') {
                dispatch({
                    type: actionTypes.CHANGE_RANGE,
                    payload: resp.data[0] //1d array
                })
                dispatch(endRequest())
            } else {
                message.error("数据请求错误,添加失败!")
            }
        })
}

//-------------------删除可比公司-----------------
export const deleteFirm= stkcd=>{
    return dispatch=>{
        dispatch({
            type: actionTypes.DELETE_FIRM,
            payload: stkcd
        })
    }
}


//-------------------关注公司-------------还没实现
export const followFirm=stkcd=>{
    return dispatch=>{
        dispatch({
            type: actionTypes.FOLLOW_FIRM,
            payload: stkcd
        })
    }
}



//------------------选中一家公司------------------
export const selectFirm = (stkcd,firmName) => dispatch=>{
    return dispatch({
        type:actionTypes.SELECT_FIRM,
        payload:{
            stkcd,
            firmName
        }
    })
}


//==================================Evaluation=============================================

export const getEvaInfo = stkcd => dispatch=>{
    dispatch(startRequest())
    getEvaluationInfo(stkcd)
    .then(resp=>{
        if(resp.code==='200'){
            dispatch({
                type:actionTypes.GET_EVA,
                payload:{
                    basicInfo:resp.basicInfo,
                    relativeEvaInfo: resp.relativeEvaInfo,
                    absoluteEvaInfo: resp.absoluteEvaInfo,
                }
            })
        } else{
            message.error("数据请求失败!")
        }
        dispatch(endRequest())
    })

}

//=================================Quality===================================================
export const getQuaInfo = stkcd=>dispatch=>{
    dispatch(startRequest())
    getQualityInfo(stkcd)
    .then(resp=>{
        if (resp.code==="200"){
            dispatch({
                type:actionTypes.GET_QUA,
                payload: resp
                // {
                //     profitQualityInfo:resp.profitQualityInfo,
                //     operationQualityInfo:resp.operationQualityInfo,
                //     earningsQualityInfo: resp.earningsQualityInfo,
                //     RDQualityInfo: resp.RD
                // }
            })
        } else {
            message.error("数据请求失败!")
        }
        dispatch(endRequest())
    })
}