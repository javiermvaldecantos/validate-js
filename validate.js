var validate = (function () {

    /**
     * Validates a credit card number
     * The card number should only contain numbers, dashes or spaces, have a certain length, and pass the Luhn Algorithm.
     *
     * @param cardNumber Card number as a string (e.g. "4242 4242 4242 4242")
     * @param cardType Card type as a string (e.g. "visa")
     */
    function isValidCreditCardNumber(cardNumber, cardType) {
        // accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(cardNumber)) return false;

        cardNumber = cardNumber.replace(/\D/g, ""); // remove non-numeric characters

        if(!cardNumber) {
            return false;
        }

        // the card number will be valid if it has the correct length according to its type, and if it passes the Luhn Algorithm
        return _isValidCreditCardNumberLength(cardNumber, cardType) && _isValidCreditCardNumberLuhnAlgorithm(cardNumber);
    }

    /**
     * _isValidCreditCardNumberLength
     * 
     * Validates the length of a credit card number, given its type.
     * The card number should only contain numbers, dashes or spaces.
     * Card number lengths taken from the following sources:
     * https://en.wikipedia.org/wiki/Payment_card_number
     * http://www.regular-expressions.info/creditcard.html
     * 
     * @param cardNumber Card number as a string (e.g. "4242 4242 4242 4242")
     * @param cardType Card type as a string (e.g. "visa")
     */
    function _isValidCreditCardNumberLength(cardNumber, cardType) {
        // accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(cardNumber)) return false;

        cardNumber = cardNumber.replace(/\D/g, ""); // remove non-numeric characters

        switch(cardType) {
            case 'amex':
                return cardNumber.length === 15;
                break;
            case 'laser':
                return cardNumber.length <= 19 && cardNumber >= 16;
                break;
            case 'visa':
                return cardNumber.length === 13 || cardNumber.length === 16;
                break;
            case 'mc':
                return cardNumber.length === 16;
                break;
            case 'maestro':
                return cardNumber.length <= 19 && cardNumber >= 12;
                break;
            case 'discover':
                return cardNumber.length === 16;
                break;
            default:
                return false;
        }
    }

    /**
     * _isValidCreditCardNumberLuhnAlgorithm
     * Checks that a credit card number fulfills the Luhn Algorithm (checksum)
     * The card number should only contain numbers, dashes or spaces
     * 
     * @param cardNumber Card number as a String (e.g. 4242 4242 4242 4242)
     */
    function _isValidCreditCardNumberLuhnAlgorithm(cardNumber) {
        // accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(cardNumber)) return false;

        var nCheck = 0, nDigit = 0, bEven = false;
        cardNumber = cardNumber.replace(/\D/g, ""); // remove non-numeric characters

        for (var n = cardNumber.length - 1; n >= 0; n--) {
            var cDigit = cardNumber.charAt(n),
                nDigit = parseInt(cDigit, 10);

            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        return (nCheck % 10) == 0;
    }

    /**
     * isValidDate
     * 
     * validates a date given the day, month and year
     * @param day day of the month in DD format
     * @param month month of the year in MM format
     * @param year year in YYYY format
     */
    function isValidDate(day, month, year) {
        if(!day || !month || !year) {
            return false;
        } else {
            var maxDaysPerMonth = {
                '01': 31,
                '02': ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0) ? 29 : 28,  // taking leap years into account
                '03': 31,
                '04': 30,
                '05': 31,
                '06': 30,
                '07': 31,
                '08': 31,
                '09': 30,
                '10': 31,
                '11': 30,
                '12': 31
            }
            var dayIsInValidRange = day > 0 && day <= maxDaysPerMonth[month];
            var monthIsInValidRange = month > 0 && month <= 12;
            var yearIsInValidRange = year > 0 && year <= ((new Date()).getFullYear());

            return dayIsInValidRange && monthIsInValidRange && yearIsInValidRange;
        }
    }

    /**
     * isValidPostcode
     *
     * Validates an address postcode. The validation rules are NOT the same for each country.
     *
     * If no rules known for a country, assume postcode is valid
     *
     * @param postcode: Postcode to be validated
     * @param country: country code used to validate the postcode. Example: 'au', 'uk', 'us'
     */
    function isValidPostcode(postcode, country) {
        if (typeof postcode !== 'string' || typeof country !== 'string') {
            return false;
        }

        var result = true;

        switch(country.toLowerCase()) {

            case 'au':
            case 'at':
            case 'be':
            case 'ch':
            case 'dk':
            case 'no':
            case 'nz':
            case 'za':  // Australia, Austria, Belgium, Switzerland, Denmark, Norway, New Zealand, South Africa - 1234
                result = /^\d{4}$/.test(postcode);
                break;

            case 'de':
            case 'es':
            case 'fi':
            case 'fr':
            case 'us':  // Germany, Spain, Finland, France and USA - 12345
                result = /^\d{5}$/.test(postcode);
                break;

            case 'sg':  // Singapore - 123456
                result = /^\d{6}$/.test(postcode);
                break;

            case 'gb':  // United Kingdom - W2 1AB or W12 0AB or W1A 1AA or SW2 1AB or SW12 0AB or SW1A 0AA or GIR 0AA (case insensitive, and the space is optional)
                var parts = postcode.split(" ");
                if (parts.length !== 1 && parts.length !== 2) {
                    result = false; // the postcode can't have more than one space
                } else {
                    // get the outward and inward parts of the postcode, in a different way depending on whether the provided postcode has a space or not
                    var outwardPart = parts.length === 2 ? parts[0] : parts[0].slice(0, -3);
                    var inwardPart = parts.length === 2 ? parts[1] : parts[0].slice(parts[0].length - 3);
                    if (/^[A-Z]\d$/i.test(outwardPart)) {    // W2 1AB
                        result = /^\d[A-Z][A-Z]$/i.test(inwardPart);

                    } else if (/^[A-Z]\d\d$/i.test(outwardPart)) {   // W12 0AB
                        result = /^\d[A-Z][A-Z]$/i.test(inwardPart) && /^[^CIKMOV]{3}$/i.test(inwardPart);

                    } else {    // W1A 1AA or SW2 1AB or SW12 0AB or SW1A 0AA or GIR 0AA
                        var outwardPartIsValid = /(^[A-Z]\d[A-Z]$)|(^[A-Z][A-Z]\d$)|(^[A-Z][A-Z]\d\d$)|(^[A-Z][A-Z]\d[A-Z]$)|(^[A-Z]{3}$)/i.test(outwardPart);
                        var inwardPartIsValid = /^\d[A-Z][A-Z]$/i.test(inwardPart);
                        result = outwardPartIsValid && inwardPartIsValid;
                    }
                }
                break;

            case 'ca':  // Canada - A1B 2C3 (case insensitive, and the space is optional)
                result = /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i.test(postcode);
                break;

            case 'ex':
            case 'hk':
            case 'ie':  // Rest of the world and Ireland - Postcodes not used, so we validate it as a free text field (i.e. valid if it's not empty)
                result = !!postcode;
                break;

            case 'nl': // Netherlands - 1234 AB (case insensitive, and the space is optional)
                result = /^\d{4} ?[A-Z]{2}$/i.test(postcode);
                break;

            case 'cz':
            case 'se':  // Czech Republic and Sweden - 123 45 (the space is optional)
                result = /^\d{3} ?\d{2}$/.test(postcode);
                break;

            default:
                result = !!postcode;    // default - postcode will be valid if it's not empty
        }

        return result;
    }

    return {
        isValidCreditCardNumber: isValidCreditCardNumber,
        isValidDate: isValidDate,
        isValidPostcode: isValidPostcode
    }
})();

exports = module.exports = validate;
