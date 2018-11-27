import React, { Component } from 'react';
import { Redirect } from 'react-router';
import classNames from 'classnames';
import { observer, inject } from "mobx-react"
import './Payment.scss';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
    // paymentForm: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     minWidth: 120,
    //     maxWidth: 435,
    // },
    
    // billingAddressField: {
    //     margin: theme.spacing.unit,
    //     minWidth: 250,
    // },
    // countryField: {
    //     margin: theme.spacing.unit,
    //     width: 150,
    // },

    // creditcardField: {
    //     margin: theme.spacing.unit,
    //     width: 250,
    // },
    // creditcardImg: {
    //     margin: theme.spacing.unit,
    //     // width: 150,
    //     width: 48,
    //     height: 34,
    // },

    

    // yearField: {
    //     margin: theme.spacing.unit,
    //     width: 100,
    // },
    // monthField: {
    //     margin: theme.spacing.unit,
    //     width: 100,
    // },
    // cvvField: {
    //     margin: theme.spacing.unit,
    //     width: 100,
    // },

    // button: {
    //     margin: theme.spacing.unit,
    // },
});

const Payment = inject("store")
    (observer(class Payment extends Component {
        
        constructor(props) {
        super(props)

        this.state = {
            creditCard: {...this.props.store.getCreditCard()},
            navigate: false,
            submitted: false
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
            this.setState({validation: v, submitted: true})
        }
    }

    /* onChanged Handlers */
    onChangeHandler(e) {
        switch (e.target.name) {
            case 'billing_address':
                this.props.store.creditCard.setBillingAddress(e.target.value);      
                // this.setState({ creditCard: { billingAddress: e.target.value }})
                break;
            case 'country':
                this.props.store.creditCard.setCountryCode(e.target.value);
                break;
            case 'credit_card_details':
                this.props.store.creditCard.setCreditCardDetails(e.target.value);
                // const img = cards.getCreditCardType(e.target.value)
                break;
            case 'year':
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 4)
                this.props.store.creditCard.setYear(e.target.value);
                break;
            case 'month':
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                const paddMonth = e.target.value.padStart(2, '0');
                this.props.store.creditCard.setMonth(paddMonth);
                break;
            case 'cvv':
                this.props.store.creditCard.setCvv(e.target.value);
                break;

            default:
                break;
        }
        this.setState(this.state)
    }

    imageClassName() {
        switch (this.props.store.getCreditCard().getCreditCardImg) {
            case 'mastercard':
                return 'mastercard-img'       
            case 'visa':
                return 'visa-img'
            case 'amex':
                return 'amex-img'
        
            default:
                return 'unknown-img'
        }
    }
    isErrorClass(cond) {
        !!cond && 'error'
    }
    render() {
        const { navigate, validation, submitted } = this.state;
        const creditCard = this.props.store.getCreditCard();
        const geonames = this.props.store.getGeonames();
        
        if (navigate) {
            return <Redirect to="/thanks" push={true} />
        }

        return (
            <div className="payment">
                <h1 className="payment-title">Secure Payment Page</h1>

                <form className='payment-form' onSubmit={this.onSubmit.bind(this)}  autoComplete="off">
                    
                    <TextField
                        required
                        error={submitted && !validation.isValidBillingAddress}
                        id="billing_address"
                        label="Billing Address"
                        className='billing-address-field'
                        value={creditCard.getBillingAddress()}
                        onChange={this.onChangeHandler.bind(this)}
                        margin="normal"
                        inputProps={{
                            name: 'billing_address',
                            id: 'billing_address',
                        }}
                    />

                    <FormControl required error={submitted && !validation.isValidCountryCode} className='country-field'>
                        <InputLabel htmlFor="country">Country</InputLabel>
                        <Select
                            value={creditCard.getCountryCode()}
                            onChange={this.onChangeHandler.bind(this)}
                            inputProps={{
                                name: 'country',
                                id: 'country',
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {geonames && geonames.map(obj => (
                                <MenuItem key={obj.countryCode} value={obj.countryCode}>{obj.countryName}</MenuItem>
                            ))}
                        </Select>
                        {/* {
                            submitted && !validation.isValidCountryCode ?
                                <FormHelperText>Error</FormHelperText> : ''
                        } */}
                    </FormControl>
                    
                    <TextField
                        required
                        error={submitted && !validation.isValidCreditCardDetails}
                        id="credit_card_details"
                        label="Credit Card Details"
                        className='creditcard-details-field'
                        value={creditCard.getCreditCardDetails()}
                        onChange={this.onChangeHandler.bind(this)}
                        margin="normal"
                        inputProps={{
                            name: 'credit_card_details',
                            id: 'credit_card_details',
                            type: 'number',
                        }}
                    />
                    <div className={classNames('creditcard-img', this.imageClassName())} />
                    
                    <TextField
                        required
                        error={submitted && !validation.isValidMonth}
                        disabled={!creditCard.getYear()}
                        id="month"
                        label="Month"
                        className='month-field'
                        value={creditCard.getMonth()}
                        onChange={this.onChangeHandler.bind(this)}
                        margin="normal"
                        inputProps={{
                            name: 'month',
                            id: 'month',
                            type: 'number',
                        }}
                        // min={1}
                        // max={12}
                        maxLength={2}
                    />
                    
                    <TextField
                        required
                        error={submitted && !validation.isValidYear}
                        id="year"
                        label="Year"
                        className='year-field'
                        value={creditCard.getYear()}
                        onChange={this.onChangeHandler.bind(this)}
                        margin="normal"
                        inputProps={{
                            name: 'year',
                            id: 'year',
                            type: 'number',
                        }}
                        // min={new Date().getFullYear()}
                        // max={ new Date().getFullYear() + 8 }
                        maxLength={4}
                    />
                    
                    <TextField
                        required
                        error={submitted && !validation.isValidCvv}
                        id="cvv"
                        label="CVV"
                        className='cvv-field'
                        value={creditCard.getCvv()}
                        onChange={this.onChangeHandler.bind(this)}
                        margin="normal"
                        inputProps={{
                            name: 'cvv',
                            id: 'cvv',
                            type: 'number',
                        }}
                        // maxLength={3}
                    />

                    <Button type="submit" variant="contained" color="primary" className='submit'>
                        Submit Payment
                    </Button>
                </form>
                
            </div>
        )
    }
}))
export default withStyles(styles)(Payment);