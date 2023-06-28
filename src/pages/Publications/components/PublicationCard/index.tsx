import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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
import { PublicationDto } from './dto';

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

export default function PublicationCard({
  publicationId,
  setPublicationId,
  getPublications,
}: any) {
  const navigation = useNavigation();

  const { handleLoading } = useContext(LoadingContext);

  const [publication, setPublication] = useState({} as PublicationDto);

  useEffect(() => {
    if (publicationId) getPublication();
  }, [publicationId]);

  const handleSubmit = async () => {
    try {
      // handleLoading(true);
      await api.delete(`services/${publicationId}`);
      getPublications();
      Alert.alert('', 'Publicação removida');
      close();
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const getPublication = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: PublicationDto } = await api.get(
        `services/${publicationId}`,
      );
      setPublication(data);
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const toPublish = () => {
    navigation.navigate({
      name: 'new-service',
      params: { publication },
    } as never);
  };

  const close = () => {
    setPublicationId('');
    setPublication({} as any);
  };

  return (
    <Modal animationType="fade" visible={!!publicationId} transparent={true}>
      <ScrollView style={scrollModal}>
        <View style={modal}>
          <View style={container}>
            <Text style={title}>Publicação</Text>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Categoria do serviço:</Text>
              <Text style={text}>{publication?.category}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Média de preço do serviço:</Text>
              <Text style={text}>R$ {publication?.price}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Descrição do serviço:</Text>
              <Text style={text}>{publication?.description}</Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Permiti Agendamento:</Text>
              <Text style={text}>
                {publication?.scheduling ? 'Sim' : 'Não'}
              </Text>
            </View>

            <View style={[texts, { marginBottom: 10 }]}>
              <Text style={textTitle}>Possui prioridade:</Text>
              <Text style={text}>{publication?.priority ? 'Sim' : 'Não'}</Text>
            </View>

            <View style={[btns, { marginTop: 10 }]}>
              <TouchableOpacity style={btn} onPress={toPublish}>
                <Text style={btnText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[btn, btnDangerColor]}
                onPress={handleSubmit}
              >
                <Text style={btnText}>Remover</Text>
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
