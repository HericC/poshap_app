import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { LoadingProvider } from './src/contexts/LoadingContext';
import { AuthProvider } from './src/contexts/AuthContext';
import Routes from './src/routes';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <LoadingProvider>
          <AuthProvider>
            <StatusBar style="auto" />
            <Routes />
          </AuthProvider>
        </LoadingProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
