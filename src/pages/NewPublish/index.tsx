import React, { useContext, useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import api from '../../services/api';
import { LoadingContext } from '../../contexts/LoadingContext';
import { AuthContext } from '../../contexts/AuthContext';
import { PublicationDto, PublishDto } from './dto';

import MainView from '../../components/MainView';
import RadioButton from '../../components/RadioButton';

import globalStyles from '../../styles';
const { inputs, input, btns, btn, btnText } = globalStyles;

export default function NewPublish() {
  const navigation = useNavigation();
  const route: any = useRoute();

  const { handleLoading } = useContext(LoadingContext);
  const { authUser } = useContext(AuthContext);

  const [publication, setPublication] = useState({} as PublicationDto);
  const [newCategory, setNewCategory] = useState(false);
  const [categories, setCategories] = useState([] as string[]);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [scheduling, setScheduling] = useState(false);
  const [priority, setPriority] = useState(false);

  useEffect(() => {
    setPriority(!editPriority());
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: string[] } = await api.get('services/categories');
      setCategories(data);
      fillPublish();
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const handleSubmit = async () => {
    const _price = +price.replace(',', '.');

    let payload: PublishDto | PublicationDto = {
      category,
      price: _price,
      description,
      scheduling,
      priority,
    };
    if (publication?.id) payload = checkChange(payload);

    try {
      // handleLoading(true);
      if (publication?.id) {
        await api.put(`services/${publication?.id}`, payload);
        Alert.alert('', 'Publicação editada');
        navigation.navigate('service' as never);
      } else {
        await api.post('services', payload);
        Alert.alert('', 'Publicação realizada');
        navigation.navigate('home-routes' as never);
      }
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const fillPublish = () => {
    const publication: PublicationDto = route.params?.publication;
    if (!publication) return;
    setPublication(publication);

    if (publication?.category) setCategory(publication?.category);
    if (publication?.price) setPrice(`${publication?.price}`);
    if (publication?.description) setDescription(publication?.description);
    if (publication?.scheduling) setScheduling(publication?.scheduling);
    if (publication?.priority) setPriority(publication?.priority);
  };

  const checkChange = (payload: PublicationDto) => {
    if (payload.category === publication?.category) delete payload.category;
    if (payload.price === publication?.price) delete payload.price;
    if (payload.description === publication?.description)
      delete payload.description;
    if (payload.scheduling === publication?.scheduling)
      delete payload.scheduling;
    if (payload.priority === publication?.priority) delete payload.priority;
    return payload;
  };

  const editScheduling = () => {
    return authUser?.planKey === 'gold';
  };

  const editPriority = () => {
    return authUser?.planKey === 'basic';
  };

  return (
    <MainView refresh={getCategories}>
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
          placeholder="Média de preço"
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
          active={priority}
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
          <Text style={btnText}>{publication?.id ? 'Editar' : 'Publicar'}</Text>
        </TouchableOpacity>
      </View>
    </MainView>
  );
}
