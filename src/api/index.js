import axios from 'axios'
import { message } from 'antd'
import moment from 'moment'


const isDev = process.env.NODE_ENV==='development'
const service=axios.create({
    baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/236247':''
})

//-----------全局拦截器--------------------
// service.interceptors.request.use((config) => {
//     // console.log('config:',config);
//     config.data = Object.assign({}, config.data, {
//         // authToken:window.localStorage.getItem('authToken')
//         authToken: '123'
//     })

//     return config
// })

service.interceptors.response.use((resp) => {
    // console.log('resp:',resp)
    if (resp.status === 200) {
        return resp.data
    } else {
        message.error('请求失败')
    }
})


//-----------查询公司代码和名称------------
export const getAllFirmCodeNames = ()=>{
    return service.get("/fundamental/finance/firmcodes")
}

//---------------获得多家公司多年财务分析数据---------------
let endDt = moment().subtract(1, 'y').endOf('y') //2019-12-31
let startDt = endDt.subtract(4, 'y') //2015-12-31
export const getFinanceInfos = (stkcd,startDate,endDate) =>{
    return service.get('/fundamental/finance-infos', {
        params: {
            stkcd: stkcd || '123456',
            startDate: startDate || startDt.format('YYYY-MM-DD'),
            endDate: endDate || endDt.format('YYYY-MM-DD')
        }
    })
}


//-------------获得一家公司多年的财务数据---------------
export const getFinanceYearsInfos = (stkcd, startDate, endDate) => {
    return service.get('/fundamental/finance-years-infos', {
        params: {
            stkcd: stkcd || '123456',
            startDate: startDate || startDt.format('YYYY-MM-DD'),
            endDate: endDate || endDt.format('YYYY-MM-DD')
        }
    })
}

//-------------获得多家公司某年的财务数据---------------
export const getFinanceYearInfos=(stkcd,date)=>{
    return service.get('/fundamental/finance-year-infos',{
        params: {
            stkcd: stkcd || '123456',
            date:date
        }
    })
}

//-------------获得一家公司模型估值信息-----------------
export const getEvaluationInfo=stkcd=>{
    return service.get(`/fundamental/evaluation/${stkcd}`)
}


//-------------获得一家公司质量信息--------------------
export const getQualityInfo = stkcd=>{
    return service.get(`/fundamental/quality/${stkcd}`)
}



//---------------获得股票池公司代码和名称-------------------
export const getUniverseCode = key=>{
    return service.get(`/strategy/universe/${key}`)
}