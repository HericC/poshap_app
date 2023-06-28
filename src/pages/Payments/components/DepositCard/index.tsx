import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import api from '../../../../services/api';
import { LoadingContext } from '../../../../contexts/LoadingContext';
import { DepositDto } from './dto';

import globalStyles from '../../../../styles';
const {
  btns,
  btn,
  btnText,
  btnSecondary,
  btnTextSecondary,
  title,
  inputs,
  input,
} = globalStyles;

import styles from './styles';
const { scrollModal, modal, container } = styles;

export default function DepositCard({
  showDepositCard,
  setShowDepositCard,
  getPayments,
}: any) {
  const { handleLoading } = useContext(LoadingContext);

  const [value, setValue] = useState('');

  const handleSubmit = async () => {
    const _price = +value.replace(',', '.');

    const payload: DepositDto = {
      value: _price,
      typePayment: 'bankSlip',
    };

    try {
      // handleLoading(true);
      const { data } = await api.patch('users/deposit', payload);
      getPayments();
      Alert.alert('', `Boleto gerado\n\nEfetui o pagamento:\n${data.url}`);
      close();
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const close = () => {
    setShowDepositCard(false);
    setValue('');
  };

  return (
    <Modal animationType="fade" visible={showDepositCard} transparent={true}>
      <ScrollView style={scrollModal}>
        <View style={modal}>
          <View style={container}>
            <Text style={title}>Depositar dinheiro na carteira</Text>

            <View style={inputs}>
              <TextInput
                style={input}
                placeholder="Valor"
                keyboardType="number-pad"
                value={value}
                onChangeText={(text) => setValue(text)}
              />
            </View>

            <View style={[btns, { marginTop: 10 }]}>
              <TouchableOpacity style={btn} onPress={handleSubmit}>
                <Text style={btnText}>Depositar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[btn, btnSecondary]} onPress={close}>
                <Text style={[btnText, btnTextSecondary]}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}
