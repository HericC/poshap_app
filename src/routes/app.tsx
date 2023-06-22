import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

import PublishRoutes from './publish';
import Home from '../pages/Home';
import ProfileRoutes from './profile';

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate('home' as never);
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ffffff99',
        tabBarStyle: { backgroundColor: '#295BA8' },
      }}
    >
      <Tab.Screen
        name="publish-routes"
        component={PublishRoutes}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="publish" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="profile-routes"
        component={ProfileRoutes}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="user-alt" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
