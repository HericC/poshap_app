import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import NewPublish from '../pages/NewPublish';
import OrderProvider from '../pages/OrderProvider';

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
    </Drawer.Navigator>
  );
}
