import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { LoginDto } from './dto';

import globalStyles from '../../styles';
const {
  img,
  title,
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

import styles from './styles';
const { container } = styles;

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

  return (
    <SafeAreaView style={container}>
      <Image style={img} source={require('../../../assets/logo.png')} />
      <Text style={title}>Poshap</Text>

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

        <TouchableOpacity style={link}>
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
    </SafeAreaView>
  );
}
