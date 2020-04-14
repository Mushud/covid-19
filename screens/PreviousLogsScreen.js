import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// components
import { BoldText, RegularText } from '../components/Typography';
import ParentScreenHeaderIos from '../components/ParentScreenHeader';
import Colors from '../constants/Colors';
import { gql, useQuery } from '@apollo/client';
import LoadingState from '../components/LoadingState';
import EmptyVitalsState from '../components/EmptyVitalsState';
import styled from 'styled-components';
import SVGIcon from '../components/SVGIcon';
import { bulb } from '../assets/icons';

const query = gql`
  query {
    userVitals {
      _id
      vitals {
        aches
        shortnessOfBreath
        dryCough
        fever
        tiredness
        soreThroat
      }
      createdAt
    }

    memberProfile {
      age
      gender
    }
  }
`;

export default function PreviousVitalsLog({ navigation }) {
  const { loading, data, refetch } = useQuery(query);

  if (loading) {
    return (
      <View style={styles.container}>
        <ParentScreenHeaderIos title="Vitals" />
        <LoadingState />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ParentScreenHeaderIos title="Vitals" />

      {!data.memberProfile.age || !data.memberProfile.gender ? (
        <InfoBox>
          <RegularText style={{ width: '90%' }}>
            Your age and gender will be essential for analytics and to better assist you
          </RegularText>
          <SVGIcon source={bulb} style={{ alignItems: 'flex-end' }} fill="orange" />
        </InfoBox>
      ) : null}
      {!data.userVitals?.length ? (
        <EmptyVitalsState />
      ) : (
        <View style={{ marginTop: 20, flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            onRefresh={() => refetch()}
            refreshing={loading}
            data={data.userVitals}
            keyExtractor={(item) => item.createdAt}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10, marginHorizontal: 20 }}>
                <View style={{ alignItems: 'flex-start', paddingLeft: 30 }}>
                  <BoldText>{new Date(item.createdAt).toDateString()}</BoldText>
                </View>
                <ListItem>
                  <Row style={{ marginBottom: 0 }}>
                    <RowItem style={{ backgroundColor: scale[item.vitals.aches].color }}>
                      <RegularText style={{ color: 'white'}}>Aches</RegularText>
                      <BoldText size="md" style={{ color: 'white'}}>{item.vitals.aches}</BoldText>
                      <Scale value={item.vitals.aches} />
                    </RowItem>
                    <RowItem style={{ backgroundColor: scale[item.vitals.shortnessOfBreath].color }}>
                      <RegularText style={{ color: 'white', textAlign: 'center'}}> Breath {"\n"} Shortness</RegularText>
                      <BoldText size="md" style={{ color: 'white'}}>{item.vitals.shortnessOfBreath}</BoldText>
                      <Scale value={item.vitals.shortnessOfBreath} />
                    </RowItem>
                    <RowItem style={{ backgroundColor: scale[item.vitals.fever].color }}>
                      <RegularText style={{ color: 'white'}}>Fever</RegularText>
                      <BoldText size="md" style={{ color: 'white'}}>{item.vitals.fever}</BoldText>
                      <Scale value={item.vitals.fever} />
                    </RowItem>
                  </Row>

                  <Row>
                    <RowItem style={{ backgroundColor: scale[item.vitals.dryCough].color }}>
                      <RegularText style={{ color: 'white'}}>Dry Cough</RegularText>
                      <BoldText size="md" style={{ color: 'white'}}>{item.vitals.dryCough}</BoldText>
                      <Scale value={item.vitals.dryCough} />
                    </RowItem>

                    <RowItem style={{ backgroundColor: scale[item.vitals.tiredness].color }}>
                      <RegularText style={{ color: 'white'}}>Tiredness</RegularText>
                      <BoldText size="md" style={{ color: 'white'}}>{item.vitals.tiredness}</BoldText>
                      <Scale value={item.vitals.tiredness} />
                    </RowItem>

                    <RowItem style={{ backgroundColor: scale[item.vitals.soreThroat].color }}>
                      <RegularText style={{ color: 'white'}}>Sore Throat</RegularText>
                      <BoldText size="md" style={{ color: 'white'}}>{item.vitals.soreThroat}</BoldText>
                      <Scale value={item.vitals.soreThroat} />
                    </RowItem>
                  </Row>
                </ListItem>
              </View>
            )}
          />
          <FAB>
            <TouchableOpacity onPress={() => navigation.navigate('VitalsLog')}>
              <Ionicons name="ios-add" color="#ffffff" size={30} />
            </TouchableOpacity>
          </FAB>
        </View>
      )}
    </View>
  );
}

const scale = [
  { color: 'green', status: 'None' },
  { color: 'orange', status: 'Mild' },
  { color: 'orange', status: 'Mid' },
  { color: 'orange', status: 'Semi' },
  { color: 'red', status: 'High' },
];

function Scale({ value = 0 }) {
  const scaleValue = scale[value];
  return (
    <View style={{ flexDirection: 'row' }}>
      <BoldText style={{ color: 'white', textAlign: 'center' }} size="sm">
        {scaleValue.status}
      </BoldText>
    </View>
  );
}

function Bar({ value, nameOfVital }) {
  const scaleValue = scale[value];
  const ourArray = [0, 1, 2, 3, 4];

  return (
    <View style={{ height: 20,}}>
      <RegularText>{nameOfVital}</RegularText>
      <View style={{ flexDirection: 'row' }}>
        {
          ourArray.map(item => {
            return (
              <View style={{ width: 40, backgroundColor: (item <= value) ? scaleValue.color : 'white', height: 10}} />
            )
          })
        }
      </View>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
};

const Card = styled.View`
  box-shadow: 0px 12px 5px rgba(230, 230, 230, 0.5);
  background-color: #fefefe;
  border-radius: 4px;
  margin-top: 15px;
  padding: 25px 20px;
`;

const ListItem = styled.View`
  margin-top: 0px;
  padding: 5px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e3e3e3;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const RowItem = styled.View`
  justify-content: center;
  align-items: center;
  border: 1px solid #e3e3e3;
  flex: 1;
  margin: 5px;
  padding: 10px 0px;
  border-radius: 5px;
  height: 80px;
`;

const FAB = styled.View`
  position: absolute;
  bottom: 3%;
  left: 80%;
  width: 70px;
  height: 70px;
  background-color: ${Colors.tintColor};
  box-shadow: 0px 12px 5px rgba(200, 200, 200, 0.5);
  border-radius: 35px;
  justify-content: center;
  align-items: center;
`;

const InfoBox = styled(Card)`
  border: 1px solid orange;
  margin: 20px;
  padding: 10px;
  flex-direction: row;
`;
