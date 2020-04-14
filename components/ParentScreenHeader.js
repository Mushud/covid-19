import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// components
import { BoldText } from './Typography';
import Colors from '../constants/Colors';
import CustomStatusBar from './StatusBar';
import { Ionicons } from '@expo/vector-icons';
import { NotificationContext } from '../context/Notification';

function ParentScreenHeader({ title, children }) {
  const navigation = useNavigation();
  const { openNotificationScreen } = useContext(NotificationContext);

  return (
    <View
      style={{
        backgroundColor: Colors.backgroundColor,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 0.5,
      }}
    >
      <CustomStatusBar />
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View
            style={{
              height: 36,
              width: 36,
              borderRadius: 18,
              backgroundColor: '#e3e3e3',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <BoldText style={{ color: '#ffffff' }}>RA</BoldText>
          </View>
        </TouchableOpacity>

        <View>
          <TouchableOpacity onPress={openNotificationScreen}>
            <Ionicons name="ios-notifications-outline" size={35} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        <BoldText size="lg">{title}</BoldText>
        {children ? children : null}
      </View>
    </View>
  );
}

ParentScreenHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default ParentScreenHeader;
