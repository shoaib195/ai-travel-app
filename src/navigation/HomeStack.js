import React, {useState, useRef, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colorTheme} from '../constants/ColorConstants';
// import UpdateProfile from '../screens/UpdateProfile/UpdateProfile';
import {AppImages} from '../constants/AppImages';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import ImageModal from '../components/ImageModal/ImageModal';
import Home from '../screens/Home/Home';
// import NewPassword from '../screens/NewPassword/NewPassword';
import {createStackNavigator } from '@react-navigation/stack';
import {AppFonts} from '../constants/AppFonts';
// import useAuth from '../components/hooks/useAuth';
import {useSelector} from 'react-redux';
// import BiometricSetting from '../screens/BiometricSetting/BiometricSetting';
// import AlertModal from '../components/AlertModal/AlertModal';
import Profile from '../screens/Profile/Profile';
import OnlineConsultation from '../screens/OnlineConsultation/OnlineConsultation';
import SpecialistCategory from '../screens/SpecialistCategory/SpecialistCategory';
import UpdateProfile from '../screens/Profile/UpdateProfile';
import NewPassword from '../screens/NewPassword/NewPassword';
import ImageModal from '../components/Modal/ImageModal/ImageModal';
import DoctorDetail from '../screens/DoctorDetail/DoctorDetail';

const AuthStack = createBottomTabNavigator();
const Stack = createStackNavigator();
const ProfileStack = createStackNavigator();
const DiscoverStack = createStackNavigator();
const DashboardStack = createStackNavigator();

const {darkGrayBackground,defaultBackground, placeholderText, secondaryText, primaryBackground} =
  colorTheme;

// const TabIcon = ({focused, image, label}) => (
//   <View style={styles.tabIconContainer}>
//     <Image source={image} style={styles.image} />
//     <Text style={[styles.tabLabel, focused && styles.activeTabLabel]}>
//       {label}
//     </Text>
//   </View>
// );

const TabIcon = ({focused, image, label, locked = false}) => {
    return (
      <View style={styles.tabIconContainer}>
        <Image
          resizeMode="contain"
          source={image}
          style={[
            styles.image,
            {
              tintColor: !focused
                ? '#B7BCC1'
                : '#7700FF',
            },
          ]}
        />
        <Text style={[styles.tabLabel, focused && styles.activeTabLabel]}>
          {label}
        </Text>
      </View>
    );
  };

function BottomStack() {
  const modalRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const reducerData = useSelector(state => state.userReducer);

  const openModal = () => {
        setTimeout(() => {
      setShowModal(true); // Re-render modal fresh
        modalRef.current?.open();
      }, 10); // small delay before remount
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const imageExtensionHandler = type => {
    const imagesTypes = type.split('/');
    if (Array.isArray(imagesTypes)) {
      return imagesTypes[imagesTypes.length - 1];
    }
  };

  const imageNameHandler = image => {
    return (
      new Date().getTime().toString() + '.' + imageExtensionHandler(image?.mime)
    );
  };

  const onImagePickerHandler = image => {
    const avatar = {
      uri: image?.path,
      type: image?.mime,
      name: imageNameHandler(image),
    };
    closeModal();
    setSelectedImage(avatar);
  };

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <AuthStack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            tabBarStyle: styles.tabBarStyle,
          }}>
          <AuthStack.Screen
            name="Home"
            component={HomeScreens}
            options={{
              tabBarIcon: ({focused}) => (
               <TabIcon focused={focused} image={AppImages?.home} label="Home" />
              ),
              tabBarLabel: () => null,
            }}
          />

          {/* <AuthStack.Screen
            name="Insights"
            component={MyInsightsScreen}
            options={{
              tabBarIcon: ({focused}) => (
                <TabIcon
                  focused={focused}
                  image={
                    focused ? AppImages?.insighstDefault : AppImages?.insights
                  }
                  label="Insights"
                />
              ),
              tabBarLabel: () => null,
            }}
          /> */}

          <AuthStack.Screen
            name="Profile"
            options={{
              tabBarIcon: ({focused}) => (
                <TabIcon
                  focused={focused}
                  image={AppImages?.profile}
                  label="Profile"
                />
              ),
              tabBarLabel: () => null,
            }}>
            {props => (
              <ProfileScreens
                {...props}
                openModal={openModal}
                selectedImage={selectedImage}
              />
            )}
          </AuthStack.Screen>
        </AuthStack.Navigator>

        <ImageModal
          ref={modalRef}
          type={undefined}
          visible={showModal}
          onImagePickHandler={onImagePickerHandler}
          onClose={()=> {setShowModal(false)}}
        />
      </GestureHandlerRootView>
    </>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomStack"
        component={BottomStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function ProfileScreens({openModal, selectedImage}) {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name="UpdateProfile">
        {props => (
          <UpdateProfile
            {...props}
            setShowImageModal={openModal}
            selectedImage={selectedImage}
          />
        )}
      </ProfileStack.Screen>
      {/* <ProfileStack.Screen name="FAQs" component={FAQs} />
      <ProfileStack.Screen name="ContactUs" component={ContactUs} />
      <ProfileStack.Screen name="BiometricSetting" component={BiometricSetting} /> */}
      
    </ProfileStack.Navigator>
  );
}


function HomeScreens() {
  return (
    <DashboardStack.Navigator screenOptions={{headerShown: false}}>
      <DashboardStack.Screen name="HomeMain" component={Home} />
      <DashboardStack.Screen
        name="OnlineConsultation"
        component={OnlineConsultation}
      />
       <DashboardStack.Screen
        name="SpecialistCategory"
        component={SpecialistCategory}
      />
      <DashboardStack.Screen
        name="DoctorDetail"
        component={DoctorDetail}
      />
    </DashboardStack.Navigator>
  );
}

export default HomeStack;

const styles = StyleSheet.create({
  image: {
    width: 26,
    height: 26,
  },
  tabIconContainer: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    fontFamily: AppFonts.visbyMedium,
    color: placeholderText,
  },
  activeTabLabel: {
    fontSize: 10,
    marginTop: 4,
    fontFamily: AppFonts.visbyHeavy,
    color: '#7700FF',
  },
  tabBarStyle: {
    backgroundColor: defaultBackground,
    height: Platform.OS === 'android' ? 70 : 85,
    paddingBottom: Platform.OS === 'android' ? 0 : 18,
    paddingHorizontal: 5,
    borderTopWidth: 0,
  ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
        android: {
          elevation: 12,
          shadowColor: '#000000',
        },
      }),
  },
});