import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, TouchableOpacity, Text } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

import Profile from '../pages/Profile';
import Plans from '../pages/Plans';

const Drawer = createDrawerNavigator();

export default function ProfileRoutes() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <Drawer.Navigator
      screenOptions={{
        unmountOnBlur: true,
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#295BA8' },
      }}
    >
      <Drawer.Screen
        name="profile"
        component={Profile}
        options={{ title: 'Perfil' }}
      />

      <Drawer.Screen
        name="plans"
        component={Plans}
        options={{ title: 'Planos' }}
      />

      <Drawer.Screen
        name="logout"
        component={View}
        options={{
          drawerLabel: () => (
            <TouchableOpacity onPress={handleLogout}>
              <Text>Sair</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
