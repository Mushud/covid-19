import React, { useState } from 'react';
import {Image, Text, TouchableOpacity, View, ScrollView} from "react-native";
import Introduction from "../../components/onboarding/Introduction";
import {SimpleAnimation} from "react-native-simple-animations";


const Index = ({ navigation }) => {

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 100,
                    marginHorizontal: 15
                }}
            >
                <SimpleAnimation delay={500} duration={2000} slide direction="up" staticType="fa">
                    <Image source={require("../../assets/images/coa.png")} resizeMode="contain" style={{ height: 200, width: 200}} />
                </SimpleAnimation>
                <SimpleAnimation delay={2500} duration={2000} slide direction="up" staticType="fa">
                    <Text style={{ fontFamily: 'bold', fontSize: 24, marginBottom: 20}}>Fellow Ghanaian!</Text>
                </SimpleAnimation>
                <SimpleAnimation delay={4500} duration={2000} slide direction="down" staticType="fa">
                    <Text style={{ fontFamily: 'bold', fontSize: 24, marginBottom: 5}}>These are not ordinary times</Text>
                </SimpleAnimation>
                <SimpleAnimation delay={6500} duration={3000} slide direction="up" staticType="fa">
                    <Text style={{ fontFamily: 'bold', fontSize: 24, textAlign: "center", marginBottom: 5}}>Our very existence is being</Text>
                </SimpleAnimation>
                <SimpleAnimation delay={6500} duration={3000} slide direction="up" staticType="fa">
                    <Text style={{ fontFamily: 'bold', color: '#da554b', fontSize: 24, textAlign: "center", marginBottom: 50}}>  threatened by COVID-19</Text>
                </SimpleAnimation>
                <SimpleAnimation delay={9500} duration={2000} slide direction="up" staticType="fa">
                    <Text style={{ fontFamily: 'bold', fontSize: 24, textAlign: "center"}}> The Ghana Health Service</Text>
                </SimpleAnimation>
                <SimpleAnimation delay={11500} duration={2000} slide direction="up" staticType="fa">
                    <Text style={{ fontFamily: 'bold', fontSize: 24, textAlign: "center", marginBottom: 20}}> needs your help!!!</Text>
                </SimpleAnimation>
                <SimpleAnimation delay={13500} duration={3000} fade staticType="zoom">
                    <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('CountrySelection')}>
                            <View
                                style={{
                                    borderColor: '#5fb1c3',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    paddingVertical: 13,
                                    paddingHorizontal: 20,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ fontFamily: 'regular'}}>Lets get started . . .</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </SimpleAnimation>
            </View>
        </ScrollView>
    );
};

export default Index;
