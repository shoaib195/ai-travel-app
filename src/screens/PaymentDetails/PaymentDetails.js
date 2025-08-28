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
import {AppImages} from '../../constants/AppImages';
import ButtonComponent from '../../components/ButtonComp';

const PaymentDetails = props => {
  const {navigation, isLoading} = props;
  const {width, height} = Dimensions.get('window');
  const styles = getStyles(width, height);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header navigation={navigation} title={'Checkout'} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.OrderSummeryBlock}>
            <Text style={styles.headingBlock}>Order Summery</Text>
            <View style={styles.orderSummaryView}>
              <View style={styles.PaymentstableRow}>
                <Text style={styles.PaymentstableCol1}>Subtotal</Text>
                <Text style={styles.PaymentstableCol2}>$30.00</Text>
              </View>

              <View style={styles.PaymentstableRow}>
                <Text style={styles.PaymentstableCol1}>VAT</Text>
                <Text style={styles.PaymentstableCol2}>$3.00</Text>
              </View>

              <View style={styles.PaymentstableRow}>
                <Text style={styles.PaymentstableCol1}>Total</Text>
                <Text style={styles.PaymentstableCol2}>$33.00</Text>
              </View>
            </View>
          </View>

          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              Please confirm and submit your order
            </Text>
            <Text style={styles.headerSubTitle}>
              By clicking submit order, you agree to Terms of Use and Privacy
              Policy.{' '}
            </Text>
          </View>

          <View style={styles.OrderSummeryBlock}>
            <View style={[styles.PaymentstableRow, styles.PaymentstableRowGap]}>
              <Text style={styles.headingBlockRow}>Order Summery</Text>
              <TouchableOpacity
                onPress={() => console.log('Order Summery Edit')}>
                <Text style={styles.PaymentstableCol2}>Edit</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.PaymentstableRow}>
              <View style={styles.cardDetailsFlex}>
                <Image
                  source={AppImages.mastercardLogo}
                  style={styles.cardLogo}
                  resizeMode="contain"
                />
                <Text style={styles.PaymentstableColCard}>**** **** 6533</Text>
                {/* <Text style={styles.PaymentstableColCard}>6533</Text> */}
              </View>
              <Text style={styles.PaymentstableCol2}>07/25</Text>
            </View>
          </View>

          <View style={styles.paymentSummeryBlock}>
            <View
              style={[styles.PaymentstableRow, styles.PaymentstableRowGap2]}>
              <Text style={styles.headingBlockRow}>Address</Text>
              <TouchableOpacity onPress={() => console.log('Address Edit')}>
                <Text style={styles.PaymentstableCol2}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.orderSummaryView}>
              <View style={styles.PaymentstableRow}>
                <Text style={styles.PaymentstableCol1}>Name</Text>
                <Text style={styles.PaymentstableCol2}>Oliva Wilson</Text>
              </View>
              <View style={styles.PaymentstableRow}>
                <Text style={styles.PaymentstableCol1}>Street</Text>
                <Text style={styles.PaymentstableCol2}>1234 Street</Text>
              </View>
            </View>
          </View>

          <View style={styles.btnContainer}>
            <ButtonComponent
              disabled={false}
              // disabled={validateBtnHandler()}
              pressStatus={isLoading}
              title={'Submit Order'}
              // btnStyle={
              //     validateBtnHandler() ? styles.activeBtnStyle : styles.activeBtnStyle
              // }
              onPress={() => {
                console.log('Order Successfully');
              }}
              // onPress={handleSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentDetails;
