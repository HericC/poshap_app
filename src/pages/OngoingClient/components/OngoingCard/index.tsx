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
import { OngoingDto } from './dto';
import { CancellationScoreDto } from '../../../Profile/dto';
import { formatRatings } from '../../../../utils/Functions';

import RatingCard from '../../../../components/RatingCard';

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

export default function OngoingCard({
  ongoingId,
  setOngoingId,
  getOngoing,
  status,
}: any) {
  const { handleLoading } = useContext(LoadingContext);

  const [ongoing, setOngoing] = useState({} as OngoingDto);
  const [cancellationScore, setCancellationScore] = useState(0);
  const [showRatingCard, setShowRatingCard] = useState(false);

  useEffect(() => {
    if (ongoingId) getOngoingById();
  }, [ongoingId]);

  const handleSubmit = async () => {
    try {
      // handleLoading(true);
      await api.patch(`ongoing/canceled/${ongoingId}`);
      getOngoing();
      Alert.alert('', 'Serviço cancelado');
      close();
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const getOngoingById = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: OngoingDto } = await api.get(
        `ongoing/${ongoingId}`,
      );
      setOngoing(data);
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

  const canceledBy = () => {
    switch (ongoing?.canceledUserId) {
      case ongoing?.providerId:
        return 'prestador';
      case ongoing?.clientId:
        return 'cliente';
      default:
        return '';
    }
  };

  const close = () => {
    setOngoingId('');
    setOngoing({} as any);
    setCancellationScore(0);
  };

  return (
    <Modal animationType="fade" visible={!!ongoingId} transparent={true}>
      <ScrollView style={scrollModal}>
        <View style={modal}>
          <View style={container}>
            <Text style={title}>Serviço</Text>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Nome do prestador:</Text>
              <Text style={text}>{ongoing?.provider?.name}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Telefone do prestador:</Text>
              <Text style={text}>{ongoing?.provider?.phone}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Categoria do serviço:</Text>
              <Text style={text}>{ongoing?.category}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Média de preço do serviço:</Text>
              <Text style={text}>R$ {ongoing?.price}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Descrição do serviço:</Text>
              <Text style={text}>{ongoing?.description}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Média das avaliações do prestador:</Text>
              <Text style={text}>
                {formatRatings(ongoing?.provider?.ratings?.providerRating)}
              </Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Média das avaliações dos serviços:</Text>
              <Text style={text}>
                {formatRatings(ongoing?.provider?.ratings?.serviceRating)}
              </Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>
                Taxa de serviços cancelados do prestador:
              </Text>
              <Text style={text}>{canceledServiceFee()}</Text>
            </View>

            {status === 'canceled' && (
              <View style={[texts, { marginBottom: 10 }]}>
                <Text style={textTitle}>Cancelado pelo {canceledBy()}:</Text>
                <Text style={text}>
                  {new Date(ongoing?.canceledDate ?? '').toLocaleDateString()}
                </Text>
              </View>
            )}

            <View style={[btns, { marginTop: 10 }]}>
              {status === 'ongoing' && (
                <TouchableOpacity
                  style={[btn, btnDangerColor]}
                  onPress={() => handleSubmit()}
                >
                  <Text style={btnText}>Cancelar</Text>
                </TouchableOpacity>
              )}

              {(status === 'finished' || status === 'canceled') && (
                <TouchableOpacity
                  style={btn}
                  onPress={() => setShowRatingCard(true)}
                >
                  <Text style={btnText}>Avaliar</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={[btn, btnSecondary]} onPress={close}>
                <Text style={[btnText, btnTextSecondary]}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <RatingCard
            userId={ongoing?.providerId}
            label="provedor"
            path="provider"
            showRatingCard={showRatingCard}
            setShowRatingCard={setShowRatingCard}
          />
        </View>
      </ScrollView>
    </Modal>
  );
}
