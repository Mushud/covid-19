import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import styled from 'styled-components';
import Button from "../components/shared/Button";

const symptoms = [
    { name: 'Dry Cough', key: 0 },
    { name: 'Tiredenss', key: 1 },
    { name: 'Sore Throat', key: 2 },
    { name: 'Fever', key: 3 },
    { name: 'Achnes and Pains', key: 4 },
    { name: 'Shortness of Breath', key: 5 }
];

export default function LogSymptoms({ navigation }) {
    const [symptomSev, setSymptom] = React.useState({
        tiredness: 0,
        shiver: 0,
        soreThroat: 0,
        fever: 0,
        dryCough: 0,
        AchnesnPains: 0,
        shortnessOfBreath: 0
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
            setSymptom({ ...symptomSev, AchnesnPains: number });
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
            return symptomSev.AchnesnPains;
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
                backgroundColor: '#eeeeee'
            }}
        >
            <Text style={{ fontFamily: 'bold' }}>Symptoms Logging</Text>
            <View
                style={{
                    height: 4,
                    width: 50,
                    backgroundColor: 'black',
                    borderRadius: 20,
                    marginVertical: 10
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
                                flexDirection: 'row'
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
                                        backgroundColor:
                                            mapSymptomToState(item.key) === 0
                                                ? '#a0aec0'
                                                : 'white',
                                        borderColor:
                                            mapSymptomToState(item.key) === 0
                                                ? '#a0aec0'
                                                : Colors.tintColor,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{ alignSelf: 'center', fontSize: 20, fontFamily: 'bold', color: mapSymptomToState(item.key) === 0 ? 'white' : 'black', }}>0</Text>
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'regular'}}>None</Text>
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
                                        backgroundColor:
                                            mapSymptomToState(item.key) === 1
                                                ? '#a0aec0'
                                                : 'white',
                                        borderColor:
                                            mapSymptomToState(item.key) === 1
                                                ? '#a0aec0'
                                                : Colors.tintColor,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{ alignSelf: 'center', fontSize: 20, fontFamily: 'bold', color: mapSymptomToState(item.key) === 1 ? 'white' : 'black', }}>1</Text>
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'regular'}}>Mild</Text>
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
                                        backgroundColor:
                                            mapSymptomToState(item.key) === 2
                                                ? '#a0aec0'
                                                : 'white',
                                        borderColor:
                                            mapSymptomToState(item.key) === 2
                                                ? '#a0aec0'
                                                : Colors.tintColor,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{ alignSelf: 'center', fontSize: 20, fontFamily: 'bold' , color: mapSymptomToState(item.key) === 2 ? 'white' : 'black', }}>2</Text>
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'regular'}}>Mid</Text>
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
                                        backgroundColor:
                                            mapSymptomToState(item.key) === 3
                                                ? '#a0aec0'
                                                : 'white',
                                        borderColor:
                                            mapSymptomToState(item.key) === 3
                                                ? '#a0aec0'
                                                : Colors.tintColor,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{ alignSelf: 'center', fontSize: 20, fontFamily: 'bold', color: mapSymptomToState(item.key) === 3 ? 'white' : 'black', }}>3</Text>
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'regular'}}>Semi</Text>
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
                                        backgroundColor:
                                            mapSymptomToState(item.key) === 4
                                                ? '#a0aec0'
                                                : 'white',
                                        borderColor:
                                            mapSymptomToState(item.key) === 4
                                                ? '#a0aec0'
                                                : Colors.tintColor,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{ alignSelf: 'center', fontFamily: 'bold', fontSize: 20, color: mapSymptomToState(item.key) === 4 ? 'white' : 'black', }}>4</Text>
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'regular'}}>High</Text>
                            </View>
                        </View>
                    </SymptonContainer>
                ))}
                <TouchableOpacity style={{ flex: 0.48}} onPressIn={() => navigation.navigate('Home') }>
                    <Button
                        style={{
                            marginHorizontal: 5,
                            backgroundColor: '#718096',
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: "#718096",
                        }}
                    >
                        <Text style={{ color: '#ffffff', fontFamily: 'bold' }}>
                            Report Case
                        </Text>
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
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 10px 20px;
`;