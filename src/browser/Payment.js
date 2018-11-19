import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { observer, inject } from "mobx-react"
// import s from './Payment.scss';

const Payment = inject("store")
    (observer(class Payment extends Component {
    
        constructor(props) {
        super(props)

        this.state = {
            ctr: 0,
            navigate: false
        }
    }

    onSubmit(e) {
        e.preventDefault();
        // check all fields
        const v = this.props.store.getCreditCard().formValidation();

        if (v.isValidBillingAddress
            && v.isValidCountryCode
            && v.isValidCreditCardDetails
            && v.isValidMonth
            && v.isValidYear
            && v.isValidCvv) {
            this.setState({ navigate: true })
        } else {
            this.setState({validation: v, ctr: this.state.ctr++ })
        }
    }

    /* onChanged Handlers */
    onChangeHandler(e) {
        switch (e.target.name) {
            case 'billing_address':
                this.props.store.creditCard.setBillingAddress(e.target.value);                
                break;
            case 'country':
                this.props.store.creditCard.setCountryCode(e.target.value);
                break;
            case 'credit_card_details':
                this.props.store.creditCard.setCreditCardDetails(e.target.value);
                break;
            case 'month':
                const paddMonth = e.target.value.padStart(2, '0');
                this.props.store.creditCard.setMonth(paddMonth);
                break;
            case 'year':
                this.props.store.creditCard.setYear(e.target.value);
                break;
            case 'cvv':
                this.props.store.creditCard.setCvv(e.target.value);
                break;

            default:
                break;
        }
        this.forceUpdate()
    }

    forceUpdate() {
        this.setState({ ctr: this.state.ctr++ })
    }
    render() {
        const { navigate, validation } = this.state;
        const creditCard = this.props.store.getCreditCard();
        const geonames = this.props.store.getGeonames();
        
        if (navigate) {
            return <Redirect to="/thanks" push={true} />
        }

        return (
            <ul>
                <h1 className="payment-title">Secure Payment Page</h1>
                <br />
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Billing Address:</label>
                    <input type="text" name="billing_address" 
                        value={creditCard.getBillingAddress()} 
                        onChange={this.onChangeHandler.bind(this)} />
                    {validation && !validation.isValidBillingAddress? <div style={{color:'red'}}>error</div> : '' }
                    <br />
                    
                    <label>Country:</label>
                    <select name='country'
                        value={creditCard.getCountryCode()}
                        onChange={this.onChangeHandler.bind(this)}>
                        {geonames && geonames.map( obj => (
                            <option key={obj.countryCode} value={obj.countryCode}>{obj.countryName}</option>
                        ))}
                    </select>
                    {validation && !validation.isValidCountryCode ? <div style={{ color: 'red' }}>error</div> : ''}
                    <br />

                    <label>Credit Card Details:</label>
                    <input type="text" name="credit_card_details"
                        value={creditCard.getCreditCardDetails()} 
                        onChange={this.onChangeHandler.bind(this)} />
                    {validation && !validation.isValidCreditCardDetails ? <div style={{ color: 'red' }}>error</div> : ''}
                    <br />

                    <label>Year:</label>
                    <input type="number" name="year"
                        value={creditCard.getYear()} 
                        onChange={this.onChangeHandler.bind(this)}
                        min={new Date().getFullYear()} 
                        max={new Date().getFullYear() + 8} />
                    {validation && !validation.isValidYear ? <div style={{ color: 'red' }}>error</div> : ''}
                    <br />

                    <label>Month:</label>
                    <input disabled={!creditCard.getYear()} type="number" name="month"
                        value={creditCard.getMonth()}
                        onChange={this.onChangeHandler.bind(this)}
                        min={1}
                        max={12} />
                    {validation && !validation.isValidMonth ? <div style={{ color: 'red' }}>error</div> : ''}
                    <br />

                    <label>CVV:</label>
                    <input type="text" name="cvv"
                        value={creditCard.getCvv()}
                        onChange={this.onChangeHandler.bind(this)}
                        maxLength={3} />
                    {validation && !validation.isValidCvv ? <div style={{ color: 'red' }}>error</div> : ''}
                    <br />

                    <input type="submit" value="Submit Payment"/>
                </form>
            </ul>
        )
    }
}))
export default Payment;