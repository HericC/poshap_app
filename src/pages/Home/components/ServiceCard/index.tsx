import React, { useContext, useEffect, useState, useMemo } from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import api from '../../../../services/api';
import { LoadingContext } from '../../../../contexts/LoadingContext';
import { OrderDto, ServiceDto } from './dto';
import { CancellationScoreDto } from '../../../Profile/dto';

import RadioButton from '../../../../components/RadioButton';

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
  inputs,
  input,
  title,
} = globalStyles;

import styles from './styles';
const { scrollModal, modal, container } = styles;

export default function ServiceCard({ serviceId, setServiceId }: any) {
  const { handleLoading } = useContext(LoadingContext);

  const tomorrow = useMemo(() => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  }, []);

  const [service, setService] = useState({} as ServiceDto);
  const [cancellationScore, setCancellationScore] = useState(0);
  const [scheduling, setScheduling] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [schedulingDate, setSchedulingDate] = useState(tomorrow);

  useEffect(() => {
    if (serviceId) getService();
  }, [serviceId]);

  const handleSubmit = async () => {
    const payload: OrderDto = {
      serviceId,
      schedulingDate: scheduling ? schedulingDate : undefined,
    };

    try {
      // handleLoading(true);
      await api.post('orders', payload);
      const msg = scheduling
        ? 'Solicitação de agendamento enviada'
        : 'Solicitação enviada';
      Alert.alert('', msg);
      close();
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

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
    setScheduling(false);
    setShowDateTimePicker(false);
    setSchedulingDate(tomorrow);
  };

  return (
    <Modal animationType="fade" visible={!!serviceId} transparent={true}>
      <ScrollView style={scrollModal}>
        <View style={modal}>
          <View style={container}>
            <Text style={title}>Serviço</Text>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Nome do prestador:</Text>
              <Text style={text}>{service?.provider?.name}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Telefone do prestador:</Text>
              <Text style={text}>{service?.provider?.phone}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Categoria do serviço:</Text>
              <Text style={text}>{service?.category}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Média de preço do serviço:</Text>
              <Text style={text}>R$ {service?.price}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Descrição do serviço:</Text>
              <Text style={text}>{service?.description}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Avaliações do prestador:</Text>
              <Text style={text}>
                {service?.provider?.ratings?.providerRating}
              </Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Avaliações dos serviços:</Text>
              <Text style={text}>
                {service?.provider?.ratings?.serviceRating}
              </Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Taxa de serviços cancelados:</Text>
              <Text style={text}>{canceledServiceFee()}</Text>
            </View>

            {service?.scheduling && (
              <RadioButton
                small={true}
                active={scheduling}
                callback={() => setScheduling(!scheduling)}
              >
                <Text>Agendar</Text>
              </RadioButton>
            )}

            {scheduling && (
              <View style={[inputs, { marginVertical: 0 }]}>
                <View>
                  <TouchableOpacity onPress={() => setShowDateTimePicker(true)}>
                    <TextInput
                      style={input}
                      value={schedulingDate.toLocaleDateString()}
                      editable={false}
                    />
                  </TouchableOpacity>
                </View>

                <View>
                  {showDateTimePicker && (
                    <DateTimePicker
                      value={schedulingDate}
                      minimumDate={tomorrow}
                      onChange={(event: DateTimePickerEvent, date?: Date) => {
                        setShowDateTimePicker(false);
                        setSchedulingDate(date ?? tomorrow);
                      }}
                    />
                  )}
                </View>
              </View>
            )}

            <View style={[btns, { marginTop: 10 }]}>
              <TouchableOpacity style={btn} onPress={() => handleSubmit()}>
                <Text style={btnText}>
                  {scheduling ? 'Agendar' : 'Solicitar'}
                </Text>
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
