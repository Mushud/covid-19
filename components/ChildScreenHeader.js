import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { BoldText } from './Typography';
import { Ionicons } from '@expo/vector-icons';

function ChildScreenHeader({ title }) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('focus', () => {
      StatusBar.setBarStyle('light-content');
    });

    return function () {
      navigation.removeListener('focus');
      StatusBar.setBarStyle('dark-content');
    };
  }, [navigation]);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
      <View/>
      <BoldText size="md">{title}</BoldText>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="ios-close" size={25} />
      </TouchableOpacity>
    </View>
  );
}

export default ChildScreenHeader;
