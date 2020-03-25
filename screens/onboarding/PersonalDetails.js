import React, { useState } from "react";
import styled from "styled-components";
import {View, Text, ScrollView, Image, TouchableOpacity} from "react-native";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";

const PersonalDetails = ({ navigation }) => {

    const [surname, setSurname] = useState('');
    const [othernames, setOthernames] = useState('');
    const [phone, setPhone] = useState('');
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <PersonalDetailsContainer>
                <View style={{ justifyContent: "center", alignItems: "center"}}>
                    <Image source={require("../../assets/images/coa.png")} resizeMode="contain" style={{ height: 80, width: 80}} />
                </View>
                <View style={{ marginTop: 10, marginBottom: 20}}>
                    <Text style={{ fontFamily: "bold", textAlign: "center", fontSize: 18}}>Personal Details</Text>
                    <Text style={{ fontFamily: "regular", textAlign: "center"}}>Please provide your name and contact details</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, }}>
                    <View style={{ flex: 0.45, marginRight: 5 }}>
                        <Input value={surname} onChangeText={setSurname} placeholder="Surname" />
                    </View>
                    <View style={{ flex: 0.55, marginLeft: 5 }}>
                        <Input value={othernames} onChangeText={setOthernames} placeholder="Othernames" />
                    </View>
                </View>
                <View >
                    <Input value={phone} onChangeText={setPhone} placeholder="Contact Number" />
                </View>
                <FormContainer style={{ marginTop: 0}}>
                    <TouchableOpacity style={{ flex: 0.48}} onPressIn={() => navigation.navigate('Home') }>
                        <Button
                            style={{
                                marginHorizontal: 0,
                                backgroundColor: '#73afff',
                                paddingHorizontal: 10,
                                borderWidth: 1,
                                borderColor: "#73afff"

                            }}
                        >
                            <Text style={{ color: '#ffffff', fontFamily: 'bold' }}>
                                Continue..
                            </Text>
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

const FormContainer = styled.View`

`;

export default PersonalDetails;
