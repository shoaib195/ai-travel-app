import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {getStyles} from './Styles';
import Header from '../../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AppImages} from '../../constants/AppImages';
import Metrics from '../../constants/Metrics';
import {useFormik} from 'formik';
import validationSchema from '../../validationSchema/checkoutCardValidationSchema';
import InputTextComponent from '../../components/inputTextComp';
import ButtonComponent from '../../components/ButtonComp';
import {colorTheme} from '../../constants/ColorConstants';

const Checkout = props => {
  const {navigation, isLoading} = props;
  const {width, height} = Dimensions.get('window');
  const styles = getStyles(width, height);

  const {darkGrayBackground} = colorTheme;

  const [cardType, setCardType] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const initialValues = {
    cardName: '',
    cardNumber: '',
    cardExpiryDate: '',
    cardSecurityCode: '',
  };
  const onSubmit = async values => {
    console.log({values});
  };

  const validateBtnHandler = () => {
    return !isValid || !values?.cardName?.trim() || !values?.cardNumber?.trim();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
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
  } = formik;

  const detectCardType = number => {
    const trimmedNumber = number.replace(/\s+/g, '');
    if (/^4[0-9]{0,}$/.test(trimmedNumber)) return 'visa';
    if (/^5[1-5][0-9]{0,}$/.test(trimmedNumber)) return 'mastercard';
    return '';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header navigation={navigation} title={'Checkout'} />
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Choose a payment method</Text>
            <Text style={styles.headerSubTitle}>
              Please select a payment method most convenient to you.
            </Text>
          </View>

          <View style={styles.cardDetails}>
            <View style={styles.cardDetailsTypeRow}>
                {/* will create component for check box */}
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={toggleCheckbox}>
                <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
                  {isChecked && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.label}>Credit/Debit Card</Text>
              </TouchableOpacity>

              <View style={styles.cardDetailsLogoRow}>
                {cardType === 'visa' && (
                  <Image source={AppImages.visaLogo} style={styles.cardLogo} />
                )}
                {cardType === 'mastercard' && (
                  <Image
                    source={AppImages.mastercardLogo}
                    style={styles.cardLogo}
                  />
                )}
                {cardType === '' && (
                  <>
                    <Image
                      source={AppImages.visaLogo}
                      style={styles.cardLogo}
                    />
                    <Image
                      source={AppImages.mastercardLogo}
                      style={styles.cardLogo}
                    />
                  </>
                )}
              </View>
            </View>

            <View style={styles.cardDetailsFormBlock}>
              <View style={styles.inputField}>
                <InputTextComponent
                  placeholder={'Name on card'}
                  onChangeText={handleChange('cardName')}
                  onBlur={handleBlur('cardName')}
                  value={values?.cardName}
                  bgColor={darkGrayBackground}
                />
                {errors?.cardName && touched?.cardName && (
                  <Text style={styles.errorText}>{errors?.cardName}</Text>
                )}
              </View>
              <View style={styles.inputField}>
                <InputTextComponent
                  placeholder={'Card number'}
                  // onChangeText={handleChange('cardNumber')}
                  onChangeText={text => {
                    handleChange('cardNumber')(text);
                    const type = detectCardType(text);
                    setCardType(type);
                  }}
                  onBlur={handleBlur('cardNumber')}
                  value={values?.cardNumber}
                  bgColor={darkGrayBackground}
                  keyboardType="phone-pad"
                />
                {errors?.cardNumber && touched?.cardNumber && (
                  <Text style={styles.errorText}>{errors?.cardNumber}</Text>
                )}
              </View>
              <View style={styles.inputFlex}>
                <View style={styles.inputFieldFlex}>
                  <InputTextComponent
                    placeholder={'Expiry date (MM/YY)'}
                    value={values?.cardExpiryDate}
                    onBlur={handleBlur('cardExpiryDate')}
                    keyboardType="number-pad"
                    bgColor={darkGrayBackground}
                    onChangeText={text => {
                      let formatted = text.replace(/\D/g, '');
                      if (formatted.length >= 3) {
                        formatted =
                          formatted.slice(0, 2) + '/' + formatted.slice(2, 4);
                      }
                      handleChange('cardExpiryDate')(formatted);
                    }}
                  />

                  {errors?.cardExpiryDate && touched?.cardExpiryDate && (
                    <Text style={styles.errorText}>
                      {errors?.cardExpiryDate}
                    </Text>
                  )}
                </View>
                <View style={styles.inputFieldFlex}>
                  <InputTextComponent
                    placeholder={'Security code'}
                    onChangeText={handleChange('cardSecurityCode')}
                    onBlur={handleBlur('cardSecurityCode')}
                    value={values?.cardSecurityCode}
                    bgColor={darkGrayBackground}
                    keyboardType="phone-pad"
                  />
                  {errors?.cardSecurityCode && touched?.cardSecurityCode && (
                    <Text style={styles.errorText}>
                      {errors?.cardSecurityCode}
                    </Text>
                  )}
                </View>
              </View>
            </View>

          
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={toggleCheckbox}>
                <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
                  {isChecked && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.label}>
                  My billing address is the same as my adress
                </Text>
              </TouchableOpacity>
       

           
          </View>
          <View style={styles.btnContainer}>
              <ButtonComponent
                // disabled={validateBtnHandler()}
                disabled={false}
                pressStatus={false}
                title={'Confirm and continue'}
                // btnStyle={
                //   validateBtnHandler()
                //     ? styles.activeBtnStyle
                //     : styles.activeBtnStyle
                // }
                onPress={() => {
                  navigation.navigate('PaymentDetails');
                }}
                // onPress={handleSubmit}
              />
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;
