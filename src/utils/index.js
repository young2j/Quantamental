//获取数据处理dataSource
//return:
// {
//     profitabilityDataSource:[
//       {
//         date,
//         profitability:[{stkcd1,roe1,...},{stkcd2,roe2,...}],
//       },
//       {},
//       ...
//     ],
//     solvencyDataSource:[
//         {
//             date,
//             solvency:[{},{},...]
//         },
//         {},
//         ...
//     ],
//     ...
// }
export const handleDataSource = (respData) => {
    //---------------
    let profitData = respData.map(firm => {
        return firm.profitability.map(obj=>{
            return {
                stkcd:firm.stkcd+` ${firm.name}`,
                ...obj
            }
        })
    })

    let profitRes = []
    let arrForLength = profitData[0] ? profitData[0]:[]
    for(let i=0;i<arrForLength.length;i++){
        profitRes.push(profitData.map(arr=>arr[i]))
    }

    const profitabilityDataSource = profitRes.map(arr => {
        return {
            date: arr[0].date || '2019-12-31',
            profitability: arr.map(obj => {
                const { date, ...rest } = obj
                return {
                    ...rest
                }
            })
        }
    })

    //-------------------
    let solvencyData = respData.map(firm => {
        return firm.solvency.map(obj=>{
            return {
                stkcd:firm.stkcd,
                ...obj
            }
        })
    })

    let solvencyRes = []
    arrForLength = solvencyData[0] ? solvencyData[0]:[]
    for(let i=0;i<arrForLength.length;i++){
        solvencyRes.push(solvencyData.map(arr=>arr[i]))
    }
    const solvencyDataSource = solvencyRes.map(arr => {
        return {
            date: arr[0].date,
            solvency: arr.map(obj => {
                const { date, ...rest } = obj
                return {
                    ...rest
                }
            })
        }
    })

    return {
        profitabilityDataSource,
        solvencyDataSource
    }
}


//处理纵向分析数据 
//return:
// {
//     profitabilityDataSource:[
//       {
//         stkcd,
//         profitability:[{date1,roe1,...},{date2,roe2,...}],
//       },
//       {},
//       ...
//     ],
//     solvencyDataSource:[
//         {
//             stkcd,
//             solvency:[{},{},...]
//         },
//         {},
//         ...
//     ],
//     ...
// }
export const handleTimeDataSource = (respData) => {
    //---------------
    let profitData = respData.map(firm => {
        return firm.profitability.map(obj => {
            return {
                stkcd: firm.stkcd,
                ...obj
            }
        })
    })

    const profitabilityDataSource = profitData.map(arr => {
        return {
            stkcd: arr[0]? arr[0].stkcd:'123456',
            profitability: arr.map(obj => {
                const { stkcd, ...rest } = obj
                return {
                    ...rest
                }
            })
        }
    })

    //-------------------
    let solvencyData = respData.map(firm => {
        return firm.solvency.map(obj => {
            return {
                stkcd: firm.stkcd,
                ...obj
            }
        })
    })

    const solvencyDataSource = solvencyData.map(arr => {
        return {
            stkcd: arr[0] ? arr[0].stkcd : '123456',
            solvency: arr.map(obj => {
                const { stkcd, ...rest } = obj
                return {
                    ...rest
                }
            })
        }
    })

    return {
        profitabilityDataSource,
        solvencyDataSource
    }
}