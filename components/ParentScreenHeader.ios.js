import React from 'react';
import PropTypes from 'prop-types';

// components
import { BoldText } from './Typography';
import Colors from '../constants/Colors';
import CustomStatusBar from './StatusBar';
import { useQuery, gql } from '@apollo/client';

import { View } from 'react-native';

const memberProfileQuery = gql`
  query {
    memberProfile {
      caseName
    }
  }
`;

function ParentScreenHeaderIos({ title, children }) {
  return (
    <View
      style={{
        backgroundColor: Colors.backgroundColor,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 0.5,
      }}
    >
      <CustomStatusBar />
      <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
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
      </View>

      <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        <BoldText size="lg">{title}</BoldText>
        {children ? children : null}
      </View>
    </View>
  );
}

ParentScreenHeaderIos.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default ParentScreenHeaderIos;
