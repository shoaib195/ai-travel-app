import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppFonts } from '../../constants/AppFonts';
import Metrics from '../../constants/Metrics';

const TabComponent = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    onTabChange(tabs[activeTab]);
  }, [activeTab]);

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => handleTabPress(index)}
          >
            <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
              {tab.name} {tab.count && `(${tab.count})`}
            </Text>
            {activeTab === index && <View style={styles.underline} />}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {tabs[activeTab]?.data}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tab: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  tabText: {
    fontFamily: AppFonts.visbyRegular,
    color: '#656565',
    fontSize: Metrics.generatedFontSize(12),
  },
  activeTabText: {
    fontFamily: AppFonts.visbyRegular,
    color: '#000',
    fontSize: Metrics.generatedFontSize(12)
  },
  underline: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
    marginTop: 3,
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
});

export default TabComponent;
