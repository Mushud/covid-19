import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NotificationProvider } from './context/Notification';
import apolloClient from './graphql/client';
import { ApolloProvider } from '@apollo/client';
import { retrieveAuthToken } from './utils';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import Login from './screens/onboarding/Login';
import Verification from './screens/onboarding/Verification';
import InformationScreen from './screens/onboarding/Information';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const [graphqlClient, setGraphqlClient] = useState({});
  const [authToken, setAuthToken] = useState('');

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          regular: require('./assets/fonts/Cereal-Book.ttf'),
          bold: require('./assets/fonts/Cereal-Bold.ttf'),
        });
        const token = await retrieveAuthToken();
        setAuthToken(token);
        const client = await apolloClient();
        setGraphqlClient(client);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <ApolloProvider client={graphqlClient}>
          <NotificationProvider>
            <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
              <Stack.Navigator headerMode="none">
                {!authToken ? (
                  <>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Verification" component={Verification} />
                    <Stack.Screen name="InformationScreen" component={InformationScreen} />
                  </>
                ) : null}
                <Stack.Screen name="Home" component={BottomTabNavigator} />
              </Stack.Navigator>
            </NavigationContainer>
          </NotificationProvider>
        </ApolloProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
