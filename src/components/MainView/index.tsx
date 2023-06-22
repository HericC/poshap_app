import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../Logo';

import styles from './styles';
const { scrollContainer, centerView, safeAreaView } = styles;

export default function MainView({
  children,
  showLogo = true,
  center = true,
}: any) {
  return (
    <ScrollView contentContainerStyle={[scrollContainer, center && centerView]}>
      <SafeAreaView style={safeAreaView}>
        {showLogo && <Logo />}
        {children}
      </SafeAreaView>
    </ScrollView>
  );
}
