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
import { ServicesDto } from './dto';

import Filter from './components/Filter';
import ServiceCard from './components/ServiceCard';

import globalStyles from '../../styles';
const {
  list,
  listItem,
  listItemHeader,
  listItemTitle,
  listItemText,
  link,
  linkText,
  title,
} = globalStyles;

import styles from './styles';
const { safeAreaView } = styles;

export default function Home() {
  const { handleLoading } = useContext(LoadingContext);

  const [services, setServices] = useState([] as ServicesDto[]);
  const [categories, setCategories] = useState([] as string[]);

  const [showFilter, setShowFilter] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});

  const [serviceCardId, setServiceCardId] = useState('');

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (Object.keys(filterPayload).length) getServices();
  }, [filterPayload]);

  const getCategories = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: string[] } = await api.get('services/categories');
      setCategories(data);
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const getServices = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: ServicesDto[] } = await api.get('services', {
        params: filterPayload,
      });
      setServices(data);
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  return (
    <SafeAreaView style={safeAreaView}>
      <TouchableOpacity
        style={[link, { marginVertical: 6 }]}
        onPress={() => setShowFilter(!showFilter)}
      >
        <Text style={[linkText, { fontSize: 20 }]}>Filtros</Text>
      </TouchableOpacity>

      <Filter
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        categories={categories}
        setFilterPayload={setFilterPayload}
      />

      {services.length ? (
        <>
          <FlatList
            data={services}
            renderItem={({ item }) => (
              <View style={list}>
                <TouchableOpacity
                  style={listItem}
                  onPress={() => setServiceCardId(item.id)}
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

          <ServiceCard
            serviceId={serviceCardId}
            setServiceId={setServiceCardId}
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
