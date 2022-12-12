import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import uuid from 'react-native-uuid';

import { Input } from '../../components/form/Input';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';
import { Button } from '../../components/form/Button';
import { TransactionTypeButton } from '../../components/form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/form/CategorySelectButton';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { CategorySelect } from '../CategorySelect';
import { InputHookForm } from '../../components/form/InputHookForm';
import { useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

interface FormData {
  name: string;
  amount: string;
}

const formDataValidation = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  amount: yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Preço é obrigatório'),
});

export const Register = ({ navigation }) => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const dataKey = '@gofinances:transactions';

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  // const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formDataValidation, { abortEarly: false }),
  });

  const handleSelect = (type: 'positive' | 'negative') => {
    setTransactionType(type);
  };

  const handleRegister = async (formData: FormData) => {
    if (!transactionType) return Alert.alert('Selecione um tipo de transação');

    if (category.key === 'category')
      return Alert.alert('Selecione uma categoria');

    const newTransaction = {
      id: String(uuid.v4()),
      name: formData.name,
      amount: formData.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormated = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });

      navigation.navigate('Transações');
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível cadastrar');
    }
  };

  useFocusEffect(
    useCallback(() => {
      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });
    }, [])
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <StatusBar style="light" translucent backgroundColor="transparent" />

        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputHookForm
              control={control}
              name="name"
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && (errors.name.message as string)}
            />
            <InputHookForm
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && (errors.amount.message as string)}
            />

            <TransactionTypes>
              <TransactionTypeButton
                isActive={transactionType === 'positive'}
                onPress={() => handleSelect('positive')}
                title="Entrada"
                type="positive"
              />
              <TransactionTypeButton
                isActive={transactionType === 'negative'}
                onPress={() => handleSelect('negative')}
                title="Saída"
                type="negative"
              />
            </TransactionTypes>

            <CategorySelectButton
              title={category.name}
              onPress={() => setCategoryModalOpen(true)}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeCategorySelect={() => setCategoryModalOpen(false)}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};
