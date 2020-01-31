import actionTypes from './actionTypes'
import {
    getFinanceInfos,
    getFinanceYearInfos,
    getFinanceYearsInfos,
    getEvaluationInfo,
    getQualityInfo,
    getNotifications,
    loginVerify
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
export const horizontalComparision = () => dispatch => {
    dispatch({
        type: actionTypes.HORIZONTAL
    })
}

//-------------------搜索公司------------------
//默认返回搜索公司及所处行业前5家公司信息
export const searchFirm = (stkcd, firmName, startDate, endDate) => async dispatch => {
    dispatch(startRequest())
    //获取横向数据
    const respData = await getFinanceInfos(stkcd, startDate, endDate)

    if (respData.code === "200") {
        const data = respData.data
        dispatch({
            type: actionTypes.SEARCH_FIRM,
            payload: {
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
export const addFirm = (stkcd, startDate, endDate) => dispatch => {
    dispatch(startRequest())
    getFinanceYearsInfos(stkcd, startDate, endDate)
        .then(resp => {
            if (resp.code === '200') {
                dispatch({
                    type: actionTypes.ADD_FIRM,
                    payload: resp.data //1d array
                })
                dispatch(endRequest())
            } else {
                message.error("数据请求错误,添加失败!")
            }
        })
}

//-------------------添加时间维度---------------
export const addDate = (stkcd, date) => dispatch => { //实际应该传入当前显示或添加的所有公司代码
    dispatch(startRequest())
    getFinanceYearInfos(stkcd, date)
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
export const selectDate = (date) => dispatch => {
    dispatch({
        type: actionTypes.SELECT_DATE,
        date
    })
}
//-------------------改变时间范围-----------------
export const changeRange = (stkcd, startDate, endDate) => dispatch => { //实际应该传入当前显示或添加的所有公司代码
    dispatch(startRequest())
    getFinanceYearsInfos(stkcd, startDate, endDate)
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
export const deleteFirm = stkcd => {
    return dispatch => {
        dispatch({
            type: actionTypes.DELETE_FIRM,
            payload: stkcd
        })
    }
}


//------------------选中一家公司------------------
export const selectFirm = (stkcd, firmName) => dispatch => {
    return dispatch({
        type: actionTypes.SELECT_FIRM,
        payload: {
            stkcd,
            firmName
        }
    })
}


//-------------------关注/取关公司-------------
export const followFirm = stkcd => {
    return dispatch => {
        dispatch({
            type: actionTypes.ADD_MYFOLLOWS,
            payload: stkcd
        })
    }
}
export const notfollowFirm = stkcd => {
    return dispatch => {
        dispatch({
            type: actionTypes.DELETE_MYFOLLOWS,
            payload: stkcd
        })
    }
}
//-------------------添加/删除黑名单公司-------------
export const addBlackSheet = stkcd => {
    return dispatch => {
        dispatch({
            type: actionTypes.ADD_BLACKSHEET,
            payload: stkcd
        })
    }
}
export const deleteBlackSheet = stkcd => {
    return dispatch => {
        dispatch({
            type: actionTypes.DELETE_BLACKSHEET,
            payload: stkcd
        })
    }
}
//==================================Evaluation=============================================

export const getEvaInfo = stkcd => dispatch => {
    dispatch(startRequest())
    getEvaluationInfo(stkcd)
        .then(resp => {
            if (resp.code === '200') {
                dispatch({
                    type: actionTypes.GET_EVA,
                    payload: {
                        basicInfo: resp.basicInfo,
                        relativeEvaInfo: resp.relativeEvaInfo,
                        absoluteEvaInfo: resp.absoluteEvaInfo,
                    }
                })
            } else {
                message.error("数据请求失败!")
            }
            dispatch(endRequest())
        })

}

//=================================Quality===================================================
export const getQuaInfo = stkcd => dispatch => {
    dispatch(startRequest())
    getQualityInfo(stkcd)
        .then(resp => {
            if (resp.code === "200") {
                dispatch({
                    type: actionTypes.GET_QUA,
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


//=================================Strategy==================================================
export const selectSamplePeriod = (startDate, endDate) => dispatch => {
    dispatch({
        type: actionTypes.SELECT_SAMPLE_PERIOD,
        payload: {
            startDate,
            endDate
        }
    })
}

export const deleteMyPortfolio = (key) => dispatch => {
    dispatch({
        type: actionTypes.DELETE_MYPORTFOLIO,
        payload: key
    })
}
// export const deleteMyFollows = (key)=>dispatch=>{
//     dispatch({
//         type:actionTypes.DELETE_MYFOLLOWS,
//         payload:key
//     })
// }
export const saveMyPortfolio = (portfolio, firmCodes) => dispatch => { //当前还未处理组合的公司代码
    dispatch({
        type: actionTypes.SAVE_MYPORTFOLIO,
        payload: {
            portfolio
        }
    })
}

export const mergeFactors = (columns, dataSource, index) => dispatch => {
    dispatch({
        type: actionTypes.MERGE_FACTORS,
        payload: {
            columns,
            dataSource,
            index
        }
    })
}

export const addColumns = () => dispatch => {
    dispatch({
        type: actionTypes.ADD_COLUMNS
    })
}

export const deleteColumns = (index) => dispatch => {
    dispatch({
        type: actionTypes.DELETE_COLUMNS,
        payload: {
            index
        }
    })
}

export const saveUniverse = (universeData) => dispatch => {
    dispatch({
        type: actionTypes.SAVE_UNIVERSE,
        payload: universeData
    })
}

export const toComputeCorr = data => dispatch => {
    dispatch({
        type: actionTypes.COMPUTE_CORR,
        payload: data //通过检验的因子数据
    })
}

export const toComputeScore = data => dispatch => {
    dispatch({
        type: actionTypes.COMPUTE_SCORE,
        payload: data //剔除冗余后的因子数据
    })
}



//========================StockPredict===================
//查看某个公司预测信息
//直接使用selectFirm


//========================User============================
//----------notification---------------
export const getNotificationList = () => dispatch => {
    dispatch(startRequest())
    getNotifications()
        .then(resp => {
            dispatch({
                type: actionTypes.GET_NOTIFICATION,
                payload: resp.data
            })
        })
        .catch(err => message.error('请求失败!'))
        .finally(
            () => dispatch(endRequest())
        )
}


const startMark = () => {
    return {
        type: actionTypes.START_MARK
    }
}

const finishMark = () => {
    return {
        type: actionTypes.FINISH_MARK
    }
}


export const markNotification = id => dispatch => {
    dispatch(startMark())
    setTimeout(
        () => {
            dispatch({
                type: actionTypes.MARK_NOTIFICATION,
                payload: {
                    id
                }
            })
            dispatch(finishMark())
        }, 1000)
}


export const markAllNotification = () => dispatch => {
    dispatch(startMark())
    setTimeout(
        () => {
            dispatch({
                type: actionTypes.MARK_ALL_NOTFICATIONS,
            })
            dispatch(finishMark())
        }, 1000)
}

//----------login/logout-----------------

const clearLoginInfo = () => {
    window.localStorage.removeItem('loginInfo')
    window.sessionStorage.removeItem('loginInfo')

    return {
            type: actionTypes.LOGOUT
        }
}

export const logout = ()=>dispatch=>{
    dispatch(
        clearLoginInfo()
    )
}



export const login = (loginInfo) => dispatch => {
    dispatch(startRequest())
    loginVerify(loginInfo)
        .then(resp => {
            if (resp.code === '200') {
                if (loginInfo.remember) {
                    window.localStorage.setItem('loginInfo', JSON.stringify(resp.data))
                } else {
                    window.sessionStorage.setItem('loginInfo', JSON.stringify(resp.data))
                }
                dispatch({
                    type: actionTypes.LOGIN,
                    payload: resp.data
                })
            } else {
                dispatch(logout())
                message.error('登录失败!')
            }
        })

}
