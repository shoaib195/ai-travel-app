import React, {useCallback, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import InputTextComponent from '../../components/inputTextComp';
import {getStyles} from './Styles';
import {moderateVerticalScale} from 'react-native-size-matters';
import {useFormik} from 'formik';
import profileValidationSchema from '../../validationSchema/profileValidationSchema';
import {useDispatch, useSelector} from 'react-redux';
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';
import {setAuthPassword} from '../../redux/action';
import ButtonComponent from '../../components/ButtonComp';
import {AppImages} from '../../constants/AppImages';
import {colorTheme} from '../../constants/ColorConstants';
import Header from '../../components/Header';
import toastService from '../../services/toastService';
import LoaderModal from '../../components/Modal/LoaderModal';

const {darkGrayBackground, dimGrayBorder, whiteBorder} = colorTheme;

const Profile = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const styles = getStyles(width, height);
  const {updateUserHandler} = useUser();
  const dispatch = useDispatch();
  const [selection, setSelection] = useState({start: 0, end: 0}); // This hooks only use for text selection
  const reducerData = useSelector(state => state.userReducer);

  // const [open, setOpen] = useState(false);
  // const [items, setItems] = useState(AppConstants?.cities);
  // const [getValue, setValue] = useState(null);
  const [showPassword, setPassword] = useState({
    password: true,
    password_confirmation: true,
  });
  const {profileUpdateHandler, isLoading} = useAuth();
  const profileData = reducerData?.auth?.customer;

  const initialValues = {
    name: '',
    phone_number: '',
    ...(profileData?.social_user == 0 ? {password: ''} : {}),
    ...(profileData?.social_user == 0 ? {password_confirmation: ''} : {}),
  };

  const onSubmit = async values => {
    let data = {
      name: values?.name,
      phone_number: values?.phone_number,
      ...(!profileData?.social_user && {
        password: values?.password,
        password_confirmation: values?.password_confirmation,
        is_password: true,
      }),
    };
    profileUpdateHandler(data)
      .then(({data}) => {
        updateUserHandler(data?.data);
        dispatch(setAuthPassword(values?.password));
        toastService.shortToast(data?.message);
      })
      .catch(error => {
        const apiErrors = error?.response?.data?.errors;
        if (typeof apiErrors === 'string') {
          toastService.shortToast(apiErrors);
        } else if (typeof apiErrors === 'object') {
          for (let [key, value] of Object.entries(apiErrors)) {
            setFieldError(key, value[0]);
          }
        }
      });
  };

  const validateBtnHandler = values => {
    return Object.values(values).some(
      value => value === '' || value === null || value === false,
    );
  };

  const iconHandler = inputFiled => {
    setPassword(prevState => ({
      ...prevState, // Keep the other states unchanged
      [inputFiled]: !prevState[inputFiled], // Toggle the state for the specific input field
    }));
  };

  // const handleCityChange = useCallback(
  //   value => {
  //     if (value) {
  //       setFieldValue('city', value);
  //     } else {
  //       setFieldTouched('city', true, true);
  //     }
  //   },
  //   [setFieldValue, setFieldTouched],
  // );

  // const handleDropdownClose = () => {
  //   setFieldTouched('city', true, true);
  //   if (!values.city) {
  //     setFieldError('city', 'City is required');
  //   }
  // };

  const formik = useFormik({
    initialValues,
    validationSchema: profileValidationSchema(profileData?.social_user),
    onSubmit,
  });

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    isSubmitting,
    isValid,
    handleSubmit,
    validateField,
    setFieldTouched,
    setFieldValue,
    setFieldError,
    setErrors,
  } = formik;

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <LoaderModal load={isLoading} textShow={false}/>}
      <Header
        navigation={navigation}
        title={'Profile'}
        // customNavigator={headerNavigationHandler}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.contentView}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Set up your Profile</Text>
          </View>

          <Text style={styles.subTitle}>
            Create your profile so you can manage your account even faster
          </Text>

          <View style={styles.inputContainer}>
            <View>
              <InputTextComponent
                placeholder={'Name'}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                bgColor={darkGrayBackground}
              />
              {errors?.name && touched?.name && (
                <Text style={styles.errorText}>{errors?.name}</Text>
              )}
            </View>

            <View style={{marginTop: moderateVerticalScale(14)}}>
              <InputTextComponent
                placeholder={'Phone'}
                onChangeText={handleChange('phone_number')}
                onBlur={handleBlur('phone_number')}
                value={values.phone_number}
                bgColor={darkGrayBackground}
                keyboardType="numeric"
              />
              {errors?.phone_number && touched?.phone_number && (
                <Text style={styles.errorText}>{errors?.phone_number}</Text>
              )}
            </View>

            {/* <View style={{marginTop: moderateVerticalScale(14)}}>
              <DropDownPickerComponent
                value={getValue}
                searchable={true}
                setValue={setValue}
                setOpen={setOpen}
                setItems={setItems}
                items={items}
                open={open}
                onChangeValue={handleCityChange}
                placeholder={'City'}
                onClose={handleDropdownClose}
              />
              {errors?.city && touched?.city && (
                <Text style={styles.errorText}>{errors?.city}</Text>
              )}
            </View> */}

            {!profileData?.social_user ? (
              <>
                <View style={{marginTop: moderateVerticalScale(14)}}>
                  <InputTextComponent
                    secureTextEntry={showPassword?.password}
                    placeholder={'Password'}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    bgColor={darkGrayBackground}
                    imageRight={{
                      show: true,
                      url: AppImages?.passwordHide,
                      color: showPassword?.password
                        ? dimGrayBorder
                        : whiteBorder,
                    }}
                    onPressIcon={() => {
                      iconHandler('password');
                    }}
                  />
                  {errors?.password && touched?.password && (
                    <Text style={styles.errorText}>{errors?.password}</Text>
                  )}
                </View>

                <View style={{marginTop: moderateVerticalScale(14)}}>
                  <InputTextComponent
                    secureTextEntry={showPassword?.password_confirmation}
                    placeholder={'Confirm Password'}
                    onChangeText={handleChange('password_confirmation')}
                    onBlur={handleBlur('password_confirmation')}
                    value={values.password_confirmation}
                    bgColor={darkGrayBackground}
                    imageRight={{
                      show: true,
                      url: AppImages?.passwordHide,
                      color: showPassword?.password_confirmation
                        ? dimGrayBorder
                        : whiteBorder,
                    }}
                    onPressIcon={() => {
                      iconHandler('password_confirmation');
                    }}
                  />
                  {errors?.password_confirmation &&
                    touched?.password_confirmation && (
                      <Text style={styles.errorText}>
                        {errors?.password_confirmation}
                      </Text>
                    )}
                </View>
              </>
            ) : null}
          </View>
        </View>
        <View style={styles.btnContainer}>
          <ButtonComponent
            disabled={validateBtnHandler(values) || !isValid}
            pressStatus={isLoading}
            title={'Continue'}
            btnStyle={
              validateBtnHandler(values) || !isValid
                ? styles.btnStyle
                : styles.activeBtnStyle
            }
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;
