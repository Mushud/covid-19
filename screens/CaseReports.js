import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

// components
import { BoldText, RegularText } from '../components/Typography';
import ParentScreenHeaderIos from '../components/ParentScreenHeader';
import Colors from '../constants/Colors';
import { gql, useQuery } from '@apollo/client';
import LoadingState from '../components/LoadingState';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import EmptyVitalsState from '../components/EmptyVitalsState';
import EmptyCaseReportsState from '../components/EmptyCaseReportsState';

const query = gql`
  query {
    userReportedCases {
      _id
      nearestLandmark
      alternateContact
      reporting
      location
      description
      createdAt
    }
  }
`;

export default function CaseReports({ navigation }) {
  const { loading, data, refetch } = useQuery(query);

  if (loading) {
    return (
      <Container>
        <ParentScreenHeaderIos title="Case Reports" />
        <LoadingState />
      </Container>
    );
  }

  return (
    <Container>
      <ParentScreenHeaderIos title="Case Reports" />
      {!data.userReportedCases.length ? (
        <EmptyCaseReportsState />
      ) : (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            onRefresh={() => refetch()}
            refreshing={loading}
            data={data.userReportedCases}
            keyExtractor={(item) => item.createdAt}
            renderItem={({ item }) => (
              <Card>
                <Row>
                  <View>
                    <BoldText>{item.reporting[0].toUpperCase() + item.reporting.slice(1)}</BoldText>
                  </View>
                    <BoldText>{new Date(item.createdAt).toDateString()}</BoldText>
                </Row>

                <Row style={{ marginTop: 10 }}>
                  <RegularText style={{ color: Colors.tintColor }}>{item.description}</RegularText>
                </Row>

                <View style={{ marginTop: 10, flexDirection: 'row'}}>
                  <View style={{ justifyContent: 'center', flex: 0.15}}>
                    <EvilIcons name="location" size={25} />
                  </View>
                  <View>
                    <RegularText style={{ color: Colors.tintColor }}>
                      {item.nearestLandmark}
                    </RegularText>
                    <RegularText style={{ color: Colors.tintColor }}>
                      {item.location}
                    </RegularText>
                  </View>
                </View>
              </Card>
            )}
          />
          <TouchableOpacity onPressIn={() => navigation.navigate('MakeCaseReport')}>
            <View style={{margin: 10}}>
              <FAB>
                <Ionicons name="ios-add" color="#fff" size={30} />
              </FAB>
            </View>
        </TouchableOpacity>
        </>
      )}
    </Container>
  );
}

const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;
const Card = styled.View`
  margin-top: 15px;
  padding: 15px 20px;
  border-bottom-color: #e3e3e3;
  border-bottom-width: 0.5px;
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
