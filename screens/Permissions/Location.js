import React from 'react';
import { View, Text, ScrollView, TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import AnimatedItem from '../../components/AnimatedItem';
import Button from '../../components/shared/Button';

async function getLocationPermissionAsync(navigation) {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status === 'granted') {
    navigation.navigate('Home');
  } else {
    navigation.navigate('Home');
  }
}
const LocationPermission = ({navigation}) => {
  return(
    <View>
      <ScrollView>
        <View>
          <Text>
            We would need your location for emergency response
          </Text>
          <AnimatedItem
            style={{
              width: '70%',
              height: '30%'
              // width: widthPercentageToDP('70%'),
              // height: heightPercentageToDP('30%'),
            }}
            animation={require('../../assets/animations/location')}
          />
          <TouchableOpacity
            onPress={() => getLocationPermissionAsync(navigation)}
          >
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
                Report Case
              </Text>
            </Button>
          </TouchableOpacity>


        </View>
      </ScrollView>
    </View>
  );
};

export default LocationPermission;