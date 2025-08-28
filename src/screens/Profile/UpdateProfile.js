import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {getStyles} from './UpdateProfileStyles';
import {useFormik} from 'formik';
import profileValidationSchema from '../../validationSchema/updateProfileValidationSchema';
import {useSelector} from 'react-redux';
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';
import ButtonComponent from '../../components/ButtonComp';
import {AppConstants} from '../../constants/AppConstants';
import {AppImages} from '../../constants/AppImages';
import {colorTheme} from '../../constants/ColorConstants';
import Header from '../../components/Header';
import toastService from '../../services/toastService';
import LoaderModal from '../../components/Modal/LoaderModal';
import AvatarCard from '../../components/AvatarCard/AvatarCard';
import Metrics from '../../constants/Metrics';

const {darkGrayBackground, dimGrayBorder, whiteBorder} = colorTheme;

const UpdateProfile = ({
  navigation,
  setShowImageModal,
  selectedImage,
}) => {
  const {width, height} = Dimensions.get('window');
  const styles = getStyles(width, height);
  const nameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const {updateUserHandler} = useUser();
  const [apiCall, setApiCall] = useState(false);
  const [selection, setSelection] = useState({start: 0, end: 0}); // This hooks only use for text selection
  const reducerData = useSelector(state => state.userReducer);
  const {profileUpdateHandler, imageUpdateHandler, isLoading, skeletonLoader} = useAuth();
  const profileData = reducerData?.auth?.customer;

  const initialValues = {
    name: profileData?.name ?? '',
    phone_number: profileData?.phone_number ?? '',
  };

    useEffect(() => {
    if (selectedImage) {
      imageUpdateHandler(selectedImage);
    }
  }, [selectedImage]);

  const onSubmit = async values => {
    let data = {
      name: values?.name,
      phone_number: values?.phone_number,
    };
    profileUpdateHandler(data)
      .then(({data}) => {
        setApiCall(false);
        updateUserHandler(data?.data);
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
      value => value === '' || value === null || value === false || !apiCall,
    );
  };

  const inputFocusTextHandler = inputField => {
    if (inputField === 'name' && nameRef.current) {
      nameRef.current.focus();
    } else if (inputField === 'phone_number' && phoneNumberRef.current) {
      phoneNumberRef.current.focus();
    }
  };

   const onChangeNameHandler = (inputText, inputField) => {
    handleChange(inputField)(inputText);
    if (inputText != '') {
      setApiCall(true);
    } else {
      setApiCall(false);
    }
  };

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
    isValid,
    handleSubmit,
    setFieldError,
  } = formik;

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <LoaderModal load={isLoading} textShow={false} />}
      <Header navigation={navigation} leftTitle={'Profile'} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.contentView}>
          <View style={styles.profileContainer}>
            <AvatarCard
                apiLoading={skeletonLoader}
              type={profileData?.profile_image ? 'url' : ''}
              image={AppImages?.profileDefault}
              onPress={() => {
                setShowImageModal(true);
              }}
              url={
                selectedImage !== null
                  ? selectedImage?.uri
                  : profileData?.profile_image
              }
            />
            <Text style={styles.profileName}>{profileData?.name}</Text>
          </View>
          <View style={styles.inputContainer}>
            <InputTextComponent
              ref={nameRef}
              placeholder={'Name'}
              // onChangeText={handleChange('name')}
              onChangeText={txt => onChangeNameHandler(txt, 'name')}
              onBlur={handleBlur('name')}
              value={values.name}
              bgColor={darkGrayBackground}
              imageRight={{
                show: true,
                url: AppImages?.edit,
                width: Metrics.widthRatio(16),
                height: Metrics.heightRatio(20),
              }}
              onPressIcon={() => {
                inputFocusTextHandler('name');
              }}
            />
            {errors?.name && touched?.name && (
              <Text style={styles.errorText}>{errors?.name}</Text>
            )}

            <InputTextComponent
              ref={phoneNumberRef}
              placeholder={'Phone'}
              // onChangeText={handleChange('phone_number')}
              onChangeText={txt => onChangeNameHandler(txt, 'phone_number')}
              onBlur={handleBlur('phone_number')}
              value={values.phone_number}
              bgColor={darkGrayBackground}
              keyboardType="numeric"
              imageRight={{
                show: true,
                url: AppImages?.edit,
                width: Metrics.widthRatio(16),
                height: Metrics.heightRatio(20),
              }}
              onPressIcon={() => {
                inputFocusTextHandler('phone_number');
              }}
            />
            {errors?.phone_number && touched?.phone_number && (
              <Text style={styles.errorText}>{errors?.phone_number}</Text>
            )}

            <InputTextComponent
              placeholder={'Email'}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={profileData?.email}
              bgColor={darkGrayBackground}
              editable={false}
            />
            {errors?.email && touched?.email && (
              <Text style={styles.errorText}>{errors?.email}</Text>
            )}

            {!profileData?.social_user && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('NewPassword', {
                    screenName: 'UpdateProfile',
                  });
                }}
                activeOpacity={AppConstants.buttonActiveOpacity}>
                <InputTextComponent
                  pointerEvents="none"
                  editable={false}
                  selection={selection}
                  placeholder={'Change Password'}
                  value={'Change Password'}
                  bgColor={darkGrayBackground}
                  imageRight={{
                    show: true,
                    url: AppImages?.edit,
                    width: Metrics.widthRatio(16),
                    height: Metrics.heightRatio(20),
                  }}
                  onPressIcon={() => {
                       navigation.navigate('NewPassword', {
                    screenName: 'UpdateProfile',
                  });
                  }}
                />
              </TouchableOpacity>
            )}
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
export default UpdateProfile;
