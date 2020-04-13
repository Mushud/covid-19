import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';

function Button({ children, loading, style }) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
          backgroundColor: Colors.tintColor,
          paddingVertical: 15,
          minHeight: 50,
          ...style,
        }}
      >
        {loading ? <ActivityIndicator color="#fff" /> : children}
      </View>
    </View>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
