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
import { OrderDto } from './dto';

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
} = globalStyles;

import styles from './styles';
const { scrollModal, modal, container } = styles;

export default function OrderCard({ orderId, setOrderId, getOrders }: any) {
  const { handleLoading } = useContext(LoadingContext);

  const [order, setOrder] = useState({} as OrderDto);

  useEffect(() => {
    if (orderId) getOrder();
  }, [orderId]);

  const handleSubmit = async () => {
    try {
      // handleLoading(true);
      await api.delete(`orders/${orderId}`);
      getOrders();
      Alert.alert('', 'Solicitação cancelada');
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
            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Nome:</Text>
              <Text style={text}>{order?.provider?.name}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Telefone:</Text>
              <Text style={text}>{order?.provider?.phone}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Categoria:</Text>
              <Text style={text}>{order?.category}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Média de preço:</Text>
              <Text style={text}>R$ {order?.price}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Descrição:</Text>
              <Text style={text}>{order?.description}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Avaliações do prestador:</Text>
              <Text style={text}>
                {order?.provider?.ratings?.providerRating}
              </Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Avaliações dos serviços:</Text>
              <Text style={text}>
                {order?.provider?.ratings?.serviceRating}
              </Text>
            </View>

            {order?.scheduledDate && (
              <View style={[texts, { marginBottom: 10 }]}>
                <Text style={textTitle}>Agendamento para:</Text>
                <Text style={text}>
                  {new Date(order?.scheduledDate ?? '').toLocaleDateString()}
                </Text>
              </View>
            )}

            <View style={[btns, { marginTop: 10 }]}>
              <TouchableOpacity
                style={[btn, btnDangerColor]}
                onPress={() => handleSubmit()}
              >
                <Text style={btnText}>Cancelar</Text>
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