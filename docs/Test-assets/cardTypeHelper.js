function getCreditCardType(cardNumber) {
    var _result = "unknown";

    if (/^5[1-5]/.test(cardNumber)) { //Mastercard
        _result = "mastercard";
    } else if (/^4/.test(cardNumber)) { //VISA
        _result = "visa";
    } else if (/^3[47]/.test(cardNumber)) { //Amex (American Express)
        _result = "amex";
    }

    return _result;
};