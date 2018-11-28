import React from 'react'
import { hydrate } from 'react-dom'
import App from '../shared/App'
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom'
import {RootStore} from '../shared/models/credit-card.model'

/* 
    Get the serialized store that server was initiated 
    And initiate client store with that
*/
const initialState = window.INITIAL_STATE   
delete window.INITIAL_STATE

const store = RootStore.create(initialState || {
    geonames: [],
    creditCard: {}
});

hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);