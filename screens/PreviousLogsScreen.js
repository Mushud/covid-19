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
            Your age and gender will be essential for analytics and also detecting bad vitals from
            you.
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
              <View style={{ marginBottom: 30, marginHorizontal: 20 }}>
                <View style={{ alignItems: 'flex-end' }}>
                  <RegularText>{new Date(item.createdAt).toDateString()}</RegularText>
                </View>
                <ListItem>
                  <Row style={{ marginBottom: 30 }}>
                    <RowItem>
                      <Scale value={item.vitals.aches} />
                      <RegularText>Aches</RegularText>
                    </RowItem>

                    <RowItem>
                      <Scale value={item.vitals.shortnessOfBreath} />
                      <RegularText>Shortness of Breath</RegularText>
                    </RowItem>

                    <RowItem>
                      <Scale value={item.vitals.fever} />
                      <RegularText>Fever</RegularText>
                    </RowItem>
                  </Row>

                  <Row>
                    <RowItem>
                      <Scale value={item.vitals.dryCough} />
                      <RegularText>Dry Cough</RegularText>
                    </RowItem>

                    <RowItem>
                      <Scale value={item.vitals.tiredness} />
                      <RegularText>Tiredness</RegularText>
                    </RowItem>

                    <RowItem>
                      <Scale value={item.vitals.soreThroat} />
                      <RegularText>Sore Throat</RegularText>
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
      <BoldText style={{ color: scaleValue.color, textAlign: 'center' }} size="sm">
        {scaleValue.status}
      </BoldText>
    </View>
  );
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
  margin-top: 15px;
  padding: 25px 20px;
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
