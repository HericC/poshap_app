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
import { CancellationScoreDto } from '../../../Profile/dto';

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
  const [cancellationScore, setCancellationScore] = useState(0);

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
      getCancellationScore(data.providerId);
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const getCancellationScore = async (id: string) => {
    try {
      const { data }: { data: CancellationScoreDto } = await api.get(
        `ongoing/cancellationScore/${id}`,
      );
      setCancellationScore(data.score);
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const canceledServiceFee = () => {
    if (cancellationScore > 100) return 'Alta';
    if (cancellationScore > 50) return 'Média';
    if (cancellationScore > 0) return 'Baixa';
    return 'Não possui cancelamentos';
  };

  const close = () => {
    setOrderId('');
    setOrder({} as any);
    setCancellationScore(0);
  };

  return (
    <Modal animationType="fade" visible={!!orderId} transparent={true}>
      <ScrollView style={scrollModal}>
        <View style={modal}>
          <View style={container}>
            <Text style={title}>Solicitação</Text>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Nome do prestador:</Text>
              <Text style={text}>{order?.provider?.name}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Telefone do prestador:</Text>
              <Text style={text}>{order?.provider?.phone}</Text>
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

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>
                Taxa de serviços cancelados do prestador:
              </Text>
              <Text style={text}>{canceledServiceFee()}</Text>
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
