import React, { useState } from 'react';
import styled from 'styled-components';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import Input from '../components/shared/Input';
import Button from '../components/shared/Button';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import KeyboardAwareScrollView from 'react-native-keyboard-aware-scrollview';

const options = [
  { title: 'Self', value: 'self' },
  { title: 'Other Individual', value: 'other' },
];

const ReportCase = ({ navigation }) => {
  const [person, setPerson] = useState('self');
  const [landmark, setLandmark] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <PersonalDetailsContainer>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <Text style={{ fontFamily: 'bold', textAlign: 'center', fontSize: 18 }}>
            Report a case
          </Text>
          <Text style={{ fontFamily: 'regular', textAlign: 'center' }}>
            Please provide your some important details
          </Text>
        </View>
        <View>
          <FormContainer>
            <Text style={{ fontFamily: 'bold', paddingLeft: 5 }}>Who are you reporting?</Text>
            <View style={{ flexDirection: 'row', paddingVertical: 10, flexWrap: 'wrap' }}>
              {options.map((value) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setPerson(value.value)}
                  style={{
                    paddingRight: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons
                    style={{ marginRight: 5 }}
                    name="ios-checkmark-circle"
                    size={25}
                    color={person === value.value ? Colors.tintColor : 'grey'}
                  />
                  <Text style={{ fontFamily: 'regular', fontSize: 14 }}>{value.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </FormContainer>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontFamily: 'bold', paddingLeft: 5 }}>Location or Digital Address</Text>
          <Input
            value={location}
            onChangeText={setLocation}
            placeholder="eg. GA-492-74"
            keyboardType="numeric"
          />
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ marginTop: 10, flex: 0.6, marginRight: 5 }}>
            <Text style={{ fontFamily: 'bold', paddingLeft: 5 }}>Nearest Landmark</Text>
            <Input
              value={landmark}
              onChangeText={setLandmark}
              placeholder="eg. Goil Fuel Station"
            />
          </View>
          <View style={{ marginTop: 10, flex: 0.4, marginLeft: 5 }}>
            <Text style={{ fontFamily: 'bold', paddingLeft: 5 }}>Alternate Contact</Text>
            <Input
              value={phone}
              onChangeText={setPhone}
              placeholder="Contact Number"
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontFamily: 'bold', paddingLeft: 5, paddingBottom: 5 }}>Description</Text>
          <TextInput
            style={{
              height: 100,
              paddingHorizontal: 10,
              paddingVertical: 20,
              fontFamily: 'regular',
              fontSize: 14,
              backgroundColor: 'white',
              borderWidth: 0.3,
              borderColor: '#ccc',
              borderRadius: 5,
            }}
            underlineColorAndroid="transparent"
            placeholder="Type something"
            numberOfLines={5}
            multiline={true}
          />
        </View>
        <FormContainer style={{ marginTop: 0 }}>
          <TouchableOpacity style={{ flex: 0.48 }} onPressIn={() => navigation.navigate('Home')}>
            <Button
              style={{
                marginHorizontal: 0,
                backgroundColor: '#73afff',
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: '#73afff',
              }}
            >
              <Text style={{ color: '#ffffff', fontFamily: 'bold' }}>Report Case</Text>
            </Button>
          </TouchableOpacity>
        </FormContainer>
      </PersonalDetailsContainer>
    </ScrollView>
  );
};

const PersonalDetailsContainer = styled.View`
  margin: 70px 20px 20px 20px;
  flex: 1;
`;

const FormContainer = styled.View``;

export default ReportCase;
