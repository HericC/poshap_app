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
import { PaymentsDto } from './dto';
import { ProfileDto } from '../Profile/dto';
import { PaymentAction, PaymentStatus } from './enums';

import PaymentCard from './components/PaymentCard';

import globalStyles from '../../styles';
const {
  list,
  listItem,
  listItemHeader,
  listItemTitle,
  listItemText,
  title,
  btns,
  btn,
  btnText,
  texts,
  textTitle,
  text,
} = globalStyles;

import homeStyles from '../Home/styles';
const { safeAreaView } = homeStyles;

import styles from './styles';
const { header, textWallet, btnDeposit } = styles;

export default function Payments() {
  const { handleLoading } = useContext(LoadingContext);

  const [profile, setProfile] = useState({} as ProfileDto);
  const [payments, setPayments] = useState([] as PaymentsDto[]);
  const [paymentCardId, setPaymentCardId] = useState('');

  useEffect(() => {
    getProfile();
    getPayments();
  }, []);

  const getProfile = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: ProfileDto } = await api.get('users');
      setProfile(data);
    } catch (error) {
      console.warn(error);
      // handleLoading(false);
    }
  };

  const getPayments = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: PaymentsDto[] } = await api.get('users/payments');
      setPayments(data);
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  return (
    <SafeAreaView style={safeAreaView}>
      {payments.length ? (
        <>
          <View style={header}>
            <View style={[texts, textWallet]}>
              <Text style={textTitle}>Carteira:</Text>
              <Text style={text}>{profile?.wallet}</Text>
            </View>

            <View style={[btns, btnDeposit]}>
              <TouchableOpacity
                style={[btn, { height: 50, backgroundColor: 'green' }]}
                onPress={() => {}}
              >
                <Text style={btnText}>Depositar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={payments}
            renderItem={({ item }) => (
              <View style={list}>
                <TouchableOpacity
                  style={listItem}
                  onPress={() => setPaymentCardId(item.id)}
                >
                  <View style={listItemHeader}>
                    <Text style={listItemTitle}>
                      {
                        // @ts-ignore
                        PaymentAction[item.action]
                      }
                    </Text>
                    <Text style={listItemText}>R$ {item.value}</Text>
                  </View>

                  <View style={listItemHeader}>
                    <Text style={listItemTitle}>
                      {
                        // @ts-ignore
                        PaymentStatus[item.status]
                      }
                    </Text>
                    <Text style={listItemText}>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />

          <PaymentCard
            paymentId={paymentCardId}
            setPaymentId={setPaymentCardId}
            getPayments={getPayments}
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
