import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Email is required'),

    password: Yup.string()
  .label('Password')
  .required('Password is required'),
});