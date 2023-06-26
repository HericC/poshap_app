import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import api from '../../../../services/api';
import { LoadingContext } from '../../../../contexts/LoadingContext';
import { OngoingDto, OrderDto } from './dto';

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

export default function OrderCard({ orderId, setOrderId, getOrders }: any) {
  const { handleLoading } = useContext(LoadingContext);

  const [order, setOrder] = useState({} as OrderDto);

  useEffect(() => {
    if (orderId) getOrder();
  }, [orderId]);

  const handleSubmit = async (accept: boolean) => {
    const payload: OngoingDto = { orderId };

    try {
      // handleLoading(true);
      accept
        ? await api.post('ongoing', payload)
        : await api.delete(`orders/${orderId}`);
      getOrders();
      const msg = accept ? 'Solicitação aceita' : 'Solicitação recusada';
      Alert.alert('', msg);
      close();
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const getOrder = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: OrderDto } = await api.get(`orders/${orderId}`);
      setOrder(data);
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const close = () => {
    setOrderId('');
    setOrder({} as any);
  };

  return (
    <Modal animationType="fade" visible={!!orderId} transparent={true}>
      <ScrollView style={scrollModal}>
        <View style={modal}>
          <View style={container}>
            <Text style={title}>
              {order?.scheduled ? 'Solicitação agendada' : 'Solicitação'}
            </Text>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Nome do cliente:</Text>
              <Text style={text}>{order?.client?.name}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Telefone do cliente:</Text>
              <Text style={text}>{order?.client?.phone}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Categoria do serviço:</Text>
              <Text style={text}>{order?.category}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Média de preço do serviço:</Text>
              <Text style={text}>R$ {order?.price}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Descrição do serviço:</Text>
              <Text style={text}>{order?.description}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Avaliações do cliente:</Text>
              <Text style={text}>{order?.client?.ratings?.clientRating}</Text>
            </View>

            {order?.scheduledDate && (
              <View style={[texts, { marginBottom: 10 }]}>
                <Text style={textTitle}>
                  {order?.scheduled ? 'Agendado para:' : 'Agendamento para:'}
                </Text>
                <Text style={text}>
                  {new Date(order?.scheduledDate ?? '').toLocaleDateString()}
                </Text>
              </View>
            )}

            {!order?.scheduled && (
              <View style={[btns, { marginTop: 10 }]}>
                <TouchableOpacity
                  style={btn}
                  onPress={() => handleSubmit(true)}
                >
                  <Text style={btnText}>Aceitar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[btn, btnDangerColor]}
                  onPress={() => handleSubmit(false)}
                >
                  <Text style={btnText}>Recusar</Text>
                </TouchableOpacity>
              </View>
            )}

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
