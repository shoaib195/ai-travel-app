import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './Style';
import { AppConstants } from '../../constants/AppConstants';

const DoctorCard = ({item,handlePress}) => {
  const { name, specialty, rating, fee, icon, consultation_fees, profile_image_url, specialist_category } = item;

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
   
      <View style={styles.imagePlaceholder}>
        <Image
          source={icon || { uri: profile_image_url }}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.name}>{name || AppConstants.DoctorCard.name}</Text>
      <Text style={styles.specialty}>{specialist_category}</Text>
      <View style={styles.footer}>
        <View style={styles.rating}>
          <FontAwesome name="star" size={14} color="gray" />
          <Text style={styles.ratingText}>{rating || AppConstants.DoctorCard.rating}</Text>
        </View>
        <Text style={styles.fee}>Fee ${consultation_fees || AppConstants.DoctorCard.fee}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorCard;
