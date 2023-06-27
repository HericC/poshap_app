import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import NewPublish from '../pages/NewPublish';
import OrderProvider from '../pages/OrderProvider';
import OngoingProvider from '../pages/OngoingProvider';

const Drawer = createDrawerNavigator();

export default function PublishRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        unmountOnBlur: true,
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#295BA8' },
      }}
    >
      <Drawer.Screen
        name="new-service"
        component={NewPublish}
        options={{ title: 'Nova publicação' }}
      />

      <Drawer.Screen
        name="order-provider"
        component={OrderProvider}
        options={{ title: 'Solicitações recebidas' }}
      />

      <Drawer.Screen
        name="ongoing-provider"
        component={OngoingProvider}
        initialParams={{ status: 'ongoing' }}
        options={{ title: 'Serviços em andamento' }}
      />

      <Drawer.Screen
        name="ongoing-provider-finished"
        component={OngoingProvider}
        initialParams={{ status: 'finished' }}
        options={{ title: 'Serviços finalizados' }}
      />

      <Drawer.Screen
        name="ongoing-provider-canceled"
        component={OngoingProvider}
        initialParams={{ status: 'canceled' }}
        options={{ title: 'Serviços cancelados' }}
      />
    </Drawer.Navigator>
  );
}
