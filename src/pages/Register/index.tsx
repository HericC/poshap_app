import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import api from '../../services/api';
import { LoadingContext } from '../../contexts/LoadingContext';
import { RegisterDto } from './dto';

import MainView from '../../components/MainView';

import globalStyles from '../../styles';
const { inputs, input, btns, btn, btnText, btnSecondary, btnTextSecondary } =
  globalStyles;

export default function Register() {
  const navigation = useNavigation();

  const { handleLoading } = useContext(LoadingContext);

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = async () => {
    const payload: RegisterDto = {
      name,
      cpf,
      phone,
      email,
      password,
      repeatPassword,
    };

    try {
      handleLoading(true);
      await api.post('users', payload);
      Alert.alert('', 'Cadastro realizado');
      toBack();
    } catch (error) {
      console.warn(error);
    } finally {
      handleLoading(false);
    }
  };

  const toBack = () => {
    navigation.goBack();
  };

  return (
    <MainView>
      <View style={inputs}>
        <TextInput
          style={input}
          placeholder="Nome"
          autoCorrect={false}
          value={name}
          onChangeText={(text) => setName(text)}
          onSubmitEditing={() => {
            // @ts-ignore
            this.cpf.focus();
          }}
        />

        <TextInput
          style={input}
          placeholder="CPF"
          autoCorrect={false}
          keyboardType="number-pad"
          value={cpf}
          onChangeText={(text) => setCpf(text)}
          onSubmitEditing={() => {
            // @ts-ignore
            this.phone.focus();
          }}
          ref={(input) => {
            // @ts-ignore
            this.cpf = input;
          }}
        />

        <TextInput
          style={input}
          placeholder="Telefone"
          autoCorrect={false}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          onSubmitEditing={() => {
            // @ts-ignore
            this.email.focus();
          }}
          ref={(input) => {
            // @ts-ignore
            this.phone = input;
          }}
        />

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
          ref={(input) => {
            // @ts-ignore
            this.email = input;
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
          <Text style={btnText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[btn, btnSecondary]} onPress={toBack}>
          <Text style={[btnText, btnTextSecondary]}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </MainView>
  );
}
