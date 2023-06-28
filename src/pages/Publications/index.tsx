import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import api from '../../services/api';
import { LoadingContext } from '../../contexts/LoadingContext';
import { PublicationsDto } from './dto';

import PublicationCard from './components/PublicationCard';

import globalStyles from '../../styles';
const { list, listItem, listItemHeader, listItemTitle, listItemText, title } =
  globalStyles;

import styles from '../Home/styles';
const { safeAreaView } = styles;

export default function Publications() {
  const { handleLoading } = useContext(LoadingContext);

  const [publications, setPublications] = useState([] as PublicationsDto[]);
  const [publicationCardId, setPublicationCardId] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getPublications();
  }, []);

  const getPublications = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: PublicationsDto[] } = await api.get(
        'services/logged',
      );
      setPublications(data);
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getPublications();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={safeAreaView}>
      {publications.length ? (
        <>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={publications}
            renderItem={({ item }) => (
              <View style={list}>
                <TouchableOpacity
                  style={listItem}
                  onPress={() => setPublicationCardId(item.id)}
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

          <PublicationCard
            publicationId={publicationCardId}
            setPublicationId={setPublicationCardId}
            getPublications={getPublications}
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
