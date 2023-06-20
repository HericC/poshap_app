import React, { useContext, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import api from '../../../../services/api';
import { LoadingContext } from '../../../../contexts/LoadingContext';
import { NewPasswordDto } from './dto';

import MainView from '../../../../components/MainView';

import globalStyles from '../../../../styles';
const { inputs, input, btns, btn, btnText, btnSecondary, btnTextSecondary } =
  globalStyles;

export default function NewPassword() {
  const navigation = useNavigation();
  const route: any = useRoute();

  const { handleLoading } = useContext(LoadingContext);

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = async () => {
    const otgCode = route.params?.otgCode;
    const payload: NewPasswordDto = { otgCode, password, repeatPassword };

    try {
      handleLoading(true);
      const { data } = await api.post(
        'auth/forgot-password/change-password',
        payload,
      );

      Alert.alert('', data.message);
      navigation.navigate('login' as never);
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
          placeholder="Senha"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={() => {
            // @ts-ignore
            this.repeatPassword.focus();
          }}
          ref={(input) => {
            // @ts-ignore
            this.password = input;
          }}
        />

        <TextInput
          style={input}
          placeholder="Repetir Senha"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          value={repeatPassword}
          onChangeText={(text) => setRepeatPassword(text)}
          ref={(input) => {
            // @ts-ignore
            this.repeatPassword = input;
          }}
        />
      </View>

      <View style={btns}>
        <TouchableOpacity style={btn} onPress={handleSubmit}>
          <Text style={btnText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </MainView>
  );
}
