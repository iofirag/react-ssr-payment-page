import Payment from '../browser/components/Payment/Payment'
import Thanks from '../browser/components/Thanks/Thanks'
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