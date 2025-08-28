import React, {memo, useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../../constants/AppImages';
import { getStyles } from './Style';
import { colorTheme } from '../../constants/ColorConstants';

const {defaultBackground} = colorTheme;

const Header = ({
  title,
  cancelButton,
  screenName,
  skipButton,
  notificationBell,
  noIcons,
  main,
  skipStyle = {},
  customNavigator,
  navigation,
  onRightIconPress,
  rightIcon,
  leftTitle,
  ...props
}) => {
  const [getLoader, setLoader] = useState(false);
  const goBack = () => {
    const canGoBack = navigation?.canGoBack();
    if (canGoBack) {
      navigation.goBack();
    }
  };
  const styles = getStyles(screenName);
  return (
    <View style={styles.mainContainer}>
      {leftTitle ? (
        <View style={styles.LeftTitleContainer}>
          {leftTitle && (
            <Text style={styles.LeftTitleTextStyle}> {leftTitle} </Text>
          )}
        </View>
      ) : (
        <>
          <View style={styles.iconContainer}>
            {navigation && !main && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.navigationView}
                onPress={() => {
                  customNavigator ? customNavigator() : goBack();
                }}>
                <Icon
                  name="keyboard-arrow-left"
                  size={30}
                  color={defaultBackground}
                />
              </TouchableOpacity>
            )}
            {navigation && main && !noIcons && (
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                activeOpacity={0.7}
                style={styles.menuIconView}>
                <Image source={AppImages.Menu} style={styles.menuIcon} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.titleContainer}>
            {title && <Text style={styles.titleStyle}> {title} </Text>}
          </View>
        </>
      )}

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
        {skipButton && (
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.skipStyle}>skip</Text>
          </TouchableOpacity>
        )}
        {rightIcon && onRightIconPress && (
          <TouchableOpacity activeOpacity={0.7} onPress={onRightIconPress}>
            <Image style={styles.rightIcon} source={rightIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default memo(Header);
