var validate = require('./validate.js');

test('Credit card numbers are validated correctly', function() {
    expect(validate.isValidCreditCardNumber('','')).toBe(false);
    expect(validate.isValidCreditCardNumber('','amex')).toBe(false);
    expect(validate.isValidCreditCardNumber('','visa')).toBe(false);
    expect(validate.isValidCreditCardNumber('','mc')).toBe(false);
    expect(validate.isValidCreditCardNumber('','discover')).toBe(false);

    expect(validate.isValidCreditCardNumber('3400 0000 0000 009','amex')).toBe(true);
    expect(validate.isValidCreditCardNumber('340000000000009','amex')).toBe(true);
    expect(validate.isValidCreditCardNumber('4111 1111 1111 1111','visa')).toBe(true);
    expect(validate.isValidCreditCardNumber('4111111111111111','visa')).toBe(true);
    expect(validate.isValidCreditCardNumber('5500 0000 0000 0004','mc')).toBe(true);
    expect(validate.isValidCreditCardNumber('5500000000000004','mc')).toBe(true);
    expect(validate.isValidCreditCardNumber('6011 0000 0000 0004','discover')).toBe(true);
    expect(validate.isValidCreditCardNumber('6011000000000004','discover')).toBe(true);
});

test('Dates are validated properly', function() {
    expect(validate.isValidDate()).toBe(false);
    expect(validate.isValidDate('29','02','1991')).toBe(false);
    expect(validate.isValidDate('28','11','1991')).toBe(true);
    expect(validate.isValidDate('29','02','1992')).toBe(true);  // leap year
    expect(validate.isValidDate('01','01','2000')).toBe(true);
    expect(validate.isValidDate('00','01','2001')).toBe(false); // incorrect day
    expect(validate.isValidDate('01','4444','2009')).toBe(false);   // incorrect month
    expect(validate.isValidDate('21','12','3000')).toBe(false); // incorrect year
});

test('Address postcodes are validated correctly', function() {
    expect(validate.isValidPostcode()).toBe(false);
    expect(validate.isValidPostcode('')).toBe(false);
    expect(validate.isValidPostcode('1234','au')).toBe(true);
    expect(validate.isValidPostcode('12 34','au')).toBe(false);
    expect(validate.isValidPostcode('1234','at')).toBe(true);
    expect(validate.isValidPostcode('123 4','at')).toBe(false);
    expect(validate.isValidPostcode('1234','be')).toBe(true);
    expect(validate.isValidPostcode('1 234','be')).toBe(false);
    expect(validate.isValidPostcode('A1B 2C3','ca')).toBe(true); // canada postcode well-formatted
    expect(validate.isValidPostcode('a1b 2c3','ca')).toBe(true); // canada postcode with lowercase letters
    expect(validate.isValidPostcode('a1B 2c3','ca')).toBe(true); // canada postcode with uppercase and lowercase letters
    expect(validate.isValidPostcode('a1B2c3','ca')).toBe(true);  // canada postcode without spaces
    expect(validate.isValidPostcode('A1B2C 3','ca')).toBe(false);// canada postcode with a space in an incorrect place
    expect(validate.isValidPostcode('1234','ch')).toBe(true);
    expect(validate.isValidPostcode(' 1234','ch')).toBe(false);
    expect(validate.isValidPostcode('123 45','cz')).toBe(true);
    expect(validate.isValidPostcode('12345','cz')).toBe(true);   // Czech posctode with no spaces
    expect(validate.isValidPostcode('1 2345','cz')).toBe(false);  // Czech postcode with a space in an incorrect place
    expect(validate.isValidPostcode('12345','de')).toBe(true);
    expect(validate.isValidPostcode('1234 5','de')).toBe(false);
    expect(validate.isValidPostcode('1234','dk')).toBe(true);
    expect(validate.isValidPostcode('1 2 3 4','dk')).toBe(false);
    expect(validate.isValidPostcode('12345','es')).toBe(true);
    expect(validate.isValidPostcode('1 2345','es')).toBe(false);
    expect(validate.isValidPostcode('1234','ex')).toBe(true);
    expect(validate.isValidPostcode('qwerty','ex')).toBe(true);
    expect(validate.isValidPostcode('12345','fi')).toBe(true);
    expect(validate.isValidPostcode('12 345','fi')).toBe(false);
    expect(validate.isValidPostcode('12345','fr')).toBe(true);
    expect(validate.isValidPostcode('123 45','fr')).toBe(false);
    expect(validate.isValidPostcode('1234','hk')).toBe(true);
    expect(validate.isValidPostcode('1234','ie')).toBe(true);
    expect(validate.isValidPostcode('1234 AB','nl')).toBe(true);
    expect(validate.isValidPostcode('1234 aB','nl')).toBe(true); // Dutch postcode with some lowercase letters
    expect(validate.isValidPostcode('1234 ab','nl')).toBe(true); // Dutch postcode with all lowercase letters
    expect(validate.isValidPostcode('1234ab','nl')).toBe(true);  // Dutch postcode with all lowercase letters and no spaces
    expect(validate.isValidPostcode('1234AB','nl')).toBe(true);  // Dutch postcode with no spaces
    expect(validate.isValidPostcode('1 234AB','nl')).toBe(false);// Dutch postcode with a space in an incorrect place
    expect(validate.isValidPostcode('123 4AB','nl')).toBe(false);// Dutch postcode with a space in an incorrect place
    expect(validate.isValidPostcode('1234','no')).toBe(true);
    expect(validate.isValidPostcode('1234','nz')).toBe(true);
    expect(validate.isValidPostcode('123 45','se')).toBe(true);
    expect(validate.isValidPostcode('12345','se')).toBe(true);   // Swedish postcode with no spaces
    expect(validate.isValidPostcode('12 345','se')).toBe(false); // Swedish postcode with a space in an incorrect place
    expect(validate.isValidPostcode('123456','sg')).toBe(true);
    expect(validate.isValidPostcode('123 456','sg')).toBe(false);
    expect(validate.isValidPostcode('W2 1AB','gb')).toBe(true);
    expect(validate.isValidPostcode('w2 1Ab','gb')).toBe(true);
    expect(validate.isValidPostcode('w21ab','gb')).toBe(true);
    expect(validate.isValidPostcode('W21AB','gb')).toBe(true);
    expect(validate.isValidPostcode('W21 AB','gb')).toBe(false);
    expect(validate.isValidPostcode('W12 0AB','gb')).toBe(true);
    expect(validate.isValidPostcode('w12 0AB','gb')).toBe(true);
    expect(validate.isValidPostcode('a120ab','gb')).toBe(true);
    expect(validate.isValidPostcode('W120AB','gb')).toBe(true);
    expect(validate.isValidPostcode('W120 AB','gb')).toBe(false);
    expect(validate.isValidPostcode('W1A 1AA','gb')).toBe(true);
    expect(validate.isValidPostcode('W1a 1aa','gb')).toBe(true);
    expect(validate.isValidPostcode('w1a1aa','gb')).toBe(true);
    expect(validate.isValidPostcode('W1 A1AA','gb')).toBe(false);
    expect(validate.isValidPostcode('SW2 1AB','gb')).toBe(true);
    expect(validate.isValidPostcode('Sw2 1aB','gb')).toBe(true);
    expect(validate.isValidPostcode('sw21ab','gb')).toBe(true);
    expect(validate.isValidPostcode('SW21A B','gb')).toBe(false);
    expect(validate.isValidPostcode('SW12 0AB','gb')).toBe(true);
    expect(validate.isValidPostcode('sw12 0AB','gb')).toBe(true);
    expect(validate.isValidPostcode('sw120ab','gb')).toBe(true);
    expect(validate.isValidPostcode('SW1 20AB','gb')).toBe(false);
    expect(validate.isValidPostcode('SW1A 0AA','gb')).toBe(true);
    expect(validate.isValidPostcode('GIR 0AA','gb')).toBe(true);
    expect(validate.isValidPostcode('GIR 0aa','gb')).toBe(true);
    expect(validate.isValidPostcode('gir0aa','gb')).toBe(true);
    expect(validate.isValidPostcode('gi r0aa','gb')).toBe(false);
    expect(validate.isValidPostcode('12345','us')).toBe(true);
    expect(validate.isValidPostcode('1234','za')).toBe(true);
});