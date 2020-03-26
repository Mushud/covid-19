import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, AsyncStorage } from 'react-native';
import styled from 'styled-components';
import CountryPicker from 'react-native-country-picker-modal';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import CustomDatePicker from '../../components/shared/DatePickerInput';
import Button from '../../components/shared/Button';

const CountrySelection = ({ navigation }) => {
  const [date, setDate] = React.useState('Select Arrival Date');
  const [show, setShow] = React.useState(false);

  const [countryOne, setCountryOne] = useState(null);
  const [countryTwo, setCountryTwo] = useState(null);
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <TravellerExtras>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/coa.png')}
            resizeMode="contain"
            style={{ height: 80, width: 80 }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontFamily: 'bold', textAlign: 'center', fontSize: 18 }}>
            Last 2 countries visited
          </Text>
          <Text style={{ fontFamily: 'regular', textAlign: 'center' }}>
            Select the last country first
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CountryOption style={{ borderWidth: countryOne && 1, borderColor: Colors.tintColor }}>
              <CountryPicker
                countryCode={countryOneCode}
                withFlag={true}
                onSelect={onCountryOneSelect}
                visible={false}
              />
              {countryOne !== null && (
                <Text style={{ fontFamily: 'regular', textAlign: 'center' }}>{countryOne}</Text>
              )}
            </CountryOption>

            <CountryOption style={{ borderWidth: countryTwo && 1, borderColor: Colors.tintColor }}>
              <CountryPicker
                countryCode={countryTwoCode}
                withFlag={true}
                onSelect={onCountryTwoSelect}
                visible={false}
              />
              {countryTwo !== null && (
                <Text style={{ fontFamily: 'regular', textAlign: 'center' }}>{countryTwo}</Text>
              )}
            </CountryOption>
          </View>
        </View>
        <View style={{ marginTop: 40, marginBottom: 10 }}>
          <Text style={{ fontFamily: 'bold', textAlign: 'center', fontSize: 18 }}>
            When did you arrive ?{' '}
          </Text>
          <Text style={{ fontFamily: 'regular', textAlign: 'center' }}>
            The date you arrived in Ghana
          </Text>
        </View>
        <FormContainer>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setShow(true)}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 0.8,
                borderColor: '#e3e3e3',
                paddingVertical: 12,
                fontFamily: 'regular',
                paddingHorizontal: 20,
                marginBottom: 10,
                backgroundColor: '#fafafa',
                borderRadius: 5,
              }}
            >
              <View style={{ flex: 9, justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'regular', fontSize: 14 }}>
                  {typeof date === 'string'
                    ? date
                    : date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Ionicons
                  style={{ marginRight: 0 }}
                  name="ios-calendar"
                  size={24}
                  color="#e4e4e4"
                />
              </View>
            </View>
          </TouchableOpacity>
          {show && (
            <CustomDatePicker
              date={new Date()}
              exitOnClose={(date) => {
                setDate(date);
                setShow(false);
              }}
            />
          )}
        </FormContainer>
        <FormContainer style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={{ flex: 0.48 }}
            onPress={() => navigation.navigate('PersonalDetails')}
          >
            <Button
              style={{
                marginHorizontal: 0,
                backgroundColor: '#FFFFFF',
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: '#ff7066',
              }}
            >
              <Text style={{ color: '#ff7066', fontFamily: 'bold' }}>Skip</Text>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 0.48 }} onPressIn={onPressNext}>
            <Button
              style={{
                marginHorizontal: 0,
                backgroundColor: '#73afff',
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ color: '#ffffff', fontFamily: 'bold' }}>Next</Text>
            </Button>
          </TouchableOpacity>
        </FormContainer>
      </TravellerExtras>
    </ScrollView>
  );

  async function onPressNext() {
    console.log('Our countries', countryOne, countryTwo, date);
    const travellingDetails = JSON.stringify({
      countryOne,
      countryTwo,
      arrivalDate: date,
    });
    await AsyncStorage.setItem('travellingDetails', travellingDetails);
    await AsyncStorage.setItem('syncStatus', JSON.stringify(false));
    navigation.navigate('PersonalDetails');
  }
};

const CountryOption = styled.View`
  border-radius: 5px;
  justify-content: center;
  min-height: 100px;
  align-items: center;
  padding: 5px 5px;
  margin: 5px;
  background-color: white;
  flex: 1;
  border: 1px solid #d7d7d7;
`;

const FormContainer = styled.View`
  padding-horizontal: 5px;
`;

const TravellerExtras = styled.View`
  padding: 20px;
  margin-top: 50px;
`;
export default CountrySelection;
