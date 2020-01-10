//获取数据处理dataSource
//return:
// {
//     profitDataSource:[
//       {
//         date,
//         profit:[{stkcd1,roe1,...},{stkcd2,roe2,...}],
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
        return firm.profit.map(obj=>{
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

    const profitDataSource = profitRes.map(arr => {
        return {
            date: arr[0].date || '2019-12-31',
            profit: arr.map(obj => {
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
    //-------------------
    let operationData = respData.map(firm => {
        return firm.operation.map(obj=>{
            return {
                stkcd:firm.stkcd,
                ...obj
            }
        })
    })

    let operationRes = []
    arrForLength = operationData[0] ? operationData[0]:[]
    for(let i=0;i<arrForLength.length;i++){
        operationRes.push(operationData.map(arr=>arr[i]))
    }
    const operationDataSource = operationRes.map(arr => {
        return {
            date: arr[0].date,
            operation: arr.map(obj => {
                const { date, ...rest } = obj
                return {
                    ...rest
                }
            })
        }
    })
    //-------------------
    let growthData = respData.map(firm => {
        return firm.growth.map(obj=>{
            return {
                stkcd:firm.stkcd,
                ...obj
            }
        })
    })

    let growthRes = []
    arrForLength = growthData[0] ? growthData[0]:[]
    for(let i=0;i<arrForLength.length;i++){
        growthRes.push(growthData.map(arr=>arr[i]))
    }
    const growthDataSource = growthRes.map(arr => {
        return {
            date: arr[0].date,
            growth: arr.map(obj => {
                const { date, ...rest } = obj
                return {
                    ...rest
                }
            })
        }
    })
    //-------------------
    let cashData = respData.map(firm => {
        return firm.cash.map(obj=>{
            return {
                stkcd:firm.stkcd,
                ...obj
            }
        })
    })

    let cashRes = []
    arrForLength = cashData[0] ? cashData[0]:[]
    for(let i=0;i<arrForLength.length;i++){
        cashRes.push(cashData.map(arr=>arr[i]))
    }
    const cashDataSource = cashRes.map(arr => {
        return {
            date: arr[0].date,
            cash: arr.map(obj => {
                const { date, ...rest } = obj
                return {
                    ...rest
                }
            })
        }
    })
    //-------------------
    let marketData = respData.map(firm => {
        return firm.market.map(obj=>{
            return {
                stkcd:firm.stkcd,
                ...obj
            }
        })
    })

    let marketRes = []
    arrForLength = marketData[0] ? marketData[0]:[]
    for(let i=0;i<arrForLength.length;i++){
        marketRes.push(marketData.map(arr=>arr[i]))
    }
    const marketDataSource = marketRes.map(arr => {
        return {
            date: arr[0].date,
            market: arr.map(obj => {
                const { date, ...rest } = obj
                return {
                    ...rest
                }
            })
        }
    })

    return {
        profitDataSource,
        solvencyDataSource,
        operationDataSource,
        growthDataSource,
        cashDataSource,
        marketDataSource,
    }
}


//处理纵向分析数据 
//return:
// {
//     profitDataSource:[
//       {
//         stkcd,
//         profit:[{date1,roe1,...},{date2,roe2,...}],
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
        return firm.profit.map(obj => {
            return {
                stkcd: firm.stkcd,
                ...obj
            }
        })
    })

    const profitDataSource = profitData.map(arr => {
        return {
            stkcd: arr[0]? arr[0].stkcd:'123456',
            profit: arr.map(obj => {
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
    //-------------------
    let operationData = respData.map(firm => {
        return firm.operation.map(obj => {
            return {
                stkcd: firm.stkcd,
                ...obj
            }
        })
    })

    const operationDataSource = operationData.map(arr => {
        return {
            stkcd: arr[0] ? arr[0].stkcd : '123456',
            operation: arr.map(obj => {
                const { stkcd, ...rest } = obj
                return {
                    ...rest
                }
            })
        }
    })
    //-------------------
    let growthData = respData.map(firm => {
        return firm.growth.map(obj => {
            return {
                stkcd: firm.stkcd,
                ...obj
            }
        })
    })

    const growthDataSource = growthData.map(arr => {
        return {
            stkcd: arr[0] ? arr[0].stkcd : '123456',
            growth: arr.map(obj => {
                const { stkcd, ...rest } = obj
                return {
                    ...rest
                }
            })
        }
    })
    //-------------------
    let cashData = respData.map(firm => {
        return firm.cash.map(obj => {
            return {
                stkcd: firm.stkcd,
                ...obj
            }
        })
    })

    const cashDataSource = cashData.map(arr => {
        return {
            stkcd: arr[0] ? arr[0].stkcd : '123456',
            cash: arr.map(obj => {
                const { stkcd, ...rest } = obj
                return {
                    ...rest
                }
            })
        }
    })
    //-------------------
    let marketData = respData.map(firm => {
        return firm.market.map(obj => {
            return {
                stkcd: firm.stkcd,
                ...obj
            }
        })
    })

    const marketDataSource = marketData.map(arr => {
        return {
            stkcd: arr[0] ? arr[0].stkcd : '123456',
            market: arr.map(obj => {
                const { stkcd, ...rest } = obj
                return {
                    ...rest
                }
            })
        }
    })

    return {
        profitDataSource,
        solvencyDataSource,
        operationDataSource,
        growthDataSource,
        cashDataSource,
        marketDataSource
    }
}