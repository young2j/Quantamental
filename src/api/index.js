import axios from 'axios'
import { message } from 'antd'



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


//-----------查询公司代码和名词------------
export const autoCompleteFirmCode = ()=>{
    return service.get("/fundamental/finance/firmcodes")
}

//-------------获得一家公司横向财务分析数据------------------
export const getFinancialData = (stkcd)=>{
    return service.get(`/fundamental/financials/${stkcd}`)
}

//-------------获得多家公司横向财务分析数据------------------
export const getFinancialsData = ()=>{
    return service.get(`/fundamental/financials`)
}

//-------------获得一家公司纵向财务分析数据------------------
export const getTimeFinancialData = (stkcd)=>{
    return service.get(`/fundamental/time-financials/${stkcd}`)
}

//-------------获得多家公司纵向财务分析数据------------------
export const getTimeFinancialsData = ()=>{
    return service.get(`/fundamental/time-financials`)
}

