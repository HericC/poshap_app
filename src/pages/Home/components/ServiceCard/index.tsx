import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Modal } from 'react-native';
import api from '../../../../services/api';
import { LoadingContext } from '../../../../contexts/LoadingContext';
import { ServiceDto } from './dto';
import { CancellationScoreDto } from '../../../Profile/dto';

import globalStyles from '../../../../styles';
const { link, linkText, texts, textTitle, text } = globalStyles;

import styles from './styles';
const { modal, container } = styles;

export default function ServiceCard({ serviceId, setServiceId }: any) {
  const { handleLoading } = useContext(LoadingContext);

  const [service, setService] = useState({} as ServiceDto);
  const [cancellationScore, setCancellationScore] = useState(0);

  useEffect(() => {
    if (serviceId) getService();
  }, [serviceId]);

  const getService = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: ServiceDto } = await api.get(
        `services/${serviceId}`,
      );
      setService(data);
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
    setServiceId('');
    setService({} as any);
  };

  return (
    <Modal animationType="fade" visible={!!serviceId} transparent={true}>
      <View style={modal}>
        <View style={container}>
          <TouchableOpacity
            style={[link, { marginTop: 6 }]}
            onPress={() => close()}
          >
            <Text style={[linkText, { fontSize: 20 }]}>Fechar</Text>
          </TouchableOpacity>

          <View style={texts}>
            <Text style={textTitle}>Nome:</Text>
            <Text style={text}>{service?.provider?.name}</Text>
          </View>

          <View style={texts}>
            <Text style={textTitle}>Telefone:</Text>
            <Text style={text}>{service?.provider?.phone}</Text>
          </View>

          <View style={texts}>
            <Text style={textTitle}>Categoria:</Text>
            <Text style={text}>{service?.category}</Text>
          </View>

          <View style={texts}>
            <Text style={textTitle}>Preço:</Text>
            <Text style={text}>R$ {service?.price}</Text>
          </View>

          <View style={texts}>
            <Text style={textTitle}>Descrição:</Text>
            <Text style={text}>{service?.description}</Text>
          </View>

          <View style={texts}>
            <Text style={textTitle}>Avaliações do prestador:</Text>
            <Text style={text}>
              {service?.provider?.ratings.providerRating}
            </Text>
          </View>

          <View style={texts}>
            <Text style={textTitle}>Avaliações dos serviços:</Text>
            <Text style={text}>{service?.provider?.ratings.serviceRating}</Text>
          </View>

          <View style={texts}>
            <Text style={textTitle}>Taxa de serviços cancelados:</Text>
            <Text style={text}>{canceledServiceFee()}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
