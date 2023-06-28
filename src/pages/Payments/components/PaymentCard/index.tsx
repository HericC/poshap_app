import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
  Linking,
} from 'react-native';
import api from '../../../../services/api';
import { LoadingContext } from '../../../../contexts/LoadingContext';
import { BarCodeDto, PaymentDto } from './dto';
import { PaymentAction, PaymentStatus, PaymentType } from '../../enums';

import globalStyles from '../../../../styles';
const {
  texts,
  textTitle,
  text,
  btns,
  btn,
  btnText,
  btnSecondary,
  btnTextSecondary,
  btnDangerColor,
  title,
} = globalStyles;

import styles from './styles';
const { scrollModal, modal, container } = styles;

export default function PaymentCard({
  paymentId,
  setPaymentId,
  getPayments,
}: any) {
  const navigation = useNavigation();

  const { handleLoading } = useContext(LoadingContext);

  const [payment, setPayment] = useState({} as PaymentDto);

  useEffect(() => {
    if (paymentId) getPayment();
  }, [paymentId]);

  const getPayment = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: PaymentDto } = await api.get(
        `users/payments/${paymentId}`,
      );
      setPayment(data);
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const toView = async () => {
    const support = await Linking.canOpenURL(payment.url);
    if (support) await Linking.openURL(payment.url);
    else
      Alert.alert('Dispositivo sem suporte', `Acesso direto:\n${payment.url}`);
  };

  const toCopy = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: BarCodeDto } = await api.get(
        `users/payments/bar-code/${paymentId}`,
      );

      await Clipboard.setStringAsync(data.barCode);
      Alert.alert('', 'Código de barras copiado');
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const close = () => {
    setPaymentId('');
    setPayment({} as any);
  };

  return (
    <Modal animationType="fade" visible={!!paymentId} transparent={true}>
      <ScrollView style={scrollModal}>
        <View style={modal}>
          <View style={container}>
            <Text style={title}>Pagamento</Text>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Ação:</Text>
              <Text style={text}>
                {
                  // @ts-ignore
                  PaymentAction[payment?.action]
                }
              </Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Valor:</Text>
              <Text style={text}>R$ {payment?.value}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Status:</Text>
              <Text style={text}>
                {
                  // @ts-ignore
                  PaymentStatus[payment?.status]
                }
              </Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Tipo:</Text>
              <Text style={text}>
                {
                  // @ts-ignore
                  PaymentType[payment?.type]
                }
              </Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Data:</Text>
              <Text style={text}>
                {new Date(payment?.createdAt).toLocaleDateString()}
              </Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Vencimento:</Text>
              <Text style={text}>
                {new Date(payment?.dueDate).toLocaleDateString()}
              </Text>
            </View>

            <View style={[btns, { marginTop: 10 }]}>
              <TouchableOpacity style={btn} onPress={toView}>
                <Text style={btnText}>Baixar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={btn} onPress={toCopy}>
                <Text style={btnText}>Copiar</Text>
              </TouchableOpacity>
            </View>

            <View style={[btns, { marginTop: 10 }]}>
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
