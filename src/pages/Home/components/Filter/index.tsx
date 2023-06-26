import React, { useEffect, useState } from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MultiSelect from 'react-native-multiple-select';
import { Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';

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
  const [searchEditing, setSearchEditing] = useState('');
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);
  const [selectedCategories, setSelectedCategories] = useState([] as string[]);

  useEffect(() => {
    setPayload();
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
                    max={300}
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
