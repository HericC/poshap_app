import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import api from '../../../../services/api';
import { LoadingContext } from '../../../../contexts/LoadingContext';
import { ValidateOtgCodeDto } from './dto';

import MainView from '../../../../components/MainView';

import globalStyles from '../../../../styles';
const { btns, btn, btnText } = globalStyles;

import styles from './styles';
const { input, inputs } = styles;

export default function ValidateOtgCode() {
  const navigation = useNavigation();

  const { handleLoading } = useContext(LoadingContext);

  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [number3, setNumber3] = useState('');
  const [number4, setNumber4] = useState('');
  const [number5, setNumber5] = useState('');
  const [number6, setNumber6] = useState('');

  const handleSubmit = async () => {
    const payload: ValidateOtgCodeDto = {
      otgCode: `${number1}${number2}${number3}${number4}${number5}${number6}`,
    };

    try {
      handleLoading(true);
      await api.post('auth/forgot-password/validate-otgcode', payload);

      navigation.navigate({
        name: 'new-password',
        params: { ...payload },
      } as never);
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
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="number-pad"
          maxLength={1}
          value={number1}
          onChangeText={(text) => {
            setNumber1(text);
            // @ts-ignore
            if (text) this.number2.focus();
          }}
          ref={(input) => {
            // @ts-ignore
            this.number1 = input;
          }}
        />

        <TextInput
          style={input}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="number-pad"
          maxLength={1}
          value={number2}
          onChangeText={(text) => {
            setNumber2(text);
            // @ts-ignore
            if (text) this.number3.focus();
          }}
          ref={(input) => {
            // @ts-ignore
            this.number2 = input;
          }}
        />

        <TextInput
          style={input}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="number-pad"
          maxLength={1}
          value={number3}
          onChangeText={(text) => {
            setNumber3(text);
            // @ts-ignore
            if (text) this.number4.focus();
          }}
          ref={(input) => {
            // @ts-ignore
            this.number3 = input;
          }}
        />

        <TextInput
          style={input}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="number-pad"
          maxLength={1}
          value={number4}
          onChangeText={(text) => {
            setNumber4(text);
            // @ts-ignore
            if (text) this.number5.focus();
          }}
          ref={(input) => {
            // @ts-ignore
            this.number4 = input;
          }}
        />

        <TextInput
          style={input}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="number-pad"
          maxLength={1}
          value={number5}
          onChangeText={(text) => {
            setNumber5(text);
            // @ts-ignore
            if (text) this.number6.focus();
          }}
          ref={(input) => {
            // @ts-ignore
            this.number5 = input;
          }}
        />

        <TextInput
          style={input}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="number-pad"
          maxLength={1}
          value={number6}
          onChangeText={(text) => {
            setNumber6(text);
            // @ts-ignore
            if (text) this.number1.focus();
          }}
          ref={(input) => {
            // @ts-ignore
            this.number6 = input;
          }}
        />
      </View>

      <View style={btns}>
        <TouchableOpacity style={btn} onPress={handleSubmit}>
          <Text style={btnText}>Validar código</Text>
        </TouchableOpacity>
      </View>
    </MainView>
  );
}
