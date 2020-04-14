import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import AnimatedItem from './AnimatedItem';
import { RegularText } from './Typography';
import Button from './FormInput/Button';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';

function EmptyCaseReportsState() {
  const navigation = useNavigation();

  return (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', flex: 0.7, paddingHorizontal: 20 }}
    >
      <AnimatedItem
        animation={require('../assets/animations/emptycases.json')}
        style={{ height: 180, width: 180 }}
        loop={true}
      />
      <RegularText style={{ textAlign: 'center', marginBottom: 10, marginTop: 50 }}>
        You have not made any case reports
      </RegularText>
      <TouchableOpacity onPress={() => navigation.navigate('MakeCaseReport')}>
        <Button
          style={{
            borderWidth: 1,
            borderColor: Colors.tintColor,
            borderStyle: 'dashed',
            paddingHorizontal: 40,
            backgroundColor: 'transparent',
          }}
        >
          <RegularText>Make Case Report</RegularText>
        </Button>
      </TouchableOpacity>
    </View>
  );
}

export default EmptyCaseReportsState;
