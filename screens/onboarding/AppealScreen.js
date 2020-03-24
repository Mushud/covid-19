import React from 'react';
import { View, TouchableOpacity, Text } from "react-native";
import { SimpleAnimation } from 'react-native-simple-animations'

const AppealScreen = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                marginHorizontal: 15
            }}
        >
            <SimpleAnimation delay={500} duration={1000} slide direction="up" staticType="fa">
                <Text style={{ fontFamily: 'bold', fontSize: 18}}>Fellow Ghanaian!</Text>
            </SimpleAnimation>
            <SimpleAnimation delay={1500} duration={1000} slide direction="up" staticType="fa">
                <Text style={{ fontFamily: 'bold', fontSize: 18}}>These are not ordinary times</Text>
            </SimpleAnimation>
            <SimpleAnimation delay={1500} duration={1000} slide direction="up" staticType="fa">
                <Text style={{ fontFamily: 'bold', fontSize: 18}}>Our very existence is being threatened by
                    <Text style={{ fontFamily: 'bold', color: '#3edac5', fontSize: 18}}> COVID-19</Text>
                </Text>

            </SimpleAnimation>

            <SimpleAnimation delay={2500} duration={3000} fade staticType="zoom">
                <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                        <View
                            style={{
                                borderColor: '#c3c3c3',
                                borderWidth: 1,
                                borderRadius: 5,
                                paddingVertical: 10,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ fontFamily: 'regular'}} >I'm ready! Lets get started . . .</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SimpleAnimation>
        </View>
    );
};

export default AppealScreen;
