import React, { useState, useEffect, useLayoutEffect } from 'react';
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
import { getStyles } from './Styles';
import Header from '../../components/Header';
import DoctorCard from '../../components/DoctorCard/Index';
import ConsultationCategoryCard from '../../components/ConsultationCategoryCard/ConsultationCategoryCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AppImages } from '../../constants/AppImages';
import Metrics from '../../constants/Metrics';
import { AppConstants } from '../../constants/AppConstants';
import useAuth from '../../hooks/useAuth';
import SmallBoxSkeleton from '../../components/SkeletonPlaceholder/SmallBoxSkeleton';

const ITEM_WIDTH = 70;
const ITEM_HEIGHT = 68;

const SpecialistCategory = props => {
  const { navigation, route } = props;
  const { width, height } = Dimensions.get('window');
  const styles = getStyles(width, height);
  const [numColumns, setNumColumns] = useState(2);

  const { getCategoriesHandler, categoriesData } = useAuth();

  const onPress = () => {
    console.log('On Press');
  };



  const calculateColumns = () => {
    const { width } = Dimensions.get('window');
    const cols = Math.floor(width / ITEM_WIDTH) - 1;
    setNumColumns(cols > 1 ? cols : 1);
  };

  useEffect(() => {
    getCategoriesHandler();
  }, []);

  useEffect(() => {
    console.log('categoriesData:', categoriesData)
  }, [categoriesData]);


  useLayoutEffect(() => {
    calculateColumns();
    const subscription = Dimensions.addEventListener('change', calculateColumns);
    return () => subscription?.remove();
  }, []);



  return (
    <SafeAreaView style={styles.safeArea}>
      <Header navigation={navigation} title={'Categories'} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Choose A Cate1gory & Find the Specialist</Text>
        </View>


        <FlatList
          data={categoriesData?.length ? categoriesData : Array(9).fill({})} // 9 Skeletons if data is empty
          key={numColumns}
          numColumns={numColumns}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={true}
          renderItem={({ item, index }) =>
            categoriesData?.length ? (
              <ConsultationCategoryCard
                key={index}
                {...item}
                width={ITEM_WIDTH}
                height={ITEM_HEIGHT}
              />
            ) : (
              <View style={{ marginBottom: -33 }}>
                <SmallBoxSkeleton
                  key={index}
                  width={66}
                  height={63}
                // highlightColor="#696B70"
                // backgroundColor="#262A34"
                />
              </View>
            )
          }
          contentContainerStyle={styles.contentContainerStyle}
          columnWrapperStyle={styles.row}
        />

      </View>
    </SafeAreaView>
  );
};

export default SpecialistCategory;





