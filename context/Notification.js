import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { BottomModal, ModalContent } from 'react-native-modals';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import TimeAgo from 'react-native-timeago';

// components
import LoadingState from '../components/LoadingState';
import { BoldText, RegularText, StyledHeader, StyledText } from '../components/Typography';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import Layout from '../constants/Layout';

const NotificationContext = React.createContext();
const query = gql`
  query {
    broadcastMessages {
      title
      description
      createdAt
    }
  }
`;

function NotificationProvider({ children }) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { loading, data } = useQuery(query);

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
        <ModalContent style={{ minHeight: Layout.window.height - 100, backgroundColor: '#fff' }}>
          {!data && loading ? (
            <LoadingState />
          ) : (
            <Container>
              <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
                <StyledHeader style={{ fontSize: 16, textAlign: 'center' }}>
                  Notifications
                </StyledHeader>
              </View>
              {data.broadcastMessages.length > 0 ? (
                <FlatList
                  data={data.broadcastMessages}
                  renderItem={renderNotification}
                  keyExtractor={(item) => item.createdAt}
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

        <View style={{ flex: 0.19}}>
          <View style={{ height: 50, width: 50, backgroundColor: '#f1f1f1', justifyContent: 'center', borderRadius: 25, alignItems: 'center'}}>
            <EvilIcons name="envelope" size={30} color="grey" />
          </View>
        </View>

        <View style={{ justifyContent: 'center', flex: 0.65}}>
          <RegularText size="md">{item.title}</RegularText>
          <RegularText style={{ flexWrap: 'wrap' }} numberOfLines={1}>{item.description} </RegularText>
        </View>

        <View
          style={{
            alignItems: 'flex-end',
            flex: 0.2
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
  background-color: #ffffff;
`;

const ListItem = styled.View`
  background-color: #ffffff;
  border-bottom-width: 0.3px;
  border-bottom-color: #cecece;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
`;

export { NotificationContext, NotificationProvider };
