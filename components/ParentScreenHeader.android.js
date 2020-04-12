import React from 'react';
import PropTypes from 'prop-types';

// components
import { BoldText } from './Typography';
import Colors from '../constants/Colors';

import { View } from 'react-native';
import CustomStatusBar from './StatusBar';

function ParentScreenHeaderAndroid({ title, children }) {
  return (
    <View style={{ backgroundColor: Colors.backgroundColor }}>
      <CustomStatusBar />
      <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        <BoldText size="lg">{title}</BoldText>
        {children ? children : null}
      </View>
    </View>
  );
}

ParentScreenHeaderAndroid.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default ParentScreenHeaderAndroid;
