import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import Input from '../components/FormInput/Input';
import Button from '../components/FormInput/Button';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useMutation, gql } from '@apollo/client';
import { BoldText } from '../components/Typography';
import ChildScreenHeader from '../components/ChildScreenHeader';

const reportCaseMutation = gql`
  mutation(
    $alternateContact: String
    $description: String
    $location: String
    $nearestLandmark: String
    $reporting: Reporting
  ) {
    reportCase(
      input: {
        alternateContact: $alternateContact
        description: $description
        location: $location
        nearestLandmark: $nearestLandmark
        reporting: $reporting
      }
    ) {
      description
    }
  }
`;

const reportedCasesQuery = gql`
  query {
      userReportedCases {
          _id
          nearestLandmark
          alternateContact
          reporting
          location
          description
          createdAt
      }
  }
`;

const options = [
  { title: 'Self', value: 'self' },
  { title: 'Other Individual', value: 'individual' },
];

const ReportCase = ({ navigation }) => {
  const [person, setPerson] = useState('self');
  const [landmark, setLandmark] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  const [reportCase, { loading }] = useMutation(reportCaseMutation, {
    variables: {
      reporting: person,
      nearestLandmark: landmark,
      location,
      alternateContact: phone,
      description,
    },
    onCompleted: () => {
      Alert.alert('Success', 'Your report has been made successfully');
      setPerson('self');
      setLandmark('');
      setLocation('');
      setPhone('');
      setDescription('');
      navigation.goBack();
    },
    onError: ({ graphQLErrors, networkError }) => {
      console.log('This is error', graphQLErrors, networkError);
      Alert.alert('Error', 'Failed to make report');
    },
    awaitRefetchQueries: true,
    refetchQueries: [{ query: reportedCasesQuery }],
  });

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <ChildScreenHeader title="Make Report" />
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View>
          <View>
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
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontFamily: 'bold', paddingLeft: 5 }}>Location or Digital Address</Text>
          <Input value={location} onChangeText={setLocation} placeholder="eg. GA-492-74" />
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
            }}
            underlineColorAndroid="transparent"
            placeholder="Type something"
            numberOfLines={5}
            multiline={true}
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 5, left: 20, right: 20 }}>
        <TouchableOpacity style={{ flex: 0.48 }} onPressIn={reportCase}>
          <Button
            loading={loading}
            style={{
              marginHorizontal: 0,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ color: '#ffffff', fontFamily: 'bold' }}>Report Case</Text>
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReportCase;
