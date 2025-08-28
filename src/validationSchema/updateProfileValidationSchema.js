import * as Yup from 'yup';

const updateProfileValidationSchema = (social_user) => {
  return Yup.object().shape({

    name: Yup.string()
      .label('Name')
      .required('Name is required'),

    phone_number: Yup.string().label('PhoneNumber').required('Phone is required'),
  });
};

export default updateProfileValidationSchema;