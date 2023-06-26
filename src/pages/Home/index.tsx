import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import api from '../../services/api';
import { ServicesDto } from './dto';

import Filter from './components/Filter';

import globalStyles from '../../styles';
const {
  list,
  listItem,
  listItemHeader,
  listItemTitle,
  listItemText,
  link,
  linkText,
} = globalStyles;

import styles from './styles';
const { safeAreaView } = styles;

export default function Home() {
  const [services, setServices] = useState([] as ServicesDto[]);
  const [categories, setCategories] = useState([] as string[]);

  const [showFilter, setShowFilter] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getServices();
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
        style={[link, { marginTop: 6 }]}
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

      <FlatList
        data={services}
        renderItem={({ item }) => (
          <View style={list}>
            <TouchableOpacity style={listItem}>
              <View style={listItemHeader}>
                <Text style={listItemTitle}>{item.category}</Text>
                <Text style={listItemText}>R$ {item.price}</Text>
              </View>
              <Text style={listItemText}>{item.description}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
