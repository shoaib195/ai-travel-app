import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getStyles} from './Styles';
import {AppConstants} from '../../constants/AppConstants';
import { storageBaseURL } from '../../config/config';

const ConsultationCategoryCard = props => {
  const {name, icon, width = 61, height = 60, title, icon_url, handlePress, navigation} = props;
  const styles = getStyles(width, height);
  // const fullIconUrl = `${storageBaseURL}${icon_url}`;


  // const handlePress = () => {
  //   console.log(`Doctor clicked: ${icon_url}`);
  // };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.imagePlaceholder}>
        <Image source={icon || { uri: icon_url }} style={styles.icon} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );
};

export default ConsultationCategoryCard;
