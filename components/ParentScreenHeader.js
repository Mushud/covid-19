import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image } from 'react-native';
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
        backgroundColor: '#18b88d',
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
            <Image
              source={require('../assets/images/placeholder-image.png')}
              style={{
                width: '100%',
                height: '100%',
                borderColor: 'white',
                borderWidth: 5,
                borderRadius: 50,
              }}
            />
          </View>
        </TouchableOpacity>
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <BoldText style={{ color: 'white' }} size="lg">
            {title}
          </BoldText>
          {children ? children : null}
        </View>
      </View>
    </View>
  );
}

ParentScreenHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default ParentScreenHeader;
