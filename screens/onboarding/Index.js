import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, ScrollView, AsyncStorage } from 'react-native';
import { SimpleAnimation } from 'react-native-simple-animations';

const Index = ({ navigation }) => {
  useEffect(() => {
    // We wipe any data left behind before we start application
    AsyncStorage.multiRemove(['syncStatus', 'personalDetails', 'travellingDetails']);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
            marginHorizontal: 15,
          }}
        >
          <SimpleAnimation delay={500} duration={2000} slide direction="up" staticType="fa">
            <Image
              source={require('../../assets/images/coa.png')}
              resizeMode="contain"
              style={{ height: 100, width: 100 }}
            />
          </SimpleAnimation>
          <SimpleAnimation delay={2500} duration={2000} slide direction="up" staticType="fa">
            <Text style={{ fontFamily: 'bold', fontSize: 20, marginBottom: 20 }}>
              Ghana Health Services
            </Text>
          </SimpleAnimation>
          <SimpleAnimation delay={6500} duration={3000} slide direction="up" staticType="fa">
            <Text
              style={{
                fontFamily: 'bold',
                color: '#da554b',
                fontSize: 24,
                textAlign: 'center',
                marginBottom: 50,
              }}
            >
              COVID-19 tracking and surveillance system
            </Text>
          </SimpleAnimation>
          <SimpleAnimation delay={9500} duration={2000} slide direction="up" staticType="fa">
            <Text
              style={{
                fontFamily: 'regular',
                fontSize: 17,
                textAlign: 'center',
                marginHorizontal: 10,
                marginBottom: 20,
              }}
            >
              This solution aims to provide assistance {'\n'}
              and make meaningful interventions as {'\n'}
              well as provide information and {'\n'}
              updates on the COVID {'\n'}
              pandemic
            </Text>
          </SimpleAnimation>
          <SimpleAnimation delay={11500} duration={2000} slide direction="up" staticType="fa">
            <Text
              style={{ textAlign: 'center', marginBottom: 20, marginTop: 50, fontFamily: 'bold' }}
            >
              Powered by:
            </Text>
            <View style={{ flexDirection: 'row', width: '90%' }}>
              <Image
                source={require('../../assets/images/medhist-logo.png')}
                resizeMode="contain"
                style={{ height: 100, width: 200, marginLeft: 30 }}
              />
              <Image
                source={require('../../assets/images/polymorph-logo.png')}
                resizeMode="contain"
                style={{ height: 100, width: 100, marginRight: 20 }}
              />
            </View>
          </SimpleAnimation>
          <SimpleAnimation delay={13500} duration={3000} fade staticType="zoom">
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity onPress={() => navigation.navigate('InformationScreen')}>
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
                  <Text style={{ fontFamily: 'regular' }}>Lets get started . . .</Text>
                </View>
              </TouchableOpacity>
            </View>
          </SimpleAnimation>
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
