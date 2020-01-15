// const axios =require('axios')
// const moment=require('moment')


// const service = axios.create({
//     baseURL:  'http://rap2api.taobao.org/app/mock/236247' 
// })

// let endDt = moment().subtract(1, 'y').endOf('y') //2019-12-31
// let startDt = endDt.subtract(4, 'y') //2015-12-31
// const getFinanceInfos = (stkcd, startDate, endDate) => {
//     return service.get('/fundamental/finance-infos', {
//         params: {
//             stkcd: stkcd || '123456',
//             startDate: startDate || startDt.format('YYYY-MM-DD'),
//             endDate: endDate || endDt.format('YYYY-MM-DD')
//         }
//     })
// }

// const handleDataSource = (respData) => {
//     //---------------
//     let profitData = respData.map(firm => {
//         return firm.profit.map(obj => {
//             return {
//                 stkcd: firm.stkcd,
//                 ...obj
//             }
//         })
//     })

//     let profitRes = []
//     let arrForLength = profitData[0] ? profitData[0] : []
//     for (let i = 0; i < arrForLength.length; i++) {
//         profitRes.push(profitData.map(arr => arr[i]))
//     }

//     const profitDataSource = profitRes.map(arr => {
//         return {
//             date: arr[0].date,
//             profit: arr.map(obj => {
//                 const { date, ...rest } = obj
//                 return {
//                     ...rest
//                 }
//             })
//         }
//     })

//     //-------------------
//     let solvencyData = respData.map(firm => {
//         return firm.solvency.map(obj => {
//             return {
//                 stkcd: firm.stkcd,
//                 ...obj
//             }
//         })
//     })

//     let solvencyRes = []
//     arrForLength = solvencyData[0] ? solvencyData[0] : []
//     for (let i = 0; i < arrForLength.length; i++) {
//         solvencyRes.push(solvencyData.map(arr => arr[i]))
//     }
//     const solvencyDataSource = solvencyRes.map(arr => {
//         return {
//             date: arr[0].date,
//             solvency: arr.map(obj => {
//                 const { date, ...rest } = obj
//                 return {
//                     ...rest
//                 }
//             })
//         }
//     })

//     return {
//         profitDataSource,
//         solvencyDataSource
//     }
// }

// getFinanceInfos().then(resp=>{    
//     console.log(handleDataSource(resp.data.data))
// }).catch(err=>console.error(err))


const _ = require('lodash')

// const objArr = [ 
//                 { stkcd: "111111 许响林去运公司", roe: 63.38, roa: 7.01, gpm: 15.73, opm: 35.56},
//                 { stkcd: "222222 系支图次公司", roe: 65.84, roa: 34.14, gpm: 91.67, opm: 78.57},
//                 { stkcd: "333333 导路种却公司", roe: 100.78, roa: 45.63, gpm: 19.82, opm: 28.93},
//                 { stkcd: "444444 西同工非收公司", roe: 0.26, roa: 65.52, gpm: 83.83, opm: 10.94},
//                 { stkcd: "555555 达干离我保公司", roe: 6.69, roa: 17.23, gpm: 27.34, opm: 45.17}]

// const res = objArr.reduce((obj1,obj2)=>{
//     return _.mergeWith(obj1, obj2, (obj1V, obj2V) => {
//         if (_.isArray(obj1V)) {
//             return obj1V.concat(obj2V)
//         }
//         return [obj1V, obj2V]
//     })
// })


// const r = _.mapValues(_.omit(res,'stkcd'),(values)=>{
//     return values.map((v,i)=>{
//         return {
//             name:res.stkcd[i].match(/^\d{6}/)[0],
//             value:v
//         }
//     })
// })
// console.log(_.values(_.mapValues(r,v=>{
//     return {
//         data:v
//     }
// }))[0])

// const objArr = [
//             {
//                 date:'2015-12-31',
//                 profit:[ 
//                 { stkcd: "111111 许响林去运公司", roe: 63.38, roa: 7.01, gpm: 15.73, opm: 35.56},
//                 { stkcd: "222222 系支图次公司", roe: 65.84, roa: 34.14, gpm: 91.67, opm: 78.57},
//                 { stkcd: "333333 导路种却公司", roe: 100.78, roa: 45.63, gpm: 19.82, opm: 28.93},
//                 { stkcd: "444444 西同工非收公司", roe: 0.26, roa: 65.52, gpm: 83.83, opm: 10.94},
//                 { stkcd: "555555 达干离我保公司", roe: 6.69, roa: 17.23, gpm: 27.34, opm: 45.17}]
//             },
//             {
//                 date:'2015-12-31',
//                 profit:[ 
//                 { stkcd: "111111 许响林去运公司", roe: 63.38, roa: 7.01, gpm: 15.73, opm: 35.56},
//                 { stkcd: "222222 系支图次公司", roe: 65.84, roa: 34.14, gpm: 91.67, opm: 78.57},
//                 { stkcd: "333333 导路种却公司", roe: 100.78, roa: 45.63, gpm: 19.82, opm: 28.93},
//                 { stkcd: "444444 西同工非收公司", roe: 0.26, roa: 65.52, gpm: 83.83, opm: 10.94},
//                 { stkcd: "555555 达干离我保公司", roe: 6.69, roa: 17.23, gpm: 27.34, opm: 45.17}]
//             },
//             {
//                 date:'2015-12-31',
//                 profit:[ 
//                 { stkcd: "111111 许响林去运公司", roe: 63.38, roa: 7.01, gpm: 15.73, opm: 35.56},
//                 { stkcd: "222222 系支图次公司", roe: 65.84, roa: 34.14, gpm: 91.67, opm: 78.57},
//                 { stkcd: "333333 导路种却公司", roe: 100.78, roa: 45.63, gpm: 19.82, opm: 28.93},
//                 { stkcd: "444444 西同工非收公司", roe: 0.26, roa: 65.52, gpm: 83.83, opm: 10.94},
//                 { stkcd: "555555 达干离我保公司", roe: 6.69, roa: 17.23, gpm: 27.34, opm: 45.17}]
//             }
//         ]


// console.log(_.values(objArr[0]))

// const data = [{ date: "2010-12-31", value: 57.23 },
// { date: "2011-12-31", value: 46.32 },
// { date: "2012-12-31", value: 83.75 },
// { date: "2013-12-31", value: 35.86 },
// { date: "2014-12-31", value: 65.77 },
// { date: "2015-12-31", value: 96.93 },
// { date: "2016-12-31", value: 67.79 },
// { date: "2017-12-31", value: 22.43 },
// { date: "2018-12-31", value: 4.53 },
// { date: "2019-12-31", value: 79.62 }]

// console.log(
//     data.reduce((obj1, obj2) => {
//         return _.mergeWith(obj1, obj2, (obj1V, obj2V) => {
//             if (_.isArray(obj1V)) {
//                 return obj1V.concat(obj2V)
//             }
//             return [obj1V, obj2V]
//         })
//     })
// )

const data = {
    accruals:{
        Jones:{
            TA: 198.55,
            NA: -70.13,
            DA: 23.72,
        },
        ModifyJones:{   
            TA: 155.06,
            NA: 89.44,
            DA: -69.35,
        },
        performanceMatch:{
            TA: 146.46,
            NA: 80.13,
            DA: -3.68,
        },
    },
    Mscore: 24
}

console.log(Object.values(data.accruals).map(o=>o.TA))