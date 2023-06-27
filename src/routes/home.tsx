import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import OrderClient from '../pages/OrderClient';
import OngoingClient from '../pages/OngoingClient';

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
        name="ongoing-client"
        component={OngoingClient}
        initialParams={{ status: 'ongoing' }}
        options={{ title: 'Serviços em andamento' }}
      />

      <Drawer.Screen
        name="ongoing-client-finished"
        component={OngoingClient}
        initialParams={{ status: 'finished' }}
        options={{ title: 'Serviços finalizados' }}
      />

      <Drawer.Screen
        name="ongoing-client-canceled"
        component={OngoingClient}
        initialParams={{ status: 'canceled' }}
        options={{ title: 'Serviços cancelados' }}
      />
    </Drawer.Navigator>
  );
}
