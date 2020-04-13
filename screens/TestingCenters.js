import React from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import ChildScreenHeader from '../components/ChildScreenHeader';
import { gql, useQuery } from '@apollo/client';
import LoadingState from '../components/LoadingState';
import styled from 'styled-components';
import { BoldText, RegularText } from '../components/Typography';
import Colors from '../constants/Colors';
import getDirections from 'react-native-google-maps-directions';

const query = gql`
  query {
    testingSites {
      _id
      name
      placesName
      location {
        coordinates
      }
      createdAt
    }
  }
`;

function TestingCenters() {
  const { loading, data, refetch } = useQuery(query);

  if (loading) {
    return (
      <Container>
        <ChildScreenHeader title="Testing Centers" />
        <LoadingState />
      </Container>
    );
  }

  return (
    <Container>
      <ChildScreenHeader title="Testing Centers" />
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={() => refetch()}
        refreshing={loading}
        data={data.testingSites}
        keyExtractor={(item) => item.createdAt}
        renderItem={({ item }) => (
          <Card>
            <Row>
              <BoldText>{item.name}</BoldText>
              <RegularText>{new Date(item.createdAt).toDateString()}</RegularText>
            </Row>

            <Row style={{ marginTop: 10 }}>
              <RegularText style={{ color: Colors.tintColor }}>{item.address}</RegularText>
            </Row>

            <Row>
              <RegularText style={{ color: Colors.tintColor }}>{item.placesName}</RegularText>
              <TouchableOpacity
                onPress={() =>
                  handleGetDirections({
                    latitude: item.location.coordinates[1],
                    longitude: item.location.coordinates[0],
                  })
                }
              >
                <RegularText style={{ color: 'orange' }}>Get Directions</RegularText>
              </TouchableOpacity>
            </Row>
          </Card>
        )}
      />
    </Container>
  );

  function handleGetDirections({ latitude, longitude }) {
    const data = {
      destination: {
        latitude,
        longitude,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving',
        },
        {
          key: 'dir_action',
          value: 'navigate',
        },
      ],
    };

    getDirections(data);
  }
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

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export default TestingCenters;
