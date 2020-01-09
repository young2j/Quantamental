const axios =require('axios')
const moment=require('moment')


const service = axios.create({
    baseURL:  'http://rap2api.taobao.org/app/mock/236247' 
})

let endDt = moment().subtract(1, 'y').endOf('y') //2019-12-31
let startDt = endDt.subtract(4, 'y') //2015-12-31
const getFinanceInfos = (stkcd, startDate, endDate) => {
    return service.get('/fundamental/finance-infos', {
        params: {
            stkcd: stkcd || '123456',
            startDate: startDate || startDt.format('YYYY-MM-DD'),
            endDate: endDate || endDt.format('YYYY-MM-DD')
        }
    })
}

const handleDataSource = (respData) => {
    //---------------
    let profitData = respData.map(firm => {
        return firm.profitability.map(obj => {
            return {
                stkcd: firm.stkcd,
                ...obj
            }
        })
    })

    let profitRes = []
    let arrForLength = profitData[0] ? profitData[0] : []
    for (let i = 0; i < arrForLength.length; i++) {
        profitRes.push(profitData.map(arr => arr[i]))
    }

    const profitabilityDataSource = profitRes.map(arr => {
        return {
            date: arr[0].date,
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
        return firm.solvency.map(obj => {
            return {
                stkcd: firm.stkcd,
                ...obj
            }
        })
    })

    let solvencyRes = []
    arrForLength = solvencyData[0] ? solvencyData[0] : []
    for (let i = 0; i < arrForLength.length; i++) {
        solvencyRes.push(solvencyData.map(arr => arr[i]))
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

getFinanceInfos().then(resp=>{    
    console.log(handleDataSource(resp.data.data))
}).catch(err=>console.error(err))



