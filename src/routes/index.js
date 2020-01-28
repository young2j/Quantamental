import {
    StockPredict,
    Finance,
    Evaluation,
    Quality,
    Knowledge,
    Strategy,
} from '../views'


const mainRouter = [
    {
        path:'/stockpredict',
        component:StockPredict
    }, {
        path: '/fundamental/finance',
        component: Finance
    }, {
        path: '/fundamental/evaluation',
        component: Evaluation
    }, {
        path: '/fundamental/quality',
        component: Quality
    }, {
        path: '/strategy',
        component: Strategy
    }, {
        path: '/knowledge',
        component: Knowledge
    }
]


export {
    mainRouter
}