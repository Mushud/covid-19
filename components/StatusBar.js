import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Colors from '../constants/Colors';

const StatusBar = () => {
  return <View style={styles.statusBar} />;
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: Colors.backgroundColor,
    height: Constants.statusBarHeight,
  },
});

export default StatusBar;
