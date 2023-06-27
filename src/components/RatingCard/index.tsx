import React, { useContext, useState } from 'react';
import { AirbnbRating } from 'react-native-ratings';
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
import { RatingClientDto, RatingProviderDto } from './dto';

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
  listItemTitle,
} = globalStyles;

import styles from './styles';
const { scrollModal, modal, container } = styles;

export default function RatingCard({
  userId,
  label,
  path,
  showRatingCard,
  setShowRatingCard,
}: any) {
  const { handleLoading } = useContext(LoadingContext);

  const [rating, setRating] = useState(3);
  const [note, setNote] = useState('');

  const [ratingService, setRatingService] = useState(3);
  const [noteService, setNoteService] = useState('');

  const handleSubmit = async () => {
    const payloadProvider: RatingProviderDto = {
      providerRating: rating,
      serviceRating: ratingService,
      providerNote: note,
      serviceNote: noteService,
      userId,
    };
    const payloadClient: RatingClientDto = { rating, note, userId };

    let payload: any = {};
    if (path === 'provider') payload = payloadProvider;
    else if (path === 'client') payload = payloadClient;

    try {
      // handleLoading(true);
      await api.post(`ratings/${path}`, payload);
      Alert.alert('', 'Avaliação enviada');
      close();
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const close = () => {
    setShowRatingCard(false);
    setRating(3);
    setNote('');
    setRatingService(3);
    setNoteService('');
  };

  return (
    <Modal animationType="fade" visible={showRatingCard} transparent={true}>
      <ScrollView style={scrollModal}>
        <View style={modal}>
          <View style={container}>
            <Text style={title}>Avaliar {label}</Text>

            <View style={inputs}>
              <Text style={listItemTitle}>Avaliação do {label}</Text>

              <View style={{ marginBottom: 10 }}>
                <AirbnbRating
                  defaultRating={rating}
                  reviews={['Terrível', 'Ruim', 'Ok', 'Bom', 'Ótimo']}
                  onFinishRating={setRating}
                />
              </View>

              <TextInput
                style={input}
                placeholder={`Observação do ${label}`}
                value={note}
                onChangeText={(text) => setNote(text)}
              />
            </View>

            {path === 'provider' && (
              <View style={inputs}>
                <Text style={listItemTitle}>Avaliação do serviço</Text>

                <View style={{ marginBottom: 10 }}>
                  <AirbnbRating
                    defaultRating={ratingService}
                    reviews={['Terrível', 'Ruim', 'Ok', 'Bom', 'Ótimo']}
                    onFinishRating={setRatingService}
                  />
                </View>

                <TextInput
                  style={input}
                  placeholder={`Observação do serviço`}
                  value={noteService}
                  onChangeText={(text) => setNoteService(text)}
                />
              </View>
            )}

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
