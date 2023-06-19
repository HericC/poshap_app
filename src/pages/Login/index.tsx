import React, { useContext, useState } from 'react';
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

import styles from '../../styles';
const {
  container,
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
} = styles;

export default function Login() {
  const { handleLogin } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = () => {
    let errors = '';

    if (!email) errors += 'E-mail requirido';
    if (!password) errors += '\nSenha requerido';

    if (errors.length) return Alert.alert('', errors);
    return true;
  };

  const handleSubmit = () => {
    if (!isValid()) return;
    const payload: LoginDto = { email, password };
    handleLogin(payload);
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
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={input}
          placeholder="Senha"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={link}>
          <Text style={linkText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <View style={btns}>
        <TouchableOpacity style={btn} onPress={handleSubmit}>
          <Text style={btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[btn, btnSecondary]}>
          <Text style={[btnText, btnTextSecondary]}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
