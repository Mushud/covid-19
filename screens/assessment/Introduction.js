import React from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { BoldText, RegularText } from '../../components/Typography';
import Button from '../../components/FormInput/Button';
import ChildScreenHeader from '../../components/ChildScreenHeader';

const AssessmentIntroduction = ({ navigation }) => {
  StatusBar.setBarStyle('dark-content');
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', paddingBottom: 50 }}>
      <ChildScreenHeader title="Self Assessment"/>
      <ScrollView style={{ paddingHorizontal: 20, flex: 1, paddingBottom: 50, paddingTop: 20}}>
        <View>
          <BoldText size="md">Getting Started!</BoldText>
          <RegularText>
            This tool is intended to help you understand what to do next about COVID-19.
            You’ll answer a few questions about your  symptoms, travel, and contact you’ve had with others.
          </RegularText>
        </View>
        <View style={{ marginTop: 20}}>
          <BoldText size="md">Note</BoldText>
          <RegularText>
            Recommendations provided by this tool do not constitute medical advice and
            should not be used to diagnose or treat medical conditions.
          </RegularText>
          <RegularText style={{ marginTop: 5}}>
            Let’s all look out for each other by knowing our status, trying not to infect others,
            and reserving care for those in need.
          </RegularText>
        </View>


      </ScrollView>

      <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
        <TouchableOpacity onPress={GotoQuestion}>
          <Button>
            <RegularText style={{ color: '#fff' }}> Start Assessment . . .</RegularText>
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );

  function GotoQuestion() {
    navigation.navigate('SingleSelectQuestion');
  }

};
export default AssessmentIntroduction;
