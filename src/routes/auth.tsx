import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ValidateOtgCode from '../pages/ForgotPassword/components/ValidateOtgCode';
import NewPassword from '../pages/ForgotPassword/components/NewPassword';

export default function AuthRoutes() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="register"
        component={Register}
        options={{ title: 'Cadastro' }}
      />

      <Stack.Screen
        name="forgot-password"
        component={ForgotPassword}
        options={{ title: 'Recuperar Senha' }}
      />

      <Stack.Screen
        name="validate-otgcode"
        component={ValidateOtgCode}
        options={{ title: 'Validar código' }}
      />

      <Stack.Screen
        name="new-password"
        component={NewPassword}
        options={{ title: 'Nova senha' }}
      />
    </Stack.Navigator>
  );
}
