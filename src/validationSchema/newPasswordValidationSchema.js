import * as Yup from 'yup';

const createValidationSchema = (previousScreen) => {
  return Yup.object().shape({
    old_password: previousScreen === 'UpdateProfile' 
      ? Yup.string()
          .label('OldPassword')
          .required('Old password is required')
      : Yup.string().notRequired(),

    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),

    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
};

export default createValidationSchema;
