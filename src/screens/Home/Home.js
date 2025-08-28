import React from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {SetUserLogout} from '../../redux/action';
import {useSelector} from 'react-redux';
import {getStyles} from './Styles';
import {NavGrid, PromoCard, ContentBox, TextLink} from '../../components';
import {AppImages} from '../../constants/AppImages';
import {colorTheme} from '../../constants/ColorConstants';
import {AppConstants} from '../../constants/AppConstants';
import useAuth from '../../hooks/useAuth';

const data = [
  {id: '1', title: 'Item 1'},
  {id: '2', title: 'Item 2'},
  {id: '3', title: 'Item 3'},
  {id: '4', title: 'Item 4'},
  {id: '5', title: 'Item 5'},
];

const {
  errorText,
  primaryBackground,
  disableBackground,
  defaultBackground,
  primaryBorder,
  defaultText,
  secondaryBackground,
} = colorTheme;

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.userReducer);
  const profileData = reducerData?.auth?.customer;
  const styles = getStyles();
  const {logoutRequestHandler} = useAuth();
  const handleLogout = () => {
    dispatch(SetUserLogout());
  };

  const onPress = () => {
    navigation.navigate('OnlineConsultation');
  };

  const navButtons = [
    {
      id: 1,
      label: `HOME\nCARE`,
      icon: AppImages.demoImage,
      onPress: () => console.log('Home Care'),
    },
    {
      id: 2,
      label: 'BOOK AN\nATTENDANT',
      icon: AppImages.demoImage,
      onPress: () => console.log('Book Attendant'),
    },
    {
      id: 3,
      label: 'ONLINE\nCONSULTATION',
      icon: AppImages.demoImage,
      onPress: () => console.log('Consultation'),
    },
    {
      id: 4,
      label: 'MEDICAL\nHISTORY',
      icon: AppImages.demoImage,
      onPress: () => console.log('Medical History'),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* <ScrollView> */}
        <TouchableOpacity
          style={styles.headerContainer}
          onPress={() => {
            logoutRequestHandler();
          }}>
          <Text style={styles.headerTitle}>Hello {profileData?.name}</Text>
          <Text style={styles.headerSubtitle}>How are you today?</Text>
        </TouchableOpacity>
        <PromoCard
          icon={AppImages.congratulation}
          discount="25% OFF"
          description="Invite a friend and claim your reward!"
          buttonText="Invite"
          onPress={() => console.log('Invite pressed')}
        />
        <View style={styles.cardContainer}>
          <Text style={styles.categoryTitle}>Lorem Ipsum</Text>
          <FlatList
            data={navButtons}
            keyExtractor={item => item?.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('OnlineConsultation');
                  }}
                  activeOpacity={AppConstants.buttonActiveOpacity}
                  style={styles.item}>
                  <View style={styles.contentContainer}>
                    <Image
                      source={item?.icon}
                      style={styles.icon}
                      resizeMode="contain"
                    />
                    <Text style={styles.text}>{item?.label}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={styles.contentContainerStyle}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
