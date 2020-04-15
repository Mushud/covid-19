import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Colors from '../../constants/Colors';
import { BoldText, RegularText, StyledText } from '../../components/Typography';
import Button from '../../components/FormInput/Button';
import Input from '../../components/FormInput/Input';
import { useMutation } from '@apollo/client';
import { loginUserMutation } from '../../graphql/mutations';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showMessage } from 'react-native-flash-message';

const imgOption1 = require('../../assets/images/use-covid.jpeg');

const Login = ({ navigation }) => {
  StatusBar.setBarStyle('light-content');

  // states........
  const [phone, setPhone] = useState('');
  const [loginMember, { loading }] = useMutation(loginUserMutation, {
    variables: {
      phone,
    },
    onCompleted: (data) => {
      navigation.navigate('Verification', { phone });
    },
    onError: ({ graphQLErrors, networkError }) => {
      console.log('Error occurred', graphQLErrors, networkError);
      showMessage({
        type: 'warning',
        message: 'Oops, error occurred',
        description: 'Please check your network connection and try again',
      });
    },
  });

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      style={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}
    >
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={imgOption1}
          imageStyle={{ opacity: 0.6, flex: 1 }}
          style={{
            backgroundColor: '#000',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 40,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ justifyContent: 'center' }}>
            <BoldText
              size="lg"
              style={{
                textAlign: 'center',
                lineHeight: 75,
                color: '#ffffff',

                fontSize: 70,
              }}
            >
              COVERS
            </BoldText>
            <BoldText style={{ color: '#fff', textAlign: 'center' }} size="sm">
              (COVID-19 EMERGENCY RESPONSE SOLUTION)
            </BoldText>
          </View>

          <RegularText
            size="sm"
            style={{
              textAlign: 'center',
              color: 'white',
              paddingBottom: 40,
            }}
          >
            Join the effort by well-meaning Africans using technology to slow down and eventually
            halt the spread of COVID-19
          </RegularText>
          <Input
            placeholderLabel="Phone Number"
            placeholderTextColor={Colors.tintColor}
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
            maxLength={10}
          />

          <TouchableOpacity
            disabled={phone.length < 10 || Number(phone.charAt(0)) !== 0}
            style={{ width: '100%' }}
            onPressIn={loginMember}
          >
            <Button
              style={{
                backgroundColor:
                  phone.length === 10 && Number(phone.charAt(0)) === 0 ? '#48bb78' : '#7f7f7f',
              }}
            >
              {!loading ? (
                <RegularText size="sm" style={{ color: '#fff' }}>
                  Get Started
                </RegularText>
              ) : (
                <ActivityIndicator color="#ffffff" />
              )}
            </Button>
          </TouchableOpacity>

          <View style={{ marginTop: 10 }}>
            <StyledText>Beta 0.1.2</StyledText>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
