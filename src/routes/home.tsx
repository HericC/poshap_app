import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';

const Drawer = createDrawerNavigator();

export default function HomeRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        unmountOnBlur: true,
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#295BA8' },
      }}
    >
      <Drawer.Screen
        name="home"
        component={Home}
        options={{ title: 'Home - Anúncios de serviços' }}
      />
    </Drawer.Navigator>
  );
}
