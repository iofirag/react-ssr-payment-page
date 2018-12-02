import React, { Component } from 'react';
import classNames from 'classnames';
import { observer, inject } from "mobx-react"
import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './PaymentForm.scss';
import { GenericSelection } from '../../ui-components/GenericSelection'
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';


const PaymentForm = inject("store")
    (observer(class PaymentForm extends Component {

        state = {
            creditCard: { ...this.props.store.getCreditCard() },
            navigate: false,
            submitted: false
        }

        onSubmit = (e) => {
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
                this.setState({ validation: v, submitted: true })
            }
        }
        /* onChanged Handlers */
        onChangeHandler = (e) => {
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
                case 'year':
                    this.props.store.creditCard.setYear(e.target.value);
                    break;
                case 'month':
                    this.props.store.creditCard.setMonth(e.target.value);
                    break;
                case 'cvv':
                    this.props.store.creditCard.setCvv(e.target.value);
                    break;

                default:
                    break;
            }
            this.setState(this.state)
        }
        imageClassName = () => {
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
        generateMonthList = () => {
            const list = [];
            for (let i = 1; i <= 12; i++) {
                // Create month name
                const objDate = new Date(`${i}/25/2020`)
                const locale = "en-us",
                    monthName = objDate.toLocaleString(locale, { month: "long" });
                const month = {
                    number: String(i),
                    name: monthName
                }
                list.push(month)
            }
            return list;
        }
        generateYearList = () => {
            const list = []
            for (let i = 0; i < 9; i++) {
                const currYear = new Date().getFullYear()
                const year = {
                    number: String(currYear + i),
                }
                list.push(year)
            }
            return list;
        }

        componentDidMount() {
            this.props.store.fetchGeonames();
        }
        render() {
            const { navigate, validation, submitted } = this.state;
            const creditCard = this.props.store.getCreditCard();    // remove
            const { geonames } = this.props.store

            if (navigate) {
                return <Redirect to="/thanks" push={true} />
            }
            // TODO remove all  
            return (
                <form className='payment-form' onSubmit={this.onSubmit } autoComplete="off">

                    <TextField
                        required
                        error={submitted && !validation.isValidBillingAddress}
                        id="billing_address"
                        label="Billing Address"
                        className='billing-address-field'
                        value={creditCard.billingAddress}
                        onChange={this.onChangeHandler }
                        margin="normal"
                        inputProps={{ name: 'billing_address' }}
                    />

                    <FormControl required error={submitted && !validation.isValidCountryCode} className='country-field'>
                        <InputLabel htmlFor="country">Country</InputLabel>

                        <GenericSelection
                            list={geonames}
                            listIdField={'countryCode'}
                            listValField={'countryCode'}
                            listLabelField={'countryName'}
                            name={'country'}
                            value={creditCard.countryCode}
                            onChangeHandler={this.onChangeHandler } />
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
                        value={creditCard.creditCardDetails}
                        onChange={this.onChangeHandler }
                        margin="normal"
                        inputProps={{ name: 'credit_card_details' }}
                    />
                    <div className={classNames('creditcard-img', this.imageClassName())} />

                    <FormControl required error={submitted && !validation.isValidMonth} className='month-field'>
                        <InputLabel htmlFor="month">Month</InputLabel>
                        <GenericSelection
                            list={this.generateMonthList()}
                            listIdField={'number'}
                            listValField={'number'}
                            listLabelField={'name'}
                            name={'month'}
                            value={creditCard.month}
                            onChangeHandler={this.onChangeHandler } />

                        {/* {
                        submitted && !validation.isValidMonth ?
                            <FormHelperText>Error</FormHelperText> : ''
                    } */}
                    </FormControl>

                    <FormControl required error={submitted && !validation.isValidYear} className='year-field'>
                        <InputLabel htmlFor="year">Year</InputLabel>
                        <GenericSelection
                            list={this.generateYearList()}
                            listIdField={'number'}
                            listValField={'number'}
                            listLabelField={'number'}
                            name={'year'}
                            value={creditCard.year}
                            onChangeHandler={this.onChangeHandler } />
                        {/* {
                        submitted && !validation.isValidMonth ?
                            <FormHelperText>Error</FormHelperText> : ''
                    } */}
                    </FormControl>

                    <TextField
                        required
                        error={submitted && !validation.isValidCvv}
                        id="cvv"
                        label="CVV"
                        className='cvv-field'
                        value={creditCard.cvv}
                        onChange={this.onChangeHandler }
                        margin="normal"
                        inputProps={{
                            name: 'cvv',
                            type: 'number',
                        }}
                    />

                    <Button type="submit" variant="contained" color="primary" className='submit'>
                        Submit Payment
                    </Button>
                </form>
            )
        }
    }))
export default PaymentForm;