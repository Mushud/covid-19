import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { material, iOSUIKit } from 'react-native-typography';

const StyledText = (props) => {
  if (props.bible) {
    return <Text {...props} style={[{ fontFamily: 'bible', color: '#3E4E5B' }, props.style]} />;
  }
  if (props.bibleItalic) {
    return (
      <Text {...props} style={[{ fontFamily: 'bible-italic', color: '#3E4E5B' }, props.style]} />
    );
  }
  if (props.menu) {
    return (
      <Text
        {...props}
        style={[{ fontFamily: 'regular', color: '#3E4E5B', fontSize: 13 }, props.style]}
      />
    );
  }
  return <Text {...props} style={[{ fontFamily: 'regular', color: '#3E4E5B' }, props.style]} />;
};

const StyledHeader = (props) => {
  if (props.light) {
    return <Text {...props} style={[{ fontFamily: 'light', color: '#000' }, props.style]} />;
  }
  return <Text {...props} style={[{ fontFamily: 'bold', color: '#000' }, props.style]} />;
};

const StyledSubtitle = (props) => {
  return <Text {...props} style={[{ fontFamily: 'regular', color: '#465867' }, props.style]} />;
};

const RegularText = ({ style = {}, size, ...restProps }) => {
  return <Text {...restProps} style={[fontStyles[size], styles.regular, style]} />;
};

const BoldText = ({ style = {}, size, ...restProps }) => {
  return <Text {...restProps} style={[fontStyles[size], styles.bold, style]} />;
};

RegularText.defaultProps = {
  size: 'sm',
};

BoldText.defaultProps = {
  size: 'sm',
};

const fontStyles = {
  sm: Platform.OS === 'ios' ? iOSUIKit.footnote : material.body1,
  md: Platform.OS === 'ios' ? iOSUIKit.body : material.headline,
  lg: Platform.OS === 'ios' ? iOSUIKit.largeTitleEmphasized : material.display1,
};

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'regular',
  },

  bold: {
    fontFamily: 'bold',
  },
});

export { StyledHeader, StyledText, StyledSubtitle, BoldText, RegularText };
