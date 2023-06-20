import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import api from '../../services/api';
import { LoadingContext } from '../../contexts/LoadingContext';
import { ForgotPasswordDto } from './dto';

import MainView from '../../components/MainView';

import globalStyles from '../../styles';
const { inputs, input, btns, btn, btnText } = globalStyles;

export default function ForgotPassword() {
  const navigation = useNavigation();

  const { handleLoading } = useContext(LoadingContext);

  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    const payload: ForgotPasswordDto = { email };

    try {
      handleLoading(true);
      const { data } = await api.post('auth/forgot-password', payload);
      Alert.alert('', data.message);
      navigation.navigate('validate-otgcode' as never);
    } catch (error) {
      console.warn(error);
    } finally {
      handleLoading(false);
    }
  };

  return (
    <MainView showLogo={false}>
      <View style={inputs}>
        <TextInput
          style={input}
          placeholder="E-mail"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={btns}>
        <TouchableOpacity style={btn} onPress={handleSubmit}>
          <Text style={btnText}>Enviar redefinição de senha</Text>
        </TouchableOpacity>
      </View>
    </MainView>
  );
}
