import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import api from '../../services/api';
import { LoadingContext } from '../../contexts/LoadingContext';
import { AuthContext } from '../../contexts/AuthContext';
import { EditDto, RegisterDto, UserDto } from './dto';

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
  btnDangerColor,
} = globalStyles;

export default function Register() {
  const navigation = useNavigation();
  const route: any = useRoute();

  const { handleLoading } = useContext(LoadingContext);
  const { handleLogout } = useContext(AuthContext);

  const [user, setUser] = useState({} as UserDto);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  useEffect(() => {
    if (!route.params?.edit) return;
    getProfile();
  }, []);

  const handleSubmit = async () => {
    let payload: RegisterDto | EditDto = {
      name,
      cpf,
      phone,
      email,
      password,
      repeatPassword,
    };
    if (route.params?.edit) payload = checkChange(payload);

    try {
      handleLoading(true);
      if (route.params?.edit) {
        await api.put('users', payload);
        Alert.alert('', 'Informações editada');
      } else {
        await api.post('users', payload);
        Alert.alert('', 'Cadastro realizado');
        toBack();
      }
    } catch (error) {
      console.warn(error);
    } finally {
      handleLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: UserDto } = await api.get('users');
      setUser(data);
      fillRegister(data);
    } catch (error) {
      console.warn(error);
      // handleLoading(false);
    }
  };

  const fillRegister = (data: UserDto) => {
    if (data.name) setName(data.name);
    if (data.cpf) setCpf(`${data.cpf}`);
    if (data.phone) setPhone(data.phone);
    if (data.email) setEmail(data.email);
  };

  const checkChange = (payload: EditDto) => {
    if (payload.name === user?.name) delete payload.name;
    if (payload.phone === user?.phone) delete payload.phone;
    if (payload.email === user?.email) delete payload.email;
    if (!payload.password) delete payload.password;
    if (!payload.repeatPassword) delete payload.repeatPassword;
    delete payload.cpf;
    return payload;
  };

  const toBack = () => {
    navigation.goBack();
  };

  const toDelete = async () => {
    try {
      // handleLoading(true);
      await api.delete('users');
      handleLogout();
      Alert.alert('', 'Conta excluída');
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
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
            route.params?.edit ? this.phone.focus() : this.cpf.focus();
          }}
        />

        <TextInput
          style={input}
          placeholder="CPF"
          autoCorrect={false}
          keyboardType="number-pad"
          value={cpf}
          onChangeText={(text) => setCpf(text)}
          editable={!route.params?.edit}
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
          <Text style={btnText}>
            {route.params?.edit ? 'Editar' : 'Cadastrar'}
          </Text>
        </TouchableOpacity>

        {route.params?.edit && (
          <TouchableOpacity style={[btn, btnDangerColor]} onPress={toDelete}>
            <Text style={btnText}>Excluir</Text>
          </TouchableOpacity>
        )}

        {!route.params?.edit && (
          <TouchableOpacity style={[btn, btnSecondary]} onPress={toBack}>
            <Text style={[btnText, btnTextSecondary]}>Voltar</Text>
          </TouchableOpacity>
        )}
      </View>
    </MainView>
  );
}
