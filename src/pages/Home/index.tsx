import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import globalstyles from '../../styles';
import { AuthContext } from '../../contexts/AuthContext';

export default function Home() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>

      <TouchableOpacity
        style={globalstyles.btn}
        onPress={() => {
          handleLogout();
        }}
      >
        <Text style={globalstyles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
