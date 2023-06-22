import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import api from '../../services/api';
import { LoadingContext } from '../../contexts/LoadingContext';
import { AuthContext } from '../../contexts/AuthContext';
import { PlansDto, updatePlanDto } from './dto';

import MainView from '../../components/MainView';
import RadioButton from '../../components/RadioButton';

import globalStyles from '../../styles';
const { btn, btnText } = globalStyles;

import styles from './styles';
const { header, section, title, note, mt } = styles;

export default function Plans() {
  const { handleLoading } = useContext(LoadingContext);
  const { authUser } = useContext(AuthContext);

  const [plans, setPlans] = useState([] as PlansDto[]);
  const [keySelected, setKeySelected] = useState('');
  const [typeSelected, setTypeSelected] = useState('');
  const [paymentSelected, setPaymentSelected] = useState('');

  const planSelected = useMemo(() => {
    return plans.find((plan) => plan.key === keySelected);
  }, [keySelected]);

  useEffect(() => {
    getPlans();
  }, []);

  const getPlans = async () => {
    try {
      // handleLoading(true);
      const { data }: { data: PlansDto[] } = await api.get('users/plans');
      setPlans(data);
      setKeySelected(authUser?.planKey ?? '');
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  const handleSubmit = async () => {
    const payload: updatePlanDto = {
      key: keySelected,
      typePlan: typeSelected,
      typePayment: paymentSelected,
    };

    try {
      // handleLoading(true);
      const { data }: any = await api.patch('users/update-plan', payload);

      let msg = '';
      if (paymentSelected === 'wallet') msg = 'Plano atualizado';
      if (paymentSelected === 'bankSlip')
        msg = `Boleto gerado\n\nPara atualizar o plano efetui o pagamento:\n${data.url}`;

      Alert.alert('', msg);
    } catch (error) {
      console.warn(error);
    } finally {
      // handleLoading(false);
    }
  };

  return (
    <MainView showLogo={false} center={false}>
      <Text style={header}>
        Seu plano atual expira em: {authUser?.planDate}
      </Text>

      {plans.map((plan) => {
        return (
          <RadioButton
            key={plan.key}
            active={plan.key === keySelected}
            callback={() => setKeySelected(plan.key)}
          >
            <View style={section}>
              <Text style={title}>{plan.name}</Text>
              <Text style={note}>{plan.description}</Text>
            </View>
          </RadioButton>
        );
      })}

      <View style={mt}>
        <RadioButton
          small={true}
          active={typeSelected === 'monthly'}
          callback={() => setTypeSelected('monthly')}
        >
          <Text style={title}>R$ {planSelected?.monthlyPrice ?? 0} /Mês</Text>
        </RadioButton>

        <RadioButton
          small={true}
          active={typeSelected === 'quarterly'}
          callback={() => setTypeSelected('quarterly')}
        >
          <Text style={title}>
            R$ {planSelected?.quarterlyPrice ?? 0} /Trimestral
          </Text>
        </RadioButton>

        <RadioButton
          small={true}
          active={typeSelected === 'semester'}
          callback={() => setTypeSelected('semester')}
        >
          <Text style={title}>
            R$ {planSelected?.semesterPrice ?? 0} /Semestral
          </Text>
        </RadioButton>
      </View>

      <View style={mt}>
        <RadioButton
          small={true}
          active={paymentSelected === 'wallet'}
          callback={() => setPaymentSelected('wallet')}
        >
          <Text style={title}>Carteira</Text>
        </RadioButton>

        <RadioButton
          small={true}
          active={paymentSelected === 'bankSlip'}
          callback={() => setPaymentSelected('bankSlip')}
        >
          <Text style={title}>Boleto</Text>
        </RadioButton>
      </View>

      <TouchableOpacity style={[btn, mt]} onPress={handleSubmit}>
        <Text style={btnText}>Atualizar Plano</Text>
      </TouchableOpacity>
    </MainView>
  );
}
