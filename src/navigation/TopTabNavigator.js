import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colorTheme} from '../constants/ColorConstants';
import {moderateScale, scale} from 'react-native-size-matters';
import {AppFonts} from '../constants/AppFonts';
import Education from '../screens/OnlineConsultation/Education';
import Experience from '../screens/OnlineConsultation/Experience';
import Reviews from '../screens/OnlineConsultation/Reviews';
import About from '../screens/OnlineConsultation/About';
import Metrics from '../constants/Metrics';

const {primaryBackground, secondaryBorder, secondaryText, placeholderText} =
  colorTheme;
const Tab = createMaterialTopTabNavigator();

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity key={index} onPress={onPress} style={styles.tab}>
            <Text
              style={{
                color: isFocused ? '#000' : '#656565',
                fontFamily: AppFonts?.visbyRegular,
                fontSize: Metrics.generatedFontSize(12),
                marginRight: 18,
              }}>
              {options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name}
            </Text>
            {isFocused && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="AboutUs"
      screenOptions={{
        tabBarStyle: {display: 'none'}, // Hide the default tab bar
      }}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="About" component={About} />
      <Tab.Screen name="Education" component={Education} />
      <Tab.Screen name="Experience" component={Experience} />
      <Tab.Screen name="Reviews" component={Reviews} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    justifyContent: 'flex-start',
  },
  tab: {
    flex:1,
    // width: '25%', // Set your desired width here
    alignItems: 'center',
    // paddingLeft: moderateScale(0),
    paddingVertical: 0,
    backgroundColor:'#D9D9D9',
  },
  tabIndicator: {
    width: '75%',
    height: 1,
    backgroundColor: '#000',
    marginTop: Metrics.heightRatio(4),
    marginRight: moderateScale(19),
  },
});

export default TopTabNavigator;
