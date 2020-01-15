import actionTypes from '../actions/actionTypes'

const initState = {
    isLoading:false,
    selectFirmCode:'123456',
    selectFirmName:'666公司',
    profitQualityInfo:{
        ROC_8years:
            [{ date: "2010-12-31", value: 58.45 },
            { date: "2011-12-31", value: 41.14 },
            { date: "2012-12-31", value: 78.12 },
            { date: "2013-12-31", value: 43.65 },
            { date: "2014-12-31", value: 95.47 },
            { date: "2015-12-31", value: 95.96 },
            { date: "2016-12-31", value: 32.53 },
            { date: "2017-12-31", value: 65.52 },
            { date: "2018-12-31", value: 7.16 },
            { date: "2019-12-31", value: 9.76 }],

        ROA_8years:
            [{ date: "2010-12-31", value: 56.45 },
            { date: "2011-12-31", value: 82.87 },
            { date: "2012-12-31", value: 86.86 },
            { date: "2013-12-31", value: 19.86 },
            { date: "2014-12-31", value: 79.08 },
            { date: "2015-12-31", value: 89.53 },
            { date: "2016-12-31", value: 89.49 },
            { date: "2017-12-31", value: 45.33 },
            { date: "2018-12-31", value: 39.12 },
            { date: "2019-12-31", value: 74.55 }],

        MS:
            [{ date: "2010-12-31", value: 35.09 },
            { date: "2011-12-31", value: 52.13 },
            { date: "2012-12-31", value: 2.82 },
            { date: "2013-12-31", value: 83.12 },
            { date: "2014-12-31", value: 76.48 },
            { date: "2015-12-31", value: 47.24 },
            { date: "2016-12-31", value: 65.97 },
            { date: "2017-12-31", value: 88.56 },
            { date: "2018-12-31", value: 17.18 },
            { date: "2019-12-31", value: 94.38 }],

        MG:
            [{ date: "2010-12-31", value: 4.75 },
            { date: "2011-12-31", value: 46.48 },
            { date: "2012-12-31", value: 29.58 },
            { date: "2013-12-31", value: 9.49 },
            { date: "2014-12-31", value: 3.44 },
            { date: "2015-12-31", value: 93.63 },
            { date: "2016-12-31", value: 3.16 },
            { date: "2017-12-31", value: 75.51 },
            { date: "2018-12-31", value: 52.14 },
            { date: "2019-12-31", value: 65.48 }]
    },
    operationQualityInfo:{},
    earningsQualityInfo: {
        accruals: {
            Jones: {
                TA: 198.55,
                NA: 70.13,
                DA: 128.42,
            },
            ModifyJones: {
                TA: 20,
                NA: 89.44,
                DA: -69.44,
            },
            performanceMatch: {
                TA: 146.46,
                NA: 80.13,
                DA: 66.33,
            },
        },
        Mscore: 24,
        Dilemma:{
            Oscore:1.81,
            Zscore:2.99,
            Cscore:80,
        }
    },
    RDQualityInfo:{},
    basicInfo:{}
}

export default (state=initState,action)=>{
    switch(action.type){
        case actionTypes.START_REQUEST:
            return {
                ...state,
                isLoading:true
            }
        
        case actionTypes.GET_QUA:
            return {
                ...state,
                // profitQualityInfo:action.payload.profitQualityInfo,
                // operationQualityInfo:action.payload.operationQualityInfo,
                // earningsQualityInfo:action.payload.earningsQualityInfo,
                // RDQualityInfo:action.payload.RDQualityInfo,
                ...action.payload
            }
        case actionTypes.SELECT_FIRM:
            return {
                ...state,
                selectFirmCode: action.payload.stkcd,
                selectFirmName: action.payload.firmName,
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