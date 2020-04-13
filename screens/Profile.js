import React, { useEffect, useState } from 'react';
import { View, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { BoldText, RegularText } from '../components/Typography';
import { Ionicons } from '@expo/vector-icons';
import Input from '../components/FormInput/Input';
import Button from '../components/FormInput/Button';
import { useQuery, gql, useMutation } from '@apollo/client';
import LoadingState from '../components/LoadingState';
import Colors from '../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const userProfileQuery = gql`
  query {
    memberProfile {
      age
      gender
    }
  }
`;

const editUserMutation = gql`
  mutation($gender: Gender, $age: Int) {
    editUserProfile(input: { gender: $gender, age: $age }) {
      gender
      age
    }
  }
`;

function Profile({ navigation }) {
  useEffect(() => {
    navigation.addListener('focus', () => {
      StatusBar.setBarStyle('light-content');
    });

    return function () {
      navigation.removeListener('focus');
      StatusBar.setBarStyle('dark-content');
    };
  }, [navigation]);

  const [profile, setProfile] = useState({
    age: '',
    gender: '',
  });

  const { loading } = useQuery(userProfileQuery, {
    onCompleted: (data) => {
      setProfile({
        age: String(data.memberProfile.age),
        gender: String(data.memberProfile.gender).toLowerCase(),
      });
    },
  });

  const [editUser, { loading: editUserLoading }] = useMutation(editUserMutation, {
    variables: {
      age: Number(profile.age),
      gender: profile.gender,
    },
    onCompleted: () => {
      Alert.alert('You updated your profile successfully');
      navigation.goBack();
    },
  });

  if (loading) {
    return (
      <>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <BoldText size="lg">Profile</BoldText>
          <Ionicons name="ios-close" size={35} />
        </View>

        <LoadingState />
      </>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <BoldText size="lg">Profile</BoldText>
        <Ionicons name="ios-close" size={35} />
      </View>

      <KeyboardAwareScrollView style={{ marginTop: 30 }}>
        <View style={{ marginBottom: 20 }}>
          <RegularText>Enter Age</RegularText>
          <Input
            keyboardType="numeric"
            value={profile.age}
            onChangeText={(value) =>
              setProfile({
                ...profile,
                age: value,
              })
            }
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => setProfile({ ...profile, gender: 'female' })}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}>
              <Ionicons
                style={{ marginRight: 5 }}
                name="ios-checkmark-circle"
                size={25}
                color={profile.gender === 'female' ? Colors.tintColor : 'grey'}
              />
              <RegularText>Female</RegularText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setProfile({ ...profile, gender: 'male' })}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                style={{ marginRight: 5 }}
                name="ios-checkmark-circle"
                size={25}
                color={profile.gender === 'male' ? Colors.tintColor : 'grey'}
              />
              <RegularText>Male</RegularText>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
        <TouchableOpacity onPress={editUser}>
          <Button loading={editUserLoading}>
            <RegularText style={{ color: '#fff' }}>Update Profile</RegularText>
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Profile;
