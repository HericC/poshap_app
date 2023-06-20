import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { LoginDto } from './dto';

import MainView from '../../components/MainView';

import globalStyles from '../../styles';
const {
  inputs,
  input,
  btns,
  btn,
  btnText,
  btnSecondary,
  btnTextSecondary,
  link,
  linkText,
} = globalStyles;

export default function Login() {
  const navigation = useNavigation();

  const { handleLogin } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const payload: LoginDto = { email, password };
    handleLogin(payload);
  };

  const toRegister = () => {
    navigation.navigate('register' as never);
  };

  const toForgotPassword = () => {
    navigation.navigate('forgot-password' as never);
  };

  return (
    <MainView>
      <View style={inputs}>
        <TextInput
          style={input}
          placeholder="E-mail"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          onSubmitEditing={() => {
            // @ts-ignore
            this.password.focus();
          }}
        />

        <TextInput
          style={input}
          placeholder="Senha"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          ref={(input) => {
            // @ts-ignore
            this.password = input;
          }}
        />

        <TouchableOpacity style={link} onPress={toForgotPassword}>
          <Text style={linkText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <View style={btns}>
        <TouchableOpacity style={btn} onPress={handleSubmit}>
          <Text style={btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[btn, btnSecondary]} onPress={toRegister}>
          <Text style={[btnText, btnTextSecondary]}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </MainView>
  );
}
