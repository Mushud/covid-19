import React from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { BoldText, RegularText } from '../../components/Typography';
import Button from '../../components/FormInput/Button';

const InformationScreen = ({ navigation }) => {
  StatusBar.setBarStyle('dark-content')
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', paddingBottom: 50 }}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#f1f1f1',
          paddingBottom: 10,
        }}
      >
        <View style={{ marginTop: 50, paddingHorizontal: 20, marginBottom: 0, flex: 0.9 }}>
          <BoldText size="lg">General Information</BoldText>
        </View>
      </View>
      <ScrollView style={{ paddingHorizontal: 20, flex: 1, paddingBottom: 50, paddingTop: 20}}>
        <View>
          <BoldText size="md">Background</BoldText>
          <RegularText>
            Citizens are advised to provide accurate information on this application to support the
            government and health services in managing and accurately containing the spread of the
            coronavirus.
          </RegularText>
        </View>
        <View style={{ marginTop: 20 }}>
          <BoldText size="md">Collection of your information</BoldText>
          <RegularText>
            We may collect information about you in a variety of ways. The information we may
            collect via the Application depends on the content and materials you use, and includes:
          </RegularText>
        </View>

        <View style={{ marginTop: 10 }}>
          <BoldText size="md">Personal information</BoldText>
          <RegularText>
            Demographic and other personally identifiable information that you voluntarily give to
            us while using this application is anonymized and is only made available to the relevant
            authorities in cases of emergency.
          </RegularText>
        </View>

        <View style={{ marginTop: 10 }}>
          <BoldText size="md">Geo-location information</BoldText>
          <RegularText>
            We may request access or permission to and track location-based information from your
            mobile device, either continuously or while you are using the Application, to provide
            location-based services. If you wish to change our access or permissions, you may do so
            in your device’s settings.
          </RegularText>
        </View>

        <View style={{ marginTop: 10 }}>
          <BoldText size="md">Mobile device access</BoldText>
          <RegularText>
            We may request access or permission to certain features from your mobile device,
            including your mobile device’s bluetooth, gps. If you wish to change our access or
            permissions, you may do so in the app’s settings.
          </RegularText>
        </View>

        <View style={{ marginTop: 10 }}>
          <BoldText size="md">Push notifications</BoldText>
          <RegularText>
            We may request to send you push notifications regarding your account or the Application.
            If you wish to opt-out from receiving these types of communications, you may turn them
            off in the app’s settings
          </RegularText>
        </View>

        <View style={{ marginTop: 20 }}>
          <BoldText size="md">Use of your information</BoldText>
          <RegularText>
            Having accurate information about you permits us to provide you with a smooth,
            efficient, and customized experience. Specifically, we may use information collected
            about you via the Application to
          </RegularText>
          <RegularText>
            - Assist relevant authority to respond to suspected COVID-19 cases
          </RegularText>
          <RegularText>- Compile anonymous statistical data and analysis</RegularText>
          <RegularText>- Deliver targeted notifications concerning COVID-19 to you</RegularText>
          <RegularText>
            - Monitor and analyze usage trends to inform sensitization efforts
          </RegularText>
        </View>

        <View style={{ marginTop: 20 }}>
          <BoldText size="md">Disclosure of your information</BoldText>
          <RegularText>
            We will be sharing anonymized information we collect about you with the relevant
            government agencies and health services.
          </RegularText>

          <View style={{ marginTop: 10 }}>
            <BoldText size="md">Options regarding your information</BoldText>
            <RegularText>
              You may at any time review or change the information in your account or terminate your
              account by
            </RegularText>
            <RegularText>
              - Logging into your account settings and updating your account
            </RegularText>
            <RegularText>
              - Contacting us using the contact information provided below [send emails to:
              info@polymorphlabs.io]
            </RegularText>
          </View>

          <View style={{ marginTop: 10 }}>
            <RegularText>
              Upon your request to terminate your account, we will deactivate or delete your account
              and information from our active databases. However, some information may be retained
              in our files to prevent fraud, troubleshoot problems, assist with any investigations,
              enforce our Terms of Use and/or comply with legal requirements.
            </RegularText>
          </View>

          <View style={{ marginTop: 10 }}>
            <BoldText>Contact Us</BoldText>
            <RegularText>
              If you have questions or comments about this Privacy Policy, please contact us at
            </RegularText>
          </View>

          <View style={{ marginTop: 10, alignItems: 'flex-end', paddingBottom: 100 }}>

          <RegularText>Polymorph Labs Gh. Ltd.</RegularText>
          <RegularText>17 National Service Avenue Market Street</RegularText>
          <RegularText>Haatso, Accra</RegularText>
          <RegularText>Ghana</RegularText>
          <RegularText>+233 204045782</RegularText>
          <RegularText>info@polymorphlabs.io</RegularText>
          </View>
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Button>
            <RegularText style={{ color: '#fff' }}>Lets get started . . .</RegularText>
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default InformationScreen;
