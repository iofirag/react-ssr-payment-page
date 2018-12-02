import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import './Payment.scss';
import PaymentForm from '../PaymentForm/PaymentForm';
import LeafletMap from '../LeafletMap/LeafletMap'
import PaymentHeader from '../PaymentHeader/PaymentHeader';



const Payment = inject("store")
    (observer(class Payment extends Component {
        
    state = {
        countryLocation: {lat: 32, lng: 35},
    }
    render() {
        const { selectedCountry } = this.props.store;

        return (
            <div className="payment">
                <PaymentHeader />
                <PaymentForm />
                <LeafletMap selectedCountry={selectedCountry} />
            </div>
        )
    }
}))
export default Payment;