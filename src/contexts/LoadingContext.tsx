import React, { createContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, ActivityIndicator, Image, Text } from 'react-native';
import HandleLoading from '../hooks/HandleLoading';

const LoadingContext = createContext({
  handleLoading: (isLoading: boolean) => {
    return;
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LoadingProvider({ children }: any) {
  const { loading, handleLoading } = HandleLoading();

  return (
    <LoadingContext.Provider value={{ handleLoading }}>
      {children}
      {loading && (
        <SafeAreaView style={styles.container}>
          <Image style={styles.img} source={require('../../assets/logo.png')} />
          <Text style={styles.title}>Poshap</Text>
          <ActivityIndicator size="large" color="#fff" />
        </SafeAreaView>
      )}
    </LoadingContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#295BA8',
  },
  img: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 26,
    marginTop: 10,
    marginBottom: 80,
    color: '#fff',
  },
});

export { LoadingContext, LoadingProvider };
