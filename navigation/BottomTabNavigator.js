import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import FAQScreen from '../screens/FAQScreen';
import ReportCase from "../screens/ReportCase";
import LogScreen from "../screens/LogScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
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
            component={LogScreen}
            options={{
                title: 'Health',
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
