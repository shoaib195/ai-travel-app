import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {memo, useState} from 'react';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {colorTheme} from '../../constants/ColorConstants';
import {AppConstants} from '../../constants/AppConstants';
import Metrics from '../../constants/Metrics';

const {defaultBackground, dimGrayBorder, darkGrayBackground} = colorTheme;

const AvatarCard = ({type, url, image, onPress, icon, camera = true , apiLoading = false}) => {
  const [onLoadImage, setOnLoadImage] = useState(true);
  
  return type == 'url' && url ? (
    <React.Fragment>
      <TouchableOpacity
        disabled={apiLoading}
        onPress={onPress}
        activeOpacity={AppConstants.buttonActiveOpacity}>
        <ImageBackground
          resizeMode="contain"
          imageStyle={styles.userImageAvatar}
          source={{uri: url}}
          onLoadStart={() => setOnLoadImage(true)}
          onLoadEnd={() => setOnLoadImage(false)}
          style={styles.container}>
            {apiLoading &&   
            <ActivityIndicator
              size="large"
              color={dimGrayBorder}
              style={styles.imageLoader}
            />
            }
          {onLoadImage && (
            <ActivityIndicator
              size="large"
              color={dimGrayBorder}
              style={styles.imageLoader}
            />
          )}
        </ImageBackground>
      </TouchableOpacity>
    </React.Fragment>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={AppConstants.buttonActiveOpacity}>
      <ImageBackground
        imageStyle={styles.userImageAvatar}
        resizeMode="contain"
        source={image}
        style={styles.container}
      />
    </TouchableOpacity>
  );
};

export default memo(AvatarCard);

const styles = StyleSheet.create({
  container: {
    width: Metrics.widthRatio(100),
    height: Metrics.heightRatio(95),
    alignSelf: 'center',
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor:'#F1F6FB'
  },
  userImageAvatar: {
    width: Metrics.widthRatio(100),
    height: Metrics.heightRatio(95),
    borderRadius: 18,
    backgroundColor: darkGrayBackground,
  },
  imageLoader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: moderateScale(100),
  },
});