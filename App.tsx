import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LoadingProvider } from './src/contexts/LoadingContext';
import { AuthProvider } from './src/contexts/AuthContext';
import Routes from './src/routes';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <LoadingProvider>
        <AuthProvider>
          <StatusBar style="light" backgroundColor="#000" />
          <Routes />
        </AuthProvider>
      </LoadingProvider>
    </NavigationContainer>
  );
}
