import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import { getStyles } from './Styles';
import Header from '../../components/Header';
import DoctorCard from '../../components/DoctorCard/Index';
import ConsultationCategoryCard from '../../components/ConsultationCategoryCard/ConsultationCategoryCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AppImages } from '../../constants/AppImages';
import useAuth from '../../hooks/useAuth';
import SmallBoxSkeleton from '../../components/SkeletonPlaceholder/SmallBoxSkeleton';

const OnlineConsultation = (props) => {
  const { navigation, route } = props;
  const { width, height } = Dimensions.get('window');
  const styles = getStyles(width, height);
  const [popularDoctors, setPopularDoctors] = useState([])
  const { getPopularDoctorCategoriesHandler, popularDoctorCategoriesData } = useAuth();


  const onPress = () => {
    navigation.navigate('SpecialistCategory');
  };


  const categoryData = [
    { name: 'Cardiologist', icon: AppImages.demoImage },
    { name: 'Dermatologist', icon: AppImages.demoImage },
    { name: 'Gastroenterologist', icon: AppImages.demoImage },
    { name: 'Cardiologist', icon: AppImages.demoImage },
    { name: 'Neurologist', icon: AppImages.demoImage },
  ];

  const doctors = [
    { name: 'Dr. Jason Miller', icon: AppImages.demoImage, specialty: 'Neurologist', rating: 4.9, fee: 30 },
    { name: 'Dr. Sarah Lee', icon: AppImages.demoImage, specialty: 'Dentist', rating: 4.7, fee: 40 },
    { name: 'Dr. Ahmed Khan', icon: AppImages.demoImage, specialty: 'Cardiologist', rating: 4.8, fee: 50 },
    { name: 'Dr. Lisa Wong', icon: AppImages.demoImage, specialty: 'Dermatologist', rating: 4.5, fee: 35 },
    { name: 'Dr. Jason Miller', icon: AppImages.demoImage, specialty: 'Neurologist', rating: 4.9, fee: 30 },
    { name: 'Dr. Sarah Lee', icon: AppImages.demoImage, specialty: 'Dentist', rating: 4.7, fee: 40 },
    { name: 'Dr. Ahmed Khan', icon: AppImages.demoImage, specialty: 'Cardiologist', rating: 4.8, fee: 50 },
    { name: 'Dr. Lisa Wong', icon: AppImages.demoImage, specialty: 'Dermatologist', rating: 4.5, fee: 35 },
  ];

  useEffect(() => {
    getPopularDoctorCategoriesHandler();
  }, []);

  useEffect(() => {
    // console.log('popular-doctor-categories:', popularDoctorCategoriesData)
    setPopularDoctors(popularDoctorCategoriesData?.popular_attendant)
  }, [popularDoctorCategoriesData]);





  return (
    <SafeAreaView style={styles.safeArea}>
      <Header navigation={navigation} title={'Online Consultation'} />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.searchButton}>
            <FontAwesome name="search" size={20} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Header Component */}
        <View style={styles.categoryContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Categories</Text>
            {/* <TouchableOpacity onPress={onPress}>
              <Text style={styles.headerButton}>See all</Text>
            </TouchableOpacity> */}
          </View>

          {!popularDoctorCategoriesData?.popular_category ? (
            <View style={[styles.categoryTilesContainer, styles.SmallBoxSkeletonStyle]}>
              {[...Array(5)].map((_, index) => (
                <SmallBoxSkeleton
                  key={index}
                  // highlightColor="#696B70"
                  // backgroundColor="#262A34"
                  width={58}
                  height={55}
                />
              ))}
            </View>
          ) : (
            <View style={styles.categoryTilesContainer}>
              {popularDoctorCategoriesData.popular_category.map((item, index) => (
                <ConsultationCategoryCard
                  handlePress={() => console.log('hello')}
                  key={index}
                  {...item}
                />
              ))}

              {popularDoctorCategoriesData.popular_category.length > 0 && (
                <ConsultationCategoryCard
                  handlePress={() => navigation.navigate('SpecialistCategory')}
                  icon={AppImages.othersIcon}
                />
              )}
            </View>
          )}




        </View>

        {/* Header Component */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Popular Doctors</Text>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.headerButton}>See all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={popularDoctors}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={true}
          renderItem={({ item, index }) => (
            <DoctorCard item={item} handlePress={() => { navigation.navigate('DoctorDetail') }} />
          )}
          contentContainerStyle={styles.contentContainerStyle}
          columnWrapperStyle={styles.row}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnlineConsultation;
