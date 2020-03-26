import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

const InformationScreen = ({ navigation }) => {
  return(
    <View style={{ flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{ backgroundColor: 'white', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f1f1f1', paddingBottom: 10 }}>
        <View style={{ marginTop: 50, paddingHorizontal: 20, marginBottom: 0, flex: 0.9 }}>
          <Text style={{ fontFamily: 'bold', fontSize: 22 }}>General Information</Text>
          <Text style={{ fontFamily: 'regular' }}>From Ghana Health Services</Text>
        </View>
      </View>
      <ScrollView>
        <View style={{ paddingTop: 10,  marginHorizontal: 20}}>
          <Text style={{fontFamily: 'bold', fontSize: 16 }}>Important</Text>
          <Text style={{ fontFamily: 'regular', fontSize: 16, textAlign: "left",}}>
            Please provide as much and as accurate information as possible to help in the fight of this pandemic.
          </Text>
        </View>
        <View style={{ paddingTop: 10,  marginHorizontal: 20}}>
          <Text style={{fontFamily: 'bold', fontSize: 16}}>Privacy & Data Protection</Text>
          <Text style={{ fontFamily: 'regular', fontSize: 16, textAlign: "left",}}>
            The information you provide is Protected by the Data Protection Laws of Ghana. It shall be used only for
            the purposes of managing COVID-19
          </Text>
        </View>

        <View style={{ marginTop: 20, marginHorizontal: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')}>
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
      </ScrollView>
    </View>
  );
};
  export default InformationScreen;