import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../Logo';

import styles from './styles';
const { scrollContainer, centerView, safeAreaView } = styles;

export default function MainView({
  children,
  showLogo = true,
  center = true,
  refresh,
}: any) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    if (refresh) await refresh();
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={[scrollContainer, center && centerView]}
    >
      <SafeAreaView style={safeAreaView}>
        {showLogo && <Logo />}
        {children}
      </SafeAreaView>
    </ScrollView>
  );
}
