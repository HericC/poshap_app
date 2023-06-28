import React, { useContext, useEffect, useState } from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MultiSelect from 'react-native-multiple-select';
import { AirbnbRating } from 'react-native-ratings';
import { Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import api from '../../../../services/api';
import { LoadingContext } from '../../../../contexts/LoadingContext';
import { FilterDto, MinAndMaxPricesDto } from './dto';

import globalStyles from '../../../../styles';
const {
  listItemText,
  inputs,
  input,
  multiSlider,
  filter,
  link,
  linkText,
  modalFilter,
  textTitle,
  listItemTitle,
} = globalStyles;

export default function Filter({
  showFilter,
  setShowFilter,
  setFilterPayload,
}: any) {
  const { handleLoading } = useContext(LoadingContext);

  const [categories, setCategories] = useState([] as string[]);
  const [searchEditing, setSearchEditing] = useState('');
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minSlider, setMinSlider] = useState(0);
  const [maxSlider, setMaxSlider] = useState(10000);
  const [rating, setRating] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([] as string[]);

  useEffect(() => {
    getCategories();
    getMinAndMaxPrices();
  }, []);

  useEffect(() => {
    setPayload();
  }, [search, rating, selectedCategories]);

  const setPayload = async () => {
    const payload: FilterDto = {
      search,
      minPrice: minPrice,
      maxPrice: maxPrice,
      categories: selectedCategories,
      rating: rating,
    };

    setFilterPayload(payload);
  };

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

  const getMinAndMaxPrices = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: MinAndMaxPricesDto } = await api.get(
        'services/min-and-max-prices',
      );
      setMinPrice(data.minPrice);
      setMaxPrice(data.maxPrice);
      setMinSlider(data.minPrice);
      setMaxSlider(data.maxPrice);
    } catch (error) {
      console.warn(error);
      // handleLoading(false);
    }
  };

  return (
    <Modal animationType="slide" visible={showFilter} transparent={true}>
      <View style={modalFilter}>
        <View style={filter}>
          <TouchableOpacity
            style={[link, { marginTop: 6 }]}
            onPress={() => setShowFilter(!showFilter)}
          >
            <Text style={[linkText, { fontSize: 20 }]}>Fechar</Text>
          </TouchableOpacity>

          <View style={inputs}>
            <TextInput
              style={input}
              placeholder="Pesquisar"
              value={searchEditing}
              onChangeText={(text) => setSearchEditing(text)}
              onSubmitEditing={() => setSearch(searchEditing)}
            />

            <View style={[input, { zIndex: 1 }]}>
              <MultiSelect
                items={categories.map((category: string) => {
                  return { id: category, name: category };
                })}
                uniqueKey="id"
                searchInputPlaceholderText="Pesquisar categorias..."
                selectText="Selecione as categorias"
                selectedText="Selecionado"
                selectedItems={selectedCategories}
                onSelectedItemsChange={setSelectedCategories}
                hideSubmitButton={true}
                hideTags={true}
              />
            </View>

            <View style={input}>
              <Text style={textTitle}>Faixa de preços</Text>

              <View style={[multiSlider, { marginTop: -14 }]}>
                <Text style={listItemText}>{minPrice}</Text>
                <View>
                  <MultiSlider
                    values={[minPrice, maxPrice]}
                    min={minSlider}
                    max={maxSlider}
                    sliderLength={180}
                    onValuesChange={(value) => {
                      setMinPrice(value[0]);
                      setMaxPrice(value[1]);
                    }}
                    onValuesChangeFinish={() => {
                      setPayload();
                    }}
                  />
                </View>
                <Text style={listItemText}>{maxPrice}</Text>
              </View>
            </View>

            <View style={inputs}>
              <Text style={listItemTitle}>Avaliação</Text>

              <View style={{ marginBottom: 10, marginTop: 5 }}>
                <AirbnbRating
                  defaultRating={rating}
                  showRating={false}
                  onFinishRating={setRating}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
