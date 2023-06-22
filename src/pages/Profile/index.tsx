import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import api from '../../services/api';
import { LoadingContext } from '../../contexts/LoadingContext';
import { CancellationScoreDto, ProfileDto } from './dto';

import MainView from '../../components/MainView';

import globalStyles from '../../styles';
const { texts, text, textTitle } = globalStyles;

export default function Profile() {
  const { handleLoading } = useContext(LoadingContext);

  const [profile, setProfile] = useState({} as ProfileDto);
  const [cancellationScore, setCancellationScore] = useState(0);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: ProfileDto } = await api.get('users');
      setProfile(data);
      getCancellationScore(data.id);
    } catch (error) {
      console.warn(error);
      // handleLoading(false);
    }
  };

  const getCancellationScore = async (id: string) => {
    try {
      const { data }: { data: CancellationScoreDto } = await api.get(
        `ongoing/cancellationScore/${id}`,
      );
      setCancellationScore(data.score);
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const canceledServiceFee = () => {
    if (cancellationScore > 100) return 'Alta';
    if (cancellationScore > 50) return 'Média';
    if (cancellationScore > 0) return 'Baixa';
    return 'Não possui cancelamentos';
  };

  return (
    <MainView showLogo={false} center={false}>
      <View style={texts}>
        <Text style={textTitle}>Nome:</Text>
        <Text style={text}>{profile?.name}</Text>
      </View>

      <View style={texts}>
        <Text style={textTitle}>CPF:</Text>
        <Text style={text}>{profile?.cpf}</Text>
      </View>

      <View style={texts}>
        <Text style={textTitle}>E-mail:</Text>
        <Text style={text}>{profile?.email}</Text>
      </View>

      <View style={texts}>
        <Text style={textTitle}>Telefone:</Text>
        <Text style={text}>{profile?.phone}</Text>
      </View>

      <View style={texts}>
        <Text style={textTitle}>Plano:</Text>
        <Text style={text}>{profile?.plan?.name}</Text>
      </View>

      <View style={texts}>
        <Text style={textTitle}>Plano expira em:</Text>
        <Text style={text}>{profile?.planDate}</Text>
      </View>

      <View style={texts}>
        <Text style={textTitle}>Carteira:</Text>
        <Text style={text}>{profile?.wallet}</Text>
      </View>

      <View style={texts}>
        <Text style={textTitle}>Avaliações como cliente:</Text>
        <Text style={text}>{profile?.ratings?.clientRating}</Text>
      </View>

      <View style={texts}>
        <Text style={textTitle}>Avaliações como prestador:</Text>
        <Text style={text}>{profile?.ratings?.providerRating}</Text>
      </View>

      <View style={texts}>
        <Text style={textTitle}>Avaliações dos serviços:</Text>
        <Text style={text}>{profile?.ratings?.serviceRating}</Text>
      </View>

      <View style={texts}>
        <Text style={textTitle}>Taxa de serviços cancelados:</Text>
        <Text style={text}>{canceledServiceFee()}</Text>
      </View>
    </MainView>
  );
}
