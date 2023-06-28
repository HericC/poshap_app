import React, { useContext, useEffect, useState } from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MultiSelect from 'react-native-multiple-select';
import { Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import api from '../../../../services/api';
import { LoadingContext } from '../../../../contexts/LoadingContext';
import { MinAndMaxPrices } from './dto';

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
} = globalStyles;

export default function Filter({
  showFilter,
  setShowFilter,
  categories,
  setFilterPayload,
}: any) {
  const { handleLoading } = useContext(LoadingContext);

  const [searchEditing, setSearchEditing] = useState('');
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minSlider, setMinSlider] = useState(0);
  const [maxSlider, setMaxSlider] = useState(10000);
  const [selectedCategories, setSelectedCategories] = useState([] as string[]);

  useEffect(() => {
    setPayload();
    getMinAndMaxPrices();
  }, [search, selectedCategories]);

  const setPayload = async () => {
    const payload: any = {
      search,
      minPrice: minPrice,
      maxPrice: maxPrice,
      categories: selectedCategories,
    };

    setFilterPayload(payload);
  };

  const getMinAndMaxPrices = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: MinAndMaxPrices } = await api.get(
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
          </View>
        </View>
      </View>
    </Modal>
  );
}
