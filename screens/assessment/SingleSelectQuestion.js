import React, {useState, useEffect} from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar, ImageBackground, Image, Alert, AsyncStorage } from 'react-native';
import styled from 'styled-components';
import { BoldText, RegularText } from '../../components/Typography';
import Button from '../../components/FormInput/Button';
import { Ionicons } from '@expo/vector-icons';

const questions = [
  {
    title: "Is this an emergency?",
    message: `Stop immediately and call 911 if you are experiencing:
       a. Severe, constant chest pain
       b. Extreme difficulty breathing
       c. Severe, constant lightheadedness
       d. Severe, disorientation or unresponsiveness`,
    type: "single",
    scope: "static",
    responses: [
      {key: 1, title: "I am experiencing at least one of these symptoms"},
      {key: 2, title: "I do not have any of these symptoms"},
    ]
  },
  {
    title: "How old are you?",
    message: `Please select the appropriate category:`,
    type: "single",
    scope: "static",
    responses: [
      {key: 1, title: "Under 18years old"},
      {key: 2, title: "Between 18 and 40 years old"},
      {key: 3, title: "Between 40 and 64 years old"},
      {key: 4, title: "65years old or more"},
    ]
  },
  {
    title: "Please select your gender",
    message: `Please select the appropriate category:`,
    type: "single",
    scope: "static",
    responses: [
      {key: 1, title: "I am Male"},
      {key: 2, title: "I am Female"},
    ]
  },
  {
    title: "Health worker?",
    message: `Are you a health worker, or does your work involve interacting with at risk people (persons with travel history to affected areas and/or close contact with a person confirmed to be infected with COVID-19)?`,
    type: "single",
    scope: "static",
    responses: [
      {key: 1, title: "Yes"},
      {key: 2, title: "No"},
    ]
  },
  {
    title: "Underlying health condition",
    message: `Do any of these apply to you? Select all that apply`,
    type: "multiple",
    scope: "static",
    responses: [
      {key: 1, title: "Moderate to severe asthma or chronic lung disease"},
      {key: 2, title: "Cancer treatment or medication causing immune suppression"},
      {key: 3, title: "Inherited immune system deficiencies or HIV"},
      {key: 4, title: "Heart conditions"},
      {key: 5, title: "Diabetes"},
      {key: 6, title: "Kidney failure"},
      {key: 7, title: "Pregnancy"},
      {key: 8, title: "None of the above"},
    ]
  },
  {
    title: "Travel history",
    message: `In the last month, have you travelled internationally?`,
    type: "single",
    scope: "static",
    responses: [
      { key: 1, title: "Yes, i have travelled internationally" },
      { key: 2, title: "No, i have not travelled internationally" },
    ]
  },
  {
    title: "Place of work",
    message: `Do you work in a health facility? (This includes a hospital, emergency room, other medical setting, or long-term care facility. Select all that apply)`,
    type: "single",
    scope: "static",
    responses: [
      {key: 1, title: "I have worked in a hospital or other health facility in the last 14 days"},
      {key: 2, title: "No, i have not and don’t intend to work in a hospital or health facility"},
    ]
  },
  {
    title: "How are you feeling",
    message: `Are you experiencing any of these symptoms? Select all that apply`,
    type: "multiple",
    scope: "recurrent",
    responses: [
      {key: 1, title: "Fever, chills or sweating"},
      {key: 2, title: "Difficulty breathing"},
      {key: 3, title: "New or worsening cough"},
      {key: 4, title: "Sore throat"},
      {key: 5, title: "Tiredness"},
      {key: 6, title: "Vomiting or diarrhoea"},
      {key: 7, title: "None of the above"},
    ]
  },
  {
    title: "Where have you been?",
    message: `In the last 14 days have you been in an area where COVID-19 is widespread?`,
    type: "single",
    scope: "recurrent",
    responses: [
      {key: 1, title: "I live in an area where COVID-19 is widespread"},
      {key: 2, title: "I have visited an area where COVID-19 is widespread"},
      {key: 3, title: "I don’t know"},
      {key: 4, title: "None of the above"},
    ]
  },
  {
    title: "Are you exposed?",
    message: `In the last 14 days, what is your exposure to others who are known to have COVID‑19? Select all that apply`,
    type: "single",
    scope: "recurrent",
    responses: [
      {key: 1, title: "I live with someone who has COVID-19"},
      {key: 2, title: "I’ve had close contact with someone who has COVID-19"},
      {key: 3, title: "I’ve had no exposure"},
      {key: 4, title: "I don’t know"},
    ]
  }
];

const SingleSelectQuestion = ({ navigation }) => {
  StatusBar.setBarStyle('light-content');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    //console.log("Existing Items After : ", selectedOptions);
  }, [selectedOptions]);

  return (
    <ImageBackground
      source={ require("../../assets/images/assessmentBackground.png") }
      imageStyle={{ borderRadius: 10, opacity: 0.8 }}
      resizeMode="contain"
      style={{ flex: 1, backgroundColor: '#f4f4f4', paddingBottom: 50 }}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#898989',
          paddingBottom: 10,
        }}
      >
        <View style={{ marginTop: 50, paddingHorizontal: 20, marginBottom: 0, flex: 0.9 }}>
          <BoldText size="lg">Self Assessment</BoldText>
        </View>
      </View>
      <ScrollView style={{ paddingHorizontal: 20, flex: 1, paddingBottom: 50, paddingTop: 20}} showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 50}}>
          <View style={{ flexDirection: 'row'}}>
            <View style={{ flex: 0.25}}>
              <Image source={require("../../assets/images/assessment-icon.png")} style={{ width: 80, height: 80, marginBottom: 10}} />
            </View>
            <View style={{ flex: 0.75, justifyContent: 'center'}}>
              <BoldText size="lg">{questions[questionNumber - 1].title}</BoldText>
            </View>
          </View>
          <View>
            <RegularText size="md">
              { questions[questionNumber - 1].message}
            </RegularText>
          </View>
          <View style={{ marginTop: 10}}>
            {questions[questionNumber - 1].responses.map((persona) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => storeOption(persona.title, questions[questionNumber - 1].type )}
                >
                  { isSelectedOption(persona.title)  ? (
                    <SelectedOptionsCard>
                      <SelectionRadio>
                        <Ionicons
                          name='ios-checkmark-circle'
                          size={30}
                          color='#ffffff'
                        />
                      </SelectionRadio>
                      <PersonaInfo>
                        <PersonaName>
                          <RegularText style={{ fontFamily: 'bold', fontSize: 15, color: '#ffffff' }}>
                            {persona.title}
                          </RegularText>
                        </PersonaName>
                      </PersonaInfo>

                    </SelectedOptionsCard>
                  ) : (
                    <OptionsCard>
                      <SelectionRadio>
                        <Ionicons
                          name='ios-checkmark-circle'
                          size={30}
                          color='#e3e3e3'
                        />
                      </SelectionRadio>
                      <PersonaInfo>
                        <PersonaName>
                          <RegularText
                            style={{
                              fontFamily: 'bold',
                              fontSize: 15,
                              color: '#898989'
                            }}
                          >
                            {persona.title}
                          </RegularText>
                        </PersonaName>
                      </PersonaInfo>

                    </OptionsCard>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
        <TouchableOpacity disabled={selectedOptions.length === 0} onPress={() => goNext()}>
          <Button style={{backgroundColor: (selectedOptions.length === 0) ? '#d4d4d4' : '#000000'}}>
            <RegularText style={{ color: '#fff' }}> Next . . .</RegularText>
          </Button>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  function isSelectedOption(option) {
      return selectedOptions.indexOf(option) !== -1;
  }

  function storeOption(option, questionType) {
    let existingOptions = selectedOptions;
    //console.log("Existing Items Before : ", existingOptions);

    if(questionType === "multiple"){
      if(option === "None of the above"){
       existingOptions = existingOptions.indexOf(option) === -1 ? [option]  : existingOptions.filter(item => item !== option);
      }
      else{
        existingOptions =
          (existingOptions.indexOf("None of the above") !== -1) ?
            existingOptions.filter(item => item !== "None of the above") : existingOptions;

        existingOptions = (existingOptions.indexOf(option) !== -1) ?
          existingOptions.filter(item => item !== option) : existingOptions.concat(option);
      }
      setSelectedOptions(existingOptions);
    }
    else {
      //console.log(option);
      setSelectedOptions([option]);
    }

  }

  async function saveResponse(questionNumber, questionResponse) {
    try {
      await AsyncStorage.setItem(String(questionNumber), JSON.stringify(questionResponse));
    } catch (error) {
      console.log(error.message);
    }
  }

  function goNext(){
    // save selected options for the question at hand before moving
    saveResponse(questionNumber, selectedOptions);
    setSelectedOptions([]);
    if (questionNumber  === questions.length){
      AsyncStorage.getItem("5",(error, result) => {
        console.log(result);
      });
      Alert.alert("Assessment Complete", "This completes the assessment");
      navigation.goBack();
    } else {
      setQuestionNumber(questionNumber + 1);
    }
  }
};


const OptionsCard = styled.View`
	flex-direction: row;
	background-color: #ffffff;
	border-radius: 5px;
	margin: 5px 0px;
	padding: 10px 0px;
`;

const SelectedOptionsCard = styled(OptionsCard)`
	border: 1px solid #000080;
	background-color: #000080;
	box-shadow: 0 0 2px #f5f5f5;
`;


const PersonaInfo = styled.View`
	flex: 9;
	justify-content: center;
`;

const PersonaName = styled.View`
	margin-bottom: 2px;
	padding-right: 20px;
	color: #ffffff;
`;

const SelectionRadio = styled.View`
	flex: 2;
	justify-content: center;
	align-items: center;
`;



export default SingleSelectQuestion;
