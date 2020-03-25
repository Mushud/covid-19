import React from 'react';
import { TextInput, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { RFValue } from 'react-native-responsive-fontsize';


function Input({ placeholderLabel, placeholderPrefix, ...props }) {

  return (
    <View style={{
      flexDirection: 'row',
      borderWidth: 0.3,
      justifyContent: 'space-between',
      borderColor: '#ccc',
      backgroundColor: '#fff',
      paddingHorizontal: 15,
      borderRadius: 5,
      marginTop: 10,
    }}
    >
      <View style={{
        justifyContent: 'center',
        paddingVertical: 15,
      }}
      >
        {(placeholderPrefix)
          ? (
            <Text style={{ fontSize: RFValue(12), paddingRight: 1 }}>
              {placeholderPrefix}
            </Text>
          )
          : null}
      </View>
      <TextInput
        style={{
          flex: 5,
          fontFamily: 'regular',
          color: '#222222',
          paddingVertical: 12,
            fontSize: 14
        }}
        {...props}
      />
      {
        placeholderLabel ? (
          <View style={{
            justifyContent: 'center', paddingVertical: 12,
          }}
          >
            <Text style={{ fontSize: RFValue(13), color: "#dedede" }}>{placeholderLabel}</Text>
          </View>

        ) : null
      }
    </View>
  );
}

Input.propTypes = {
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  placeholder: '',
};

export default Input;
