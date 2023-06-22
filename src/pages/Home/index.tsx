import React, { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
} from 'react-native';
import api from '../../services/api';
import { ServicesDto } from './dto';

import globalStyles from '../../styles';
const {
  list,
  listItem,
  listItemHeader,
  listItemTitle,
  listItemText,
  inputs,
  input,
} = globalStyles;

import styles from './styles';
const { safeAreaView } = styles;

export default function Home() {
  const [services, setServices] = useState([] as ServicesDto[]);
  const [categories, setCategories] = useState([] as string[]);

  const [searchEditing, setSearchEditing] = useState('');
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState(250);
  const [category, setCategory] = useState('');

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getServices();
  }, [search, category]);

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
      const payload: any = {
        search,
        minPrice: 0,
        maxPrice: price,
        categories: category || undefined,
      };
      const { data }: { data: ServicesDto[] } = await api.get('services', {
        params: payload,
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
      <View style={list}>
        <View style={inputs}>
          <TextInput
            style={input}
            placeholder="Pesquisar"
            value={searchEditing}
            onChangeText={(text) => setSearchEditing(text)}
            onSubmitEditing={() => setSearch(searchEditing)}
          />

          <Slider
            minimumValue={0}
            maximumValue={500}
            value={price}
            thumbTintColor="#295BA8"
            minimumTrackTintColor="#295BA8"
            maximumTrackTintColor="#A82930"
            onValueChange={(value) => setPrice(value)}
          />
          <Text style={listItemText}>{price.toFixed()}</Text>

          <View style={input}>
            <Picker
              selectedValue={category}
              onValueChange={(item) => setCategory(item)}
            >
              <Picker.Item label="Selecione a categoria" value="" />
              {categories.map((category, index) => (
                <Picker.Item
                  key={category + index}
                  label={category}
                  value={category}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>

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
