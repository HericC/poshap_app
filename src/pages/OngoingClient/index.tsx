import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import api from '../../services/api';
import { LoadingContext } from '../../contexts/LoadingContext';
import { OngoingDto } from './dto';

import OngoingCard from './components/OngoingCard';

import globalStyles from '../../styles';
const { list, listItem, listItemHeader, listItemTitle, listItemText, title } =
  globalStyles;

import styles from '../Home/styles';
const { safeAreaView } = styles;

export default function OngoingClient({ route }: any) {
  const { handleLoading } = useContext(LoadingContext);

  const [ongoing, setOngoing] = useState([] as OngoingDto[]);
  const [ongoingCardId, setOngoingCardId] = useState('');

  useEffect(() => {
    getOngoing();
  }, []);

  const getOngoing = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: OngoingDto[] } = await api.get('ongoing/client', {
        params: { status: route.params.status },
      });
      setOngoing(data);
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  return (
    <SafeAreaView style={safeAreaView}>
      {ongoing.length ? (
        <>
          <FlatList
            data={ongoing}
            renderItem={({ item }) => (
              <View style={list}>
                <TouchableOpacity
                  style={listItem}
                  onPress={() => setOngoingCardId(item.id)}
                >
                  <View style={listItemHeader}>
                    <Text style={listItemTitle}>{item.category}</Text>
                    <Text style={listItemText}>R$ {item.price}</Text>
                  </View>
                  <Text style={listItemText}>{item.description}</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <OngoingCard
            ongoingId={ongoingCardId}
            setOngoingId={setOngoingCardId}
            getOngoing={getOngoing}
            status={route.params.status}
          />
        </>
      ) : (
        <View style={list}>
          <Text style={title}>Lista vazia</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
