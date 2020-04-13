import React from 'react';
import { TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { RFValue } from 'react-native-responsive-fontsize';
import { RegularText, StyledSubtitle } from '../Typography';

function Input({ placeholderLabel, placeholderPrefix, placeholderTextColor, ...props }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 0.3,
        justifyContent: 'space-between',
        borderColor: '#ccc',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        marginTop: 10,
        height: 50,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          paddingVertical: 15,
        }}
      >
        {placeholderPrefix ? (
          <StyledSubtitle style={{ fontSize: RFValue(12), paddingRight: 1 }}>
            {placeholderPrefix}
          </StyledSubtitle>
        ) : null}
      </View>
      <TextInput
        style={{
          flex: 5,
          fontFamily: 'regular',
          color: '#222222',
          paddingVertical: 12,
          fontSize: 14,
        }}
        {...props}
      />
      {placeholderLabel ? (
        <View
          style={{
            justifyContent: 'center',
            paddingVertical: 12,
          }}
        >
          <RegularText
            style={{
              fontSize: RFValue(13),
              color: placeholderTextColor ? placeholderTextColor : '#dedede',
            }}
          >
            {placeholderLabel}
          </RegularText>
        </View>
      ) : null}
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
