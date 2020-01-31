import {
    StockPredict,
    Finance,
    Evaluation,
    Quality,
    Knowledge,
    Strategy,
    // Login,
    Notification,
    Profile
} from '../views'


const mainRouter = [
    {
        path:'/stockpredict',
        component:StockPredict,
        isNav:true,
    }, {
        path: '/fundamental/finance',
        component: Finance,
        isNav:true,
    }, {
        path: '/fundamental/evaluation',
        component: Evaluation,
        isNav:true,
    }, {
        path: '/fundamental/quality',
        component: Quality,
        isNav:true,
    }, {
        path: '/strategy',
        component: Strategy,
        isNav:true,
    }, {
        path: '/knowledge',
        component: Knowledge,
        isNav:true,
    }, {
        path: '/user/notification',
        component: Notification,
        isNav:false,
    }, {
        path: '/user/profile',
        component: Profile,
        isNav:false,
    },
    // {
    //     path: '/user/login',
    //     component: Login,
    //     isNav: false,
    // }, 
]


export {
    mainRouter
}