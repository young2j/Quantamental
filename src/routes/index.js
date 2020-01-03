import {
    Dashboard,
    Finance,
    Evaluation,
    Quality,
    Knowledge,
    Strategy,
} from '../views'


const mainRouter = [
    {
        path:'/dashboard',
        component:Dashboard
    }, {
        path: '/fundamental/finance',
        component: Finance
    }, {
        path: '/fundamental/valuation',
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