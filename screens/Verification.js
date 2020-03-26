import React, { useRef } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { StyledHeader, StyledText } from '../components/Typography';
import Color from '../constants/Colors';
import PinView from 'react-native-pin-view';
import { useMutation, gql } from '@apollo/client';
import { showMessage } from 'react-native-flash-message';
import MessageImage from '../assets/images/message.png';
import { saveAuthToken } from '../utils';
import { Ionicons } from '@expo/vector-icons';

const validateLoginMutation = gql`
  mutation($phone: String!, $otp: String!) {
    validateLoginUser(input: { phone: $phone, otp: $otp }) {
      mobileToken
    }
  }
`;

function VerifyScreen({ navigation, route }) {
  const phone = route.params.phone;
  console.log('loooog', route.params);

  const [validateLoginUser, { loading }] = useMutation(validateLoginMutation, {
    onError: ({ graphqlErrors }) => {
      showMessage({
        type: 'warning',
        message: 'Invalid PIN',
      });
    },
    onCompleted: async ({ validateLoginUser }) => {
      await saveAuthToken(validateLoginUser.mobileToken);
      navigation.navigate('CountrySelection');
    },
  });
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <View>
          <StyledHeader style={{ fontSize: 25, color: '#434A59' }}>Verify Phone</StyledHeader>
        </View>

        <Image source={MessageImage} style={{ width: 250, height: 200 }} />
      </View>

      <View style={[styles.header, { marginTop: 10 }]}>
        <StyledHeader style={{ fontSize: 25 }}>Enter your verification pin</StyledHeader>
      </View>

      <View style={[styles.header, { marginTop: 5, paddingHorizontal: 20 }]}>
        <StyledText style={{ textAlign: 'center' }}>We have sent a code to {phone}</StyledText>
      </View>

      <View style={{ paddingHorizontal: 10, alignSelf: 'center', marginTop: 5 }}>
        <PinView
          pinLength={5}
          showInputs
          inputActiveBgColor={Color.buttonColor}
          inputViewStyle={{ backgroundColor: Color.tintColor }}
          buttonTextColor={Color.tintColor}
          inputTextStyle={{ color: '#fff' }}
          buttonBgColor="#fff"
          deleteText={<Ionicons name="ios-backspace" size={25} />}
          onComplete={(otp) => {
            validateLoginUser({
              variables: {
                phone,
                otp,
              },
            });
          }}
          keyboardViewStyle={{
            height: 60,
            width: 60,
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = {
  root: {
    marginTop: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'flex-start',
  },
  header: {
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  forgotPassword: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 17,
  },
  newUser: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
};

export default VerifyScreen;
