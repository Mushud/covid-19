import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';

// components
import { BoldText, RegularText } from '../components/Typography';
import ParentScreenHeaderIos from '../components/ParentScreenHeader';
import Colors from '../constants/Colors';
import { gql, useQuery } from '@apollo/client';
import LoadingState from '../components/LoadingState';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

const query = gql`
  query {
    userReportedCases {
      _id
      nearestLandmark
      alternateContact
      reporting
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
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={() => refetch()}
        refreshing={loading}
        data={data.userReportedCases}
        keyExtractor={(item) => item.createdAt}
        renderItem={({ item }) => (
          <Card>
            <Row>
              <BoldText>{item.reporting[0].toUpperCase() + item.reporting.slice(1)}</BoldText>
              <RegularText>{new Date(item.createdAt).toDateString()}</RegularText>
            </Row>

            <Row style={{ marginTop: 10 }}>
              <RegularText style={{ color: Colors.tintColor }}>{item.description}</RegularText>
            </Row>

            <Row>
              <RegularText style={{ color: Colors.tintColor }}>{item.alternateContact}</RegularText>
            </Row>
          </Card>
        )}
      />

      <FAB>
        <TouchableOpacity onPress={() => navigation.navigate('MakeCaseReport')}>
          <Ionicons name="ios-add" color="#fff" size={20} />
        </TouchableOpacity>
      </FAB>
    </Container>
  );
}

const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;
const Card = styled.View`
  margin-top: 15px;
  padding: 25px 20px;
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
