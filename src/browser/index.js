import React from 'react'
import { hydrate } from 'react-dom'
import App from '../shared/App'
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom'
import {RootStore} from '../shared/models/credit-card.model'


const initialState = window.INITIAL_STATE
delete window.INITIAL_STATE

const store = RootStore.create(initialState || {});

hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);