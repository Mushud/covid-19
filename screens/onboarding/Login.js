import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Colors from '../../constants/Colors';
import { BoldText, RegularText } from '../../components/Typography';
import Button from '../../components/FormInput/Button';
import Input from '../../components/FormInput/Input';
import { useMutation } from '@apollo/client';
import { loginUserMutation } from '../../graphql/mutations';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showMessage } from 'react-native-flash-message';
import CountryPicker from 'react-native-country-picker-modal';
import styled from 'styled-components';

const imgOption1 = require('../../assets/images/use-covid.jpeg');

const Login = ({ navigation }) => {
  StatusBar.setBarStyle('light-content');

  // states........

  const [countryCode, setCountryCode] = React.useState('GH');
  const onCountrySelect = (country) => {
    setCountryCode(country.cca2);
  };

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  function loginMember() {
    setLoading(true);
    setTimeout(() => {
      navigation.navigate('Verification', { phone });
      setLoading(false);
    }, 3000);
  }

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
              CO
              <BoldText style={{ color: 'red', textAlign: 'center', fontSize: 70 }}>VERS</BoldText>
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
          <View style={{ flexDirection: 'row', borderRadius: 10 }}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                marginTop: 10,
                backgroundColor: '#e9e9e9',
                borderTopLeftRadius: 15,

                marginRight: 10,
              }}
            >
              <CountryPicker
                countryCode={countryCode}
                withCallingCode={true}
                countryCodes={[
                  'DZ',
                  'AO',
                  'BJ',
                  'BW',
                  'BF',
                  'BI',
                  'CM',
                  'CV',
                  'CF',
                  'TD',
                  'KM',
                  'CG',
                  'CD',
                  'CI',
                  'DJ',
                  'EG',
                  'GQ',
                  'ER',
                  'ET',
                  'GA',
                  'GM',
                  'GH',
                  'GN',
                  'GW',
                  'KE',
                  'LS',
                  'LR',
                  'LY',
                  'MG',
                  'MW',
                  'ML',
                  'MR',
                  'MU',
                  'YT',
                  'MA',
                  'MZ',
                  'NA',
                  'NE',
                  'NG',
                  'RW',
                  'ST',
                  'SN',
                  'SC',
                  'SL',
                  'SO',
                  'ZA',
                  'SS',
                  'SZ',
                  'TZ',
                  'TG',
                  'TN',
                  'UG',
                  'ZM',
                  'ZW',
                ]}
                withFlag={true}
                onSelect={onCountrySelect}
                visible={false}
              />
            </View>
            <View style={{ flex: 0.8 }}>
              <Input
                textSize={18}
                placeholderLabel="Phone Number"
                placeholderTextColor={Colors.tintColor}
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
          </View>

          <TouchableOpacity
            disabled={phone.length < 10 || Number(phone.charAt(0)) !== 0}
            style={{ width: '100%' }}
            onPressIn={loginMember}
          >
            <Button
              style={{
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
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
        </ImageBackground>
      </View>
    </KeyboardAwareScrollView>
  );
};

const CountryOption = styled.View`
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  padding: 5px 5px;
  margin: 5px 0;
  flex: 1;
  background: #385c78;
`;

export default Login;
