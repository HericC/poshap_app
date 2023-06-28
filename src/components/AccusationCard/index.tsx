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
import api from '../../services/api';
import { LoadingContext } from '../../contexts/LoadingContext';
import { AccusationDto } from './dto';

import globalStyles from '../../styles';
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

export default function AccusationCard({
  accusedId,
  label,
  showAccusationCard,
  setShowAccusationCard,
}: any) {
  const { handleLoading } = useContext(LoadingContext);

  const [atitle, setAtitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    const payload: AccusationDto = {
      title: atitle,
      description: description,
      accusedId,
    };

    try {
      // handleLoading(true);
      await api.post('accusations', payload);
      Alert.alert('', 'Denuncia enviada');
      close();
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const close = () => {
    setShowAccusationCard(false);
    setAtitle('');
    setDescription('');
  };

  return (
    <Modal animationType="fade" visible={showAccusationCard} transparent={true}>
      <ScrollView style={scrollModal}>
        <View style={modal}>
          <View style={container}>
            <Text style={title}>Denunciar {label}</Text>

            <View style={inputs}>
              <TextInput
                style={input}
                placeholder={`Título`}
                value={atitle}
                onChangeText={(text) => setAtitle(text)}
              />

              <TextInput
                style={input}
                placeholder={`Descrição do ocorrido`}
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
            </View>

            <View style={[btns, { marginTop: 10 }]}>
              <TouchableOpacity style={btn} onPress={handleSubmit}>
                <Text style={btnText}>Enviar</Text>
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
