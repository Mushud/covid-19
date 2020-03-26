import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { BottomModal, ModalContent } from 'react-native-modals';
import styled from 'styled-components';
//import { useQuery, gql } from '@apollo/client';
import TimeAgo from 'react-native-timeago';

// components
import LoadingState from '../components/LoadingState';
import { StyledHeader, StyledText } from '../components/Typography';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const NotificationContext = React.createContext();
/*
const query = gql`
  query {
    memberNotifications {
      title
      message
      createdAt
    }

    memberProfile {
      congregation {
        name
      }
    }
  }
`;
*/
const data = {
    memberNotifications: []
};

function NotificationProvider({ children }) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  //const { loading, data } = useQuery(query);

  function openNotificationScreen() {
    setNotificationOpen(true);
  }

  return (
    <NotificationContext.Provider value={{ openNotificationScreen }}>
      {children}

      <BottomModal
        visible={notificationOpen}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        onSwipeOut={() => {
          setNotificationOpen(false);
        }}
        containerStyle={{ backgroundColor: '#f4f6f8' }}
      >
        <ModalContent style={{ height: Layout.window.height - 100, backgroundColor: '#f4f6f8' }}>
          {!data && loading ? (
            <LoadingState />
          ) : (
            <Container>
              <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
                <StyledHeader style={{ fontSize: 16, textAlign: 'center' }}>
                  Notifications from { /*data.memberProfile.congregation.name*/ 'Ghana Health Services'}
                </StyledHeader>
              </View>
              {data.memberNotifications.length > 0 ? (
                <FlatList
                  data={data.memberNotifications}
                  renderItem={renderNotification}
                  keyExtractor={item => item.createdAt}
                />
              ) : (
                <View
                  style={{
                    height: 60,
                    alignItems: 'center',
                    marginHorizontal: 20,
                    marginVertical: 20,
                    padding: 10,
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    borderRadius: 5,
                    borderWidth: 0.3,
                    borderColor: '#d7d7d7',
                  }}
                >
                  <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons
                      name="ios-information-circle-outline"
                      size={25}
                      style={{ marginRight: 5, color: 'orange' }}
                    />
                  </View>
                  <View style={{ flex: 0.9 }}>
                    <StyledText>Sorry, there are no notifications.</StyledText>
                  </View>
                </View>
              )}
            </Container>
          )}
        </ModalContent>
      </BottomModal>
    </NotificationContext.Provider>
  );
}

function renderNotification({ item }) {
  return (
    <ListItem>
      <View style={[{ flexDirection: 'row' }]}>
        <View style={{ justifyContent: 'center', width: '80%' }}>
          <StyledHeader style={{ fontSize: 17, marginBottom: 5, color: Colors.tintColor }}>
            {item.title}
          </StyledHeader>
          <StyledText style={{ fontSize: 16, flexWrap: 'wrap' }}>{item.message}</StyledText>
        </View>

        <View
          style={{
            alignItems: 'flex-end',
            width: '20%',
          }}
        >
          <StyledText style={{ fontSize: 10 }}>
            <TimeAgo time={item.createdAt} />
          </StyledText>
        </View>
      </View>
    </ListItem>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #f4f6f8;
`;

const ListItem = styled.View`
  box-shadow: 0px 12px 5px rgba(213, 213, 213, 0.5);
  background-color: #ffffff;
  border-bottom-width: 0.3px;
  border-bottom-color: #cecece;
  align-items: center;
  justify-content: space-between;
  margin-vertical: 15px;
  margin-horizontal: 10px;
  padding: 10px;
  border-radius: 10px;
`;

export { NotificationContext, NotificationProvider };
