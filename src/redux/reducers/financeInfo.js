import actionTypes from "../actions/actionTypes";

const initState = {
    isLoading:false,
    horizontal:true,
    firmCount:5,
    currentFirmCode: '111111',
    currentFirmName:'Virtual公司',
    currentDate:'2019-12-31',
    selectFirmCode:'111111',
    selectFirmName:'牛XX公司',
    data: [
        {
            profit: [
            {
                roe: 61.17,
                roa: 25.14,
                gpm: 13.92,
                opm: 46.49,
                npm: 68.83,
                date: "2019-12-31"
            },
        ],
            solvency: [
            {
                currentRatio: 17.83,
                quickRatio: 97.68,
                cashRatio: 30.79,
                debtRatio: 23.23,
                equityRatio: 23.48,
                interestCRatio: 59.85,
                date: "2019-12-31"
            },
        ],
            operation:[ 
            {
                invTnover: "存货周转率",
                accRecTnover: "应收账款周转率",
                taTnover: "总资产周转率",
                faTnover: "固定资产周转率",
                operate: "操作",
                date: "2019-12-31"
            }
        ],
            growth:[ 
            {
                netProfitGrate: "净利润增长率",
                salesGrate: "收入增长率",
                taGrate: "总资产增长率",
                faTaRatio: "固定资产占比",
                operate: '操作',
                date: "2019-12-31"
            }
        ],
            cash:[ 
            {
                netCashPerSale: "单位销售收入净现金流入",
                debtProtecRatio: "债务保障率",
                foCashRatio: "自由现金流与经营活动净现金流比",
                operate: "操作",
                date: "2019-12-31"
            }
        ],
            market:[ 
            {
                eps: "每股收益",
                peRatio: "市盈率",
                pbRatio: "市净率",
                psRatio: "市销率",
                operate: "操作",
                date: "2019-12-31"
            }
        ],           
            stkcd: "051647",
            name: "级个阶根写公司"
        }
    ],
}

export default (state=initState,action)=>{
    switch (action.type) {
        case actionTypes.HORIZONTAL:
            return {
                ...state,
                horizontal: !state.horizontal
            }

        case actionTypes.START_REQUEST:
            return {
                ...state,
                isLoading:true
            }
        case actionTypes.SEARCH_FIRM:
            return {
                ...state,
                currentFirmCode:action.payload.stkcd,
                currentFirmName:action.payload.firmName,
                data:action.payload.data,
            }

        case actionTypes.ADD_FIRM:
            return {
                ...state,
                firmCount:state.firmCount+1,
                data:state.data.concat(action.payload)
            }
        case actionTypes.ADD_DATE:
            const addDateData = state.data.map((obj,index)=>{
                return {
                    ...obj,
                    profit:obj["profit"].concat(action.payload[index]["profit"]),
                    solvency:obj["solvency"].concat(action.payload[index]["solvency"])
                }
            })
            return {
                ...state,
                data:addDateData
            }
        
        case actionTypes.DELETE_DATE:
            const deleteDateData = state.data.map(obj => {
                return {
                    ...obj,
                    profit: obj["profit"].filter(item=>item.date!==action.date),
                    solvency: obj["solvency"].filter(item=>item.date!==action.date)
                }
            })
            return {
                ...state,
                data:deleteDateData
            }
        case actionTypes.SELECT_DATE:
            return {
                ...state,
                currentDate:action.date
            }
        
        case actionTypes.CHANGE_RANGE:
            // const changeRangeData = state.data.filter(obj=>obj.stkcd!==state.selectFirmCode) //mock数据返回的stkcd随机，暂时采用下行，之后换回来
            const changeRangeData = state.data.filter(obj=>obj.stkcd!=='555555')
            changeRangeData.push(action.payload)
            return {
                    ...state,
                    data:changeRangeData
                }

        case actionTypes.DELETE_FIRM:
            return {
                ...state,
                firmCount: state.firmCount - 1,
                data:state.data.filter(item=>item.stkcd!==action.payload)
            }
        
        case actionTypes.SELECT_FIRM:
            return {
                ...state,
                selectFirmCode:action.payload.stkcd,
                selectFirmName:action.payload.firmName
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