import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, Text } from 'react-native';
import { BoldText, RegularText } from '../components/Typography';
import { Ionicons } from '@expo/vector-icons';
import Input from '../components/FormInput/Input';
import Button from '../components/FormInput/Button';
import { useQuery, gql, useMutation } from '@apollo/client';
import LoadingState from '../components/LoadingState';
import Colors from '../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';
import CountryPicker from 'react-native-country-picker-modal';
import ChildScreenHeader from '../components/ChildScreenHeader';

const userProfileQuery = gql`
  query {
    memberProfile {
      age
      gender
      lastCountriesVisited
      licenseNumber
    }
  }
`;

const editUserMutation = gql`
  mutation($gender: Gender, $age: Int, $lastCountriesVisited: [String], $licenseNumber: String) {
    editUserProfile(
      input: {
        gender: $gender
        age: $age
        lastCountriesVisited: $lastCountriesVisited
        licenseNumber: $licenseNumber
      }
    ) {
      gender
      age
      lastCountriesVisited
      licenseNumber
    }
  }
`;

function Profile({ navigation }) {
  const [profile, setProfile] = useState({
    age: 0,
    gender: '',
    licenseNumber: '',
  });
  const [countryOne, setCountryOne] = useState('Ghana');
  const [countryTwo, setCountryTwo] = useState('Ghana');
  const [countryOneCode, setCountryOneCode] = useState('GH');
  const [countryTwoCode, setCountryTwoCode] = useState('GH');

  const onCountryOneSelect = (country) => {
    setCountryOneCode(country.cca2);
    setCountryOne(country.name);
  };
  const onCountryTwoSelect = (country) => {
    setCountryTwoCode(country.cca2);
    setCountryTwo(country.name);
  };

  const { loading, data } = useQuery(userProfileQuery, {
    onCompleted: (data) => {
      setProfile({
        age: String(data.memberProfile.age),
        gender: String(data.memberProfile.gender).toLowerCase(),
        licenseNumber: data.memberProfile.licenseNumber,
      });

      setCountryOne(data.memberProfile.lastCountriesVisited[0] || 'Ghana');
      setCountryTwo(data.memberProfile.lastCountriesVisited[1] || 'Ghana');
    },
  });

  const [editUser, { loading: editUserLoading }] = useMutation(editUserMutation, {
    variables: {
      age: Number(profile.age),
      gender: profile.gender,
      licenseNumber: profile.licenseNumber,
    },
    onCompleted: () => {
      Alert.alert('You updated your profile successfully');
      navigation.goBack();
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ChildScreenHeader title="Profile" />

      {loading ? (
        <LoadingState />
      ) : (
        <>
          <KeyboardAwareScrollView style={{ padding: 20 }}>
            <BoldText>Personal Details</BoldText>

            <View style={{ marginBottom: 20, marginTop: 20 }}>
              <RegularText>Enter Age</RegularText>
              <Input
                keyboardType="numeric"
                value={profile.age}
                onChangeText={(value) =>
                  setProfile({
                    ...profile,
                    age: value,
                  })
                }
              />
            </View>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => setProfile({ ...profile, gender: 'female' })}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}>
                  <Ionicons
                    style={{ marginRight: 5 }}
                    name="ios-checkmark-circle"
                    size={25}
                    color={profile.gender === 'female' ? Colors.tintColor : 'grey'}
                  />
                  <RegularText>Female</RegularText>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setProfile({ ...profile, gender: 'male' })}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons
                    style={{ marginRight: 5 }}
                    name="ios-checkmark-circle"
                    size={25}
                    color={profile.gender === 'male' ? Colors.tintColor : 'grey'}
                  />
                  <RegularText>Male</RegularText>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20 }}>
              <BoldText>Travel History</BoldText>
              <RegularText style={{ marginBottom: 10 }}>
                Select the last two countries you visited (If Applicable)
              </RegularText>
              <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <CountryOption style={{ borderWidth: 1, borderColor: Colors.tintColor }}>
                    <CountryPicker
                      countryCode={countryOneCode}
                      withFlag={true}
                      onSelect={onCountryOneSelect}
                      visible={false}
                    />
                    <RegularText style={{ textAlign: 'center' }}>{countryOne}</RegularText>
                  </CountryOption>

                  <CountryOption style={{ borderWidth: 1, borderColor: Colors.tintColor }}>
                    <CountryPicker
                      countryCode={countryTwoCode}
                      withFlag={true}
                      onSelect={onCountryTwoSelect}
                      visible={false}
                    />
                    <RegularText style={{ textAlign: 'center' }}>{countryTwo}</RegularText>
                  </CountryOption>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <BoldText>Medical Professional Information</BoldText>
              <RegularText>Applicable if you are a health worker</RegularText>
            </View>

            <View style={{ marginTop: 20 }}>
              <RegularText>Health License Number</RegularText>
              <Input
                value={profile.licenseNumber}
                onChangeText={(value) =>
                  setProfile({
                    ...profile,
                    licenseNumber: value,
                  })
                }
              />
            </View>
          </KeyboardAwareScrollView>

          <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
            <TouchableOpacity onPress={editUser}>
              <Button loading={editUserLoading}>
                <RegularText style={{ color: '#fff' }}>Update Profile</RegularText>
              </Button>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const CountryOption = styled.View`
  border-radius: 5px;
  justify-content: center;
  min-height: 100px;
  align-items: center;
  padding: 5px 5px;
  margin: 5px;
  flex: 1;
  border: 1px solid #e3e3e3;
`;

export default Profile;
