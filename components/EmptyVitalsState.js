import React from 'react';
import { TouchableOpacity, View, Platform } from 'react-native';
import AnimatedItem from './AnimatedItem';
import { RegularText } from './Typography';
import Button from './FormInput/Button';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';

function EmptyVitalsState() {
  const navigation = useNavigation();

  return (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', flex: 0.7, paddingHorizontal: 20 }}
    >
      {
        Platform.OS === 'ios' ? <AnimatedItem
          animation={require('../assets/animations/vitals.json')}
          style={{ height: 150, marginHorizontal: 40 }}
          loop={true}
        /> : null
      }
      <RegularText style={{ textAlign: 'center', marginBottom: 10, marginTop: 50 }}>
        You have not logged your vitals yet..
      </RegularText>
      <TouchableOpacity onPress={() => navigation.navigate('VitalsLog')}>
        <Button
          style={{
            borderWidth: 1,
            borderColor: Colors.tintColor,
            borderStyle: 'dashed',
            paddingHorizontal: 40,
            backgroundColor: 'transparent',
          }}
        >
          <RegularText>Log Vitals</RegularText>
        </Button>
      </TouchableOpacity>
    </View>
  );
}

export default EmptyVitalsState;
