import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NotificationProvider } from "./context/Notification";

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import Index from "./screens/onboarding/Index";
import CountrySelection from "./screens/onboarding/CountrySelection";
import PersonalDetails from "./screens/onboarding/PersonalDetails";

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

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
          'regular': require('./assets/fonts/Cereal-Book.ttf'),
          'bold': require('./assets/fonts/Cereal-Bold.ttf'),
        });
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
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NotificationProvider>
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="PersonalDetails" component={PersonalDetails}/>

              <Stack.Screen name="Home" component={BottomTabNavigator} />

            <Stack.Screen name="AppealScreen" component={Index}/>
            <Stack.Screen name="CountrySelection" component={CountrySelection}/>
            {/*<Stack.Screen name="Home" component={HomeScreen}/>*/}

          </Stack.Navigator>
        </NavigationContainer>
      </NotificationProvider>
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
