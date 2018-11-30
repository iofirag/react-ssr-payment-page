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
    onCountryChange = (_countryCode) => {
        const {geonames} = this.props.store;
        const countryItem = geonames.find((item) => item.countryCode === _countryCode);
        this.setState({countryLocation: { lat: countryItem.north, lng: countryItem.east}})
    }
    render() {
        // const { creditCard } = this.props.store
        return (
            <div className="payment">
                <PaymentHeader />
                <PaymentForm onCountryChange={this.onCountryChange} />
                <LeafletMap poi={this.state.countryLocation} />
            </div>
        )
    }
}))
export default Payment;