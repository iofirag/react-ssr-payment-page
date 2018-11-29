import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import './Payment.scss';
import PaymentForm from './components/PaymentForm/PaymentForm';
import LeafletMap from './components/LeafletMap/LeafletMap'



const Payment = inject("store")
    (observer(class Payment extends Component {
        
    
    render() {

        return (
            <div className="payment">
                <h1 className="payment-title">Secure Payment Page</h1>

                <PaymentForm />
                
                <LeafletMap />
                
            </div>
        )
    }
}))
export default Payment;