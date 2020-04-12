import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Colors from '../constants/Colors';
import styled from 'styled-components';
import Button from '../components/shared/Button';
import { gql, useMutation } from '@apollo/client';

const symptoms = [
  { name: 'Dry Cough', key: 0 },
  { name: 'Tiredness', key: 1 },
  { name: 'Sore Throat', key: 2 },
  { name: 'Fever', key: 3 },
  { name: 'Aches and Pains', key: 4 },
  { name: 'Shortness of Breath', key: 5 },
];

const logVitalsMutation = gql`
  mutation(
    $aches: Int
    $tiredness: Int
    $soreThroat: Int
    $fever: Int
    $dryCough: Int
    $shortnessOfBreath: Int
  ) {
    recordVitals(
      input: {
        vitals: {
          aches: $aches
          tiredness: $tiredness
          soreThroat: $soreThroat
          fever: $fever
          dryCough: $dryCough
          shortnessOfBreath: $shortnessOfBreath
        }
      }
    ) {
      vitals {
        aches
        tiredness
      }
    }
  }
`;

const vitalsQuery = gql`
  query {
    userVitals {
      _id
      vitals {
        aches
        shortnessOfBreath
        dryCough
        fever
        tiredness
        soreThroat
      }
      createdAt
    }
  }
`;

const initialState = {
  tiredness: 0,
  shiver: 0,
  soreThroat: 0,
  fever: 0,
  dryCough: 0,
  aches: 0,
  shortnessOfBreath: 0,
};

export default function LogSymptoms({ navigation }) {
  const [symptomSev, setSymptom] = React.useState(initialState);
  const [logSymptoms, { loading, data, error }] = useMutation(logVitalsMutation, {
    variables: {
      ...symptomSev,
    },
    onCompleted: () => {
      Alert.alert('Success', 'Your vitals have been logged successfully');
      setSymptom(initialState);
      navigation.goBack();
    },
    onError: (e) => {
      console.log(e);
      Alert.alert('Error', 'Your vitals failed to log');
    },
    awaitRefetchQueries: true,
    refetchQueries: [{ query: vitalsQuery }],
  });

  function setSymptomSevere(key, number) {
    if (key === 0) {
      setSymptom({ ...symptomSev, dryCough: number });
    } else if (key === 1) {
      setSymptom({ ...symptomSev, tiredness: number });
    } else if (key === 2) {
      setSymptom({ ...symptomSev, soreThroat: number });
    } else if (key === 3) {
      setSymptom({ ...symptomSev, fever: number });
    } else if (key === 4) {
      setSymptom({ ...symptomSev, aches: number });
    } else if (key === 5) {
      setSymptom({ ...symptomSev, shortnessOfBreath: number });
    }
  }

  function mapSymptomToState(key) {
    if (key == 0) {
      return symptomSev.dryCough;
    } else if (key == 1) {
      return symptomSev.tiredness;
    } else if (key == 2) {
      return symptomSev.soreThroat;
    } else if (key == 3) {
      return symptomSev.fever;
    } else if (key == 4) {
      return symptomSev.aches;
    } else if (key == 5) {
      return symptomSev.shortnessOfBreath;
    }
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 15,
        backgroundColor: '#eeeeee',
      }}
    >
      <Text style={{ fontFamily: 'bold' }}>Symptoms Logging</Text>
      <View
        style={{
          height: 4,
          width: 50,
          backgroundColor: 'black',
          borderRadius: 20,
          marginVertical: 10,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {symptoms.map((item) => (
          <SymptonContainer>
            <Text style={{ fontFamily: 'bold' }}>{item.name}</Text>
            <View
              style={{
                borderTopColor: 'silver',
                borderTopWidth: 0.4,
                marginTop: 10,
                paddingVertical: 10,
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
              }}
            >
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => setSymptomSevere(item.key, 0)}
                  style={{
                    margin: 5,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    borderWidth: mapSymptomToState(item.key) === 0 ? 2 : 1,
                    backgroundColor: mapSymptomToState(item.key) === 0 ? '#a0aec0' : 'white',
                    borderColor: mapSymptomToState(item.key) === 0 ? '#a0aec0' : Colors.tintColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 20,
                      fontFamily: 'bold',
                      color: mapSymptomToState(item.key) === 0 ? 'white' : 'black',
                    }}
                  >
                    0
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontFamily: 'regular' }}>None</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => setSymptomSevere(item.key, 1)}
                  style={{
                    margin: 5,

                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    borderWidth: mapSymptomToState(item.key) === 1 ? 2 : 1,
                    backgroundColor: mapSymptomToState(item.key) === 1 ? '#a0aec0' : 'white',
                    borderColor: mapSymptomToState(item.key) === 1 ? '#a0aec0' : Colors.tintColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 20,
                      fontFamily: 'bold',
                      color: mapSymptomToState(item.key) === 1 ? 'white' : 'black',
                    }}
                  >
                    1
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontFamily: 'regular' }}>Mild</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => setSymptomSevere(item.key, 2)}
                  style={{
                    margin: 5,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    borderWidth: mapSymptomToState(item.key) === 2 ? 2 : 1,
                    backgroundColor: mapSymptomToState(item.key) === 2 ? '#a0aec0' : 'white',
                    borderColor: mapSymptomToState(item.key) === 2 ? '#a0aec0' : Colors.tintColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 20,
                      fontFamily: 'bold',
                      color: mapSymptomToState(item.key) === 2 ? 'white' : 'black',
                    }}
                  >
                    2
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontFamily: 'regular' }}>Mid</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => setSymptomSevere(item.key, 3)}
                  style={{
                    margin: 5,

                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    borderWidth: mapSymptomToState(item.key) === 3 ? 2 : 1,
                    backgroundColor: mapSymptomToState(item.key) === 3 ? '#a0aec0' : 'white',
                    borderColor: mapSymptomToState(item.key) === 3 ? '#a0aec0' : Colors.tintColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 20,
                      fontFamily: 'bold',
                      color: mapSymptomToState(item.key) === 3 ? 'white' : 'black',
                    }}
                  >
                    3
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontFamily: 'regular' }}>Semi</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => setSymptomSevere(item.key, 4)}
                  style={{
                    margin: 5,

                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    borderWidth: mapSymptomToState(item.key) === 4 ? 2 : 1,
                    backgroundColor: mapSymptomToState(item.key) === 4 ? '#a0aec0' : 'white',
                    borderColor: mapSymptomToState(item.key) === 4 ? '#a0aec0' : Colors.tintColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontFamily: 'bold',
                      fontSize: 20,
                      color: mapSymptomToState(item.key) === 4 ? 'white' : 'black',
                    }}
                  >
                    4
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontFamily: 'regular' }}>High</Text>
              </View>
            </View>
          </SymptonContainer>
        ))}
        <TouchableOpacity style={{ flex: 0.48 }} onPressIn={logSymptoms}>
          <Button
            loading={loading}
            style={{
              marginHorizontal: 5,
              backgroundColor: '#718096',
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: '#718096',
            }}
          >
            <Text style={{ color: '#ffffff', fontFamily: 'bold' }}>Log Vitals</Text>
          </Button>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const SymptonContainer = styled.View`
  box-shadow: 0px 12px 5px rgba(213, 213, 213, 0.5);
  margin: 5px 5px;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px 20px;
`;
