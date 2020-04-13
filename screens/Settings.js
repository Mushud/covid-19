import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import ParentScreenHeader from '../components/ParentScreenHeader';
import styled from 'styled-components';
import { BoldText, RegularText } from '../components/Typography';
import { Ionicons } from '@expo/vector-icons';

function Settings({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ParentScreenHeader title="Settings" />

      <ScrollView>
        <SettingsItemContainer>
          <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
            <SettingsItem>
              <View>
                <BoldText size="md">FAQs</BoldText>
                <RegularText>Get answers to Frequently Asked Questions</RegularText>
              </View>

              <Ionicons name="ios-arrow-forward" size={20} />
            </SettingsItem>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('TestingCenters')}>
            <SettingsItem>
              <View>
                <BoldText size="md">Testing Centers</BoldText>
                <RegularText>View testing centers near you</RegularText>
              </View>

              <Ionicons name="ios-arrow-forward" size={20} />
            </SettingsItem>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <SettingsItem>
              <View>
                <BoldText size="md">Personal Details</BoldText>
                <RegularText>View and update your personal details</RegularText>
              </View>

              <Ionicons name="ios-arrow-forward" size={20} />
            </SettingsItem>
          </TouchableOpacity>

          <TouchableOpacity>
            <SettingsItem>
              <View>
                <BoldText size="md">Audio</BoldText>
                <RegularText>Listen to audio</RegularText>
              </View>

              <Ionicons name="ios-arrow-forward" size={20} />
            </SettingsItem>
          </TouchableOpacity>

          <TouchableOpacity>
            <SettingsItem>
              <View>
                <BoldText size="md">Privacy Policy</BoldText>
                <RegularText>View our privacy policy</RegularText>
              </View>

              <Ionicons name="ios-arrow-forward" size={20} />
            </SettingsItem>
          </TouchableOpacity>

          <TouchableOpacity>
            <SettingsItem>
              <View>
                <BoldText size="md">Share</BoldText>
                <RegularText>Share this app with friends and family</RegularText>
              </View>

              <Ionicons name="ios-arrow-forward" size={20} />
            </SettingsItem>
          </TouchableOpacity>
        </SettingsItemContainer>
      </ScrollView>
    </View>
  );
}

const SettingsItemContainer = styled.View`
  margin-top: 20px;
`;

const SettingsItem = styled.View`
  flex-direction: row;
  padding: 20px;
  border-bottom-width: 0.5px;
  border-bottom-color: #e3e3e3;
  justify-content: space-between;
  align-items: center;
`;

export default Settings;