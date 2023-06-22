import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import api from '../../services/api';
import { LoadingContext } from '../../contexts/LoadingContext';
import { AuthContext } from '../../contexts/AuthContext';
import { PublishDto } from './dto';

import MainView from '../../components/MainView';
import RadioButton from '../../components/RadioButton';

import globalStyles from '../../styles';
const { inputs, input, btns, btn, btnText } = globalStyles;

export default function NewPublish() {
  const navigation = useNavigation();

  const { handleLoading } = useContext(LoadingContext);
  const { authUser } = useContext(AuthContext);

  const [newCategory, setNewCategory] = useState(false);
  const [categories, setCategories] = useState([] as string[]);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [scheduling, setScheduling] = useState(false);
  const [priority, setPriority] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

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

  const handleSubmit = async () => {
    const _price = +price.replace(',', '.');

    const payload: PublishDto = {
      category,
      price: _price,
      description,
      scheduling,
      priority,
    };

    try {
      // handleLoading(true);
      await api.post('services', payload);
      Alert.alert('', 'Publicação realizada');
      navigation.navigate('home-routes' as never);
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const editScheduling = () => {
    return authUser?.planKey === 'gold';
  };

  const editPriority = () => {
    return authUser?.planKey === 'basic';
  };

  return (
    <MainView>
      <View style={inputs}>
        <RadioButton
          small={true}
          active={newCategory}
          callback={() => {
            if (newCategory) setCategory('');
            setNewCategory(!newCategory);
          }}
        >
          <Text>Informar nova categoria</Text>
        </RadioButton>

        {newCategory ? (
          <TextInput
            style={input}
            placeholder="Categoria"
            value={category}
            onChangeText={(text) => setCategory(text)}
          />
        ) : (
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
        )}

        <TextInput
          style={input}
          placeholder="Preço estimado da hora"
          keyboardType="number-pad"
          value={price}
          onChangeText={(text) => setPrice(text)}
        />

        <TextInput
          style={input}
          placeholder="Descrição do serviço"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <RadioButton
          small={true}
          active={scheduling}
          callback={() => {
            if (!editScheduling())
              Alert.alert(
                '',
                'Seu plano é incompatível com a opção de agendamento',
              );
            else setScheduling(!scheduling);
          }}
        >
          <Text>Permitir Agendamento</Text>
        </RadioButton>

        <RadioButton
          small={true}
          active={priority || !editPriority()}
          callback={() => {
            if (!editPriority())
              Alert.alert(
                '',
                'Seu plano possui prioridade grátis em todas as publicações',
              );
            else setPriority(!priority);
          }}
        >
          <Text>Priorizar publicação</Text>
          <Text>Custo de 1 real da carteira</Text>
        </RadioButton>
      </View>

      <View style={btns}>
        <TouchableOpacity style={btn} onPress={handleSubmit}>
          <Text style={btnText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    </MainView>
  );
}
