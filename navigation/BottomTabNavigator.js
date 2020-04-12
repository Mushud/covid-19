import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import FAQScreen from '../screens/FAQScreen';
import ReportCase from '../screens/ReportCase';
import LogScreen from '../screens/LogScreen';
import PreviousLogsScreen from '../screens/PreviousLogsScreen';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

const Stack = createStackNavigator();

const VitalsStack = () => (
  <Stack.Navigator
    headerMode="none"
    screenOptions={{
      ...TransitionPresets.ModalPresentationIOS,
      cardOverlayEnabled: true,
    }}
  >
    <Stack.Screen name="PreviousVitalsLog" component={PreviousLogsScreen} />
    <Stack.Screen name="VitalsLog" component={LogScreen} />
  </Stack.Navigator>
);

export default function BottomTabNavigator({ navigation, route }) {
  StatusBar.setBarStyle('dark-content');
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-albums" />,
        }}
      />
      <BottomTab.Screen
        name="Report"
        component={ReportCase}
        options={{
          title: 'Report',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-paper-plane" />,
        }}
      />
      <BottomTab.Screen
        name="Vitals"
        component={VitalsStack}
        options={{
          title: 'Vitals',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-pulse" />,
        }}
      />
      <BottomTab.Screen
        name="FAQScreen"
        component={FAQScreen}
        options={{
          title: 'FAQs',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-radio" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
  }
}
