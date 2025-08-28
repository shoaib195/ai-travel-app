import * as Yup from 'yup';

const profileValidationSchema = (social_user) => {
  return Yup.object().shape({

    name: Yup.string()
      .label('Name')
      .required('Name is required'),

    phone_number: Yup.string().label('PhoneNumber').required('Phone is required'),
    password: social_user == 0
      ? Yup.string()
        .label('password')
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required')
      : Yup.string().notRequired(),

    password_confirmation: social_user == 0
      ? Yup.string()
        .label('password_confirmation')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
      : Yup.string().notRequired(),
  });
};

export default profileValidationSchema;