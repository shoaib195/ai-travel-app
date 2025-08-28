import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import DoctorCard from '../../components/DoctorCard/Index';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import TabComponent from '../../components/TabComponent/Index';
import { NavGrid } from '../../components';
import { AppImages } from '../../constants/AppImages';

const OnlineConsultationScreen = () => {

    const navigation = useNavigation();

    const navButtons = [
        { label: `HOME\nCARE`, icon: AppImages.congratulation, onPress: () => console.log('Home Care') },
        { label: 'BOOK AN\nATTENDANT', icon: AppImages.google, onPress: () => console.log('Book Attendant') },
        { label: 'ONLINE\nCONSULTATION', icon: AppImages.google, onPress: () => navigation.navigate('OnlineConsultation') },
        { label: 'MEDICAL\nHISTORY', icon: AppImages.congratulation, onPress: () => console.log('Medical History') },
    ];

    const tabsData = [
        {
            name: 'Processed', count: 2, data: (
                <>
                    <Text>Order 1</Text>
                    <Text>Order 2</Text>
                    <Text>Order 2</Text>
                    <Text>Order 2</Text>
                    <Text>Order 2</Text>
                    <Text>Order 2</Text>
                </>
            )
        },
        { name: 'Pending', count: 1, data: <NavGrid buttons={navButtons} /> },
    ];

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };


    const doctors = [
        { name: 'Dr. Jason Miller', specialty: 'Neurologist', rating: 4.9, fee: 30 },
        { name: 'Dr. Sarah Lee', specialty: 'Dentist', rating: 4.7, fee: 40 },
        { name: 'Dr. Ahmed Khan', specialty: 'Cardiologist', rating: 4.8, fee: 50 },
        { name: 'Dr. Lisa Wong', specialty: 'Dermatologist', rating: 4.5, fee: 35 },
        { name: 'Dr. Jason Miller', specialty: 'Neurologist', rating: 4.9, fee: 30 },
        { name: 'Dr. Sarah Lee', specialty: 'Dentist', rating: 4.7, fee: 40 },
        { name: 'Dr. Ahmed Khan', specialty: 'Cardiologist', rating: 4.8, fee: 50 },
        { name: 'Dr. Lisa Wong', specialty: 'Dermatologist', rating: 4.5, fee: 35 },
    ];


    return (
        <>
            <View style={styles.container}>
                <Header navigation={navigation} title="Online Consultation" />
                <FlatList
                    data={doctors}
                    renderItem={({ item }) => <DoctorCard {...item} />}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    contentContainerStyle={{ padding: 8 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                />
            </View>

            <View>
                <TabComponent tabs={tabsData} onTabChange={(tab) => console.log('Selected Tab: ', tab.name)} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OnlineConsultationScreen;