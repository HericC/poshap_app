import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../Logo';

import styles from './styles';
const { scrollContainer, safeAreaView } = styles;

export default function MainView({ children, showLogo = true }: any) {
  return (
    <ScrollView contentContainerStyle={scrollContainer}>
      <SafeAreaView style={safeAreaView}>
        {showLogo && <Logo />}
        {children}
      </SafeAreaView>
    </ScrollView>
  );
}
