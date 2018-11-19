import Payment from '../browser/Payment'
import Thanks from '../browser/Thanks'
import {fetchInitialData} from './api'

export const routes = [
    {
        path: '/thanks',
        exact: true,
        component: Thanks,
    },
    {   // default route at the end
        path: '/',
        component: Payment,
        fetchInitialData
    }
]