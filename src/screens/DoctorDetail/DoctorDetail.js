import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import {getStyles} from './Styles';
import Header from '../../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AppImages} from '../../constants/AppImages';
import TabComponent from '../../components/TabComponent/Index';
import DoctorCard from '../../components/DoctorCard/Index';
import DoctorTimeSlots from '../../components/Consultation/DoctorTimeSlots';
import { AppConstants } from '../../constants/AppConstants';
import TopTabNavigator from '../../navigation/TopTabNavigator';
import ButtonComponent from '../../components/ButtonComp';

const DoctorDetail = props => {
  const {navigation, route} = props;
  const {width, height} = Dimensions.get('window');
  const styles = getStyles(width, height);

  const onPress = () => {
    console.log('On Press');
  };

  const tabsData = [
    {
      name: 'About',
      data: (
        <>
          <Text>Order 1</Text>
          <Text>Order 2</Text>
          <Text>Order 2</Text>
          <Text>Order 2</Text>
          <Text>Order 2</Text>
          <Text>Order 2</Text>
        </>
      ),
    },
    {
      name: 'Education',
      data: (
        <>
          <Text>Education</Text>
        </>
      ),
    },
    {
      name: 'Experience',
      data: (
        <>
          <Text>Experience</Text>
        </>
      ),
    },
    {
      name: 'Reviews',
      data: (
        <>
          <Text>Reviews</Text>
        </>
      ),
    },
  ];

  const handleTabChange = tab => {
    setSelectedTab(tab);
  };

  const tabs = [
    {name: 'News', label: 'News (5)', component: DoctorCard},
    {name: 'Blogs', label: 'Blogs (2)', component: DoctorCard},
    {name: 'Videos', label: 'Videos (10)', component: DoctorCard},
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        navigation={navigation}
        cancelButton={true}
        title={'Online Consultation'}
      />
      <View style={styles.container}>
        <ScrollView>
          {/* Doctor Information Card */}
          <View style={styles.doctorCard}>
            <View style={styles.doctorCardImageBox}>
              <View style={styles.doctorCardImage}>
                <Image
                  source={AppImages.demoImage}
                  style={styles.doctorCardIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.doctorCardName}>Dr. Jason Miller</Text>
              <Text style={styles.doctorCardSpeciality}>Neurologist</Text>
            </View>

            <View style={styles.doctorAboutCardList}>
              <View style={styles.doctorAboutCard}>
                <Image
                  source={AppImages.demoImage}
                  style={styles.doctorAboutCardIcon}
                  resizeMode="contain"
                />
                <Text style={styles.doctorAboutCardName}>12 Years</Text>
                <Text style={styles.doctorAboutCardSpeciality}>Experience</Text>
              </View>

              <View style={styles.doctorAboutCard}>
                <Image
                  source={AppImages.demoImage}
                  style={styles.doctorAboutCardIcon}
                  resizeMode="contain"
                />
                <Text style={styles.doctorAboutCardName}>4.9</Text>
                <Text style={styles.doctorAboutCardSpeciality}>Rating</Text>
              </View>

              <View style={styles.doctorAboutCard}>
                <Image
                  source={AppImages.demoImage}
                  style={styles.doctorAboutCardIcon}
                  resizeMode="contain"
                />
                <Text style={styles.doctorAboutCardName}>2000+</Text>
                <Text style={styles.doctorAboutCardSpeciality}>Patients</Text>
              </View>
            </View>
          </View>

          {/* Available Time Slots */}
          <View style={styles.availableSlotCard}>
            <Text style={styles.availableSlotCardTitle}>
              Available Time Slots
            </Text>
            <DoctorTimeSlots timeSlots={AppConstants?.timeSlots}/>
          </View>

          {/* Doctor Tabs Information */}
          <View style={styles.doctorTabsCard}>
          <TopTabNavigator />
          </View>

          <View style={styles.btnContainer}>
        <ButtonComponent
          disabled={false}
          pressStatus={false}
          title={'Continue'}
          btnStyle={styles.activeBtnStyle}
          onPress={()=> {navigation.navigate('Checkout')}}
        />
      </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DoctorDetail;





