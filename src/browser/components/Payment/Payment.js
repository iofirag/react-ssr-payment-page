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
    getCountryLocationFromCountryCode = (_countryCode) => {
        const {geonames} = this.props.store;
        const countryItem = geonames.find((item) => item.countryCode === _countryCode);
        let poi = {}
        if (countryItem) {
            poi = { lat: countryItem.north, lng: countryItem.east }
        }
        return poi;
        // this.setState({countryLocation: { lat: countryItem.north, lng: countryItem.east}})
        // this.setState({countryLocation: { lat: countryItem.north, lng: countryItem.east}})
    }
    render() {
        const { creditCard } = this.props.store;
        const poi = this.getCountryLocationFromCountryCode(creditCard.countryCode)

        return (
            <div className="payment">
                <PaymentHeader />
                <PaymentForm />
                <LeafletMap poi={poi} />
            </div>
        )
    }
}))
export default Payment;