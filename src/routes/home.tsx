import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import OrderClient from '../pages/OrderClient';
import OrderProvider from '../pages/OrderProvider';

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

      <Drawer.Screen
        name="order-client"
        component={OrderClient}
        options={{ title: 'Minhas solicitações' }}
      />

      <Drawer.Screen
        name="order-provider"
        component={OrderProvider}
        options={{ title: 'Solicitações recebidas' }}
      />
    </Drawer.Navigator>
  );
}
