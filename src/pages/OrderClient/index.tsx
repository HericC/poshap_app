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
import { OrdersDto } from './dto';

import OrderCard from './components/OrderCard';

import globalStyles from '../../styles';
const { list, listItem, listItemHeader, listItemTitle, listItemText, title } =
  globalStyles;

import styles from '../Home/styles';
const { safeAreaView } = styles;

export default function OrderClient() {
  const { handleLoading } = useContext(LoadingContext);

  const [orders, setOrders] = useState([] as OrdersDto[]);
  const [orderCardId, setOrderCardId] = useState('');

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: OrdersDto[] } = await api.get('orders/client');
      setOrders(data);
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  return (
    <SafeAreaView style={safeAreaView}>
      {orders.length ? (
        <>
          <FlatList
            data={orders}
            renderItem={({ item }) => (
              <View style={list}>
                <TouchableOpacity
                  style={listItem}
                  onPress={() => setOrderCardId(item.id)}
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

          <OrderCard
            orderId={orderCardId}
            setOrderId={setOrderCardId}
            getOrders={getOrders}
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
