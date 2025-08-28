import * as Yup from 'yup';

export default Yup.object().shape({
  cardName: Yup.string()
    .label('Name')
    .required('Card Name is required')
    .min(2, 'Name must be at least 2 characters'),

  cardNumber: Yup.string()
    .label('Card Number')
    .required('Card number is required')
    .matches(/^[0-9]{16}$/, 'Card number must be 16 digits'),

  cardExpiryDate: Yup.string()
    .label('Expiry Date')
    .required('Expiry date is required')
    .min(5, 'Expiry date is required'),

  cardSecurityCode: Yup.string()
    .label('Security Code')
    .required('Security code is required')
    .matches(/^[0-9]{3,4}$/, 'Security code must be 3 or 4 digits'),
});
