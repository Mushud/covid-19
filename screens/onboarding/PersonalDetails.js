import React, { useState } from 'react';
import styled from 'styled-components';
import { View, Text, ScrollView, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';
import { useMutation, gql } from '@apollo/client';
import { showMessage } from 'react-native-flash-message';

const loginUserMutation = gql`
  mutation($phone: String!) {
    loginUser(input: { phone: $phone }) {
      success
    }
  }
`;

const PersonalDetails = ({ navigation }) => {
  const [surname, setSurname] = useState('');
  const [otherNames, setOtherNames] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [nationalID, setNationalID] = useState('');

  const [loginUser, { loading, data, error }] = useMutation(loginUserMutation, {
    variables: {
      phone,
    },
    onCompleted: async () => {
      await onCompleted();
    },
    onError: () => {
      showMessage({
        type: 'error',
        message:
          'Failed to send verification token. Please try again. ( Make sure you have internet connection )',
      });
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <PersonalDetailsContainer>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/coa.png')}
            resizeMode="contain"
            style={{ height: 80, width: 80 }}
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <Text style={{ fontFamily: 'bold', textAlign: 'center', fontSize: 18 }}>
            Personal Details
          </Text>
          <Text style={{ fontFamily: 'regular', textAlign: 'center' }}>
            Please provide your name and contact details
          </Text>
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ flex: 0.45, marginRight: 5 }}>
            <Input value={surname} onChangeText={setSurname} placeholder="Surname" />
          </View>
          <View style={{ flex: 0.55, marginLeft: 5 }}>
            <Input value={otherNames} onChangeText={setOtherNames} placeholder="Othernames" />
          </View>
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ flex: 0.65, marginRight: 5 }}>
            <Input value={nationalID} onChangeText={setNationalID} placeholder="National ID" />
          </View>
          <View style={{ flex: 0.35, marginLeft: 5 }}>
            <Input value={age} onChangeText={setAge} placeholder="Age" keyboardType="numeric"/>
          </View>
        </View>
        <View>
          <Input value={phone} onChangeText={setPhone} placeholder="Contact Number" keyboardType="numeric" />
        </View>
        <FormContainer style={{ marginTop: 0 }}>
          <TouchableOpacity style={{ flex: 0.48 }} onPressIn={loginUser}>
            <Button
              loading={loading}
              style={{
                marginHorizontal: 0,
                backgroundColor: '#73afff',
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: '#73afff',
              }}
            >
              <Text style={{ color: '#ffffff', fontFamily: 'bold' }}>Continue..</Text>
            </Button>
          </TouchableOpacity>
        </FormContainer>
      </PersonalDetailsContainer>
    </ScrollView>
  );

  async function onCompleted() {
    const personalDetails = JSON.stringify({
      phone,
      nationalID,
      age,
      surname,
      otherNames,
    });

    await AsyncStorage.setItem('personalDetails', personalDetails);
    navigation.navigate('VerifyScreen', { phone });
  }
};

const PersonalDetailsContainer = styled.View`
  margin: 70px 20px 20px 20px;
  flex: 1;
`;

const FormContainer = styled.View``;

export default PersonalDetails;
