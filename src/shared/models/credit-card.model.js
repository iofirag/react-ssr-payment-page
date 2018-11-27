import { types } from 'mobx-state-tree'
import { getCreditCardType } from '../../browser/cardTypeHelper'

export const GeonameModel = types.model({
    continent: types.optional(types.string, ''),
    capital: types.optional(types.string, ''),
    languages: types.optional(types.string, ''),
    geonameId: types.optional(types.number, 0),
    south: types.optional(types.number, 0),
    isoAlpha3: types.optional(types.string, ''),
    north: types.optional(types.number, 0),
    fipsCode: types.optional(types.string, ''),
    population: types.optional(types.string, ''),
    east: types.optional(types.number, 0),
    isoNumeric: types.optional(types.string, ''),
    areaInSqKm: types.optional(types.string, ''),
    countryCode: types.optional(types.string, ''),
    west: types.optional(types.number, 0),
    countryName: types.optional(types.string, ''),
    continentName: types.optional(types.string, ''),
    currencyCode: types.optional(types.string, ''),
})

export const CreditCardModel = types.model({
    billingAddress: types.optional(types.string, ''),
    countryCode: types.optional(types.string, ''),
    creditCardDetails: types.optional(types.string, ''),
    month: types.optional(types.string, ''),
    year: types.optional(types.string, ''),
    cvv: types.optional(types.string, ''),
})
    .views(self => ({
        get getCreditCardImg () {
            return getCreditCardType(self.creditCardDetails)
        }
    }))
    .actions(self => ({
        /* Billing Address */
        getBillingAddress() { return self.billingAddress },
        setBillingAddress(ba) { self.billingAddress = ba },
        isValidBillingAddress() { return self.billingAddress? true : false},
        /* Country Code */
        getCountryCode() { return self.countryCode },
        setCountryCode(cc) { self.countryCode = cc },
        isValidCountryCode() { return self.countryCode? true : false },
        /* Credit Card Details */
        getCreditCardDetails() { return self.creditCardDetails },
        setCreditCardDetails(ccd) { 
            let cleanNum = ccd.split('-').join(''); // remove hyphens
            if (cleanNum.length <= 16 && Number(cleanNum)) {
                if (cleanNum.length > 0) {
                    cleanNum = cleanNum.match(new RegExp('.{1,4}', 'g')).join('-');
                }
                self.creditCardDetails = cleanNum;
            }
        },
        isValidCreditCardDetails() { 
            var ccNum = self.creditCardDetails.split('-').join('');
            var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
            var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
            var amexpRegEx = /^(?:3[47][0-9]{13})$/;
            var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

            return visaRegEx.test(ccNum) 
                || mastercardRegEx.test(ccNum) 
                || amexpRegEx.test(ccNum)
                || discovRegEx.test(ccNum)
        },
        /* Month */
        getMonth() { return self.month },
        setMonth(m) { self.month = m },
        isValidMonth() {
            const y = parseInt(self.year);
            const m = parseInt(self.month);
            if (m === NaN || y === NaN) return false;

            const d = new Date();
            var cardDate = new Date(y, m - 1);
            var currDate = new Date(d.getFullYear(), d.getMonth());
            return cardDate >= currDate;
        },
        /* Year */
        getYear() { return self.year },
        setYear(y) { self.year = y },
        isValidYear() {
            const d = new Date();
            if (self.year 
                && parseInt(self.year) >= d.getFullYear() // from
                && parseInt(self.year) <= d.getFullYear() + 8) return true; // to
            else return false;
        },
        /* CVV */
        getCvv() { return self.cvv },
        setCvv(c) { 
            if (c.length <= 3) self.cvv = c
        },
        isValidCvv() { return self.cvv.length === 3 },
        /* All */
        formValidation() {
            return {
                isValidBillingAddress: self.isValidBillingAddress(),
                isValidCountryCode: self.isValidCountryCode(),
                isValidCreditCardDetails: self.isValidCreditCardDetails(),
                isValidMonth: self.isValidMonth(),
                isValidYear: self.isValidYear(),
                isValidCvv: self.isValidCvv(),
            }
        }
    }))



export const RootStore = types.model({
    geonames: types.maybe( types.array(GeonameModel), []),
    creditCard: types.maybe(CreditCardModel, {})
})
    .actions(self => ({
        setGeonames(_geonames) {
            self.geonames = _geonames
        },
        getGeonames() {
            return self.geonames
        },
        getCreditCard() {
            return self.creditCard;
        }
    }))