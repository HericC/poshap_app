import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../Logo';

import styles from './styles';
const { scrollContainer, safeAreaView } = styles;

export default function MainView({ children }: any) {
  return (
    <ScrollView contentContainerStyle={scrollContainer}>
      <SafeAreaView style={safeAreaView}>
        <Logo />
        {children}
      </SafeAreaView>
    </ScrollView>
  );
}
