import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

interface FormData {
  name: string;
  amount: string;
}

const formDataValidation = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  amount: yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo'),
});

export const Register = () => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formDataValidation) });

  const handleSelect = (type: 'up' | 'down') => {
    setTransactionType(type);
  };

  const handleRegister = (formData: FormData) => {
    if (!transactionType) return Alert.alert('Selecione um tipo de transação');

    if (category.key === 'category')
      return Alert.alert('Selecione uma categoria');

    const data = {
      name: formData.name,
      amount: formData.amount,
      transactionType,
      category: category.key,
    };

    console.log(data);
  };

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
                isActive={transactionType === 'up'}
                onPress={() => handleSelect('up')}
                title="Entrada"
                type="up"
              />
              <TransactionTypeButton
                isActive={transactionType === 'down'}
                onPress={() => handleSelect('down')}
                title="Saída"
                type="down"
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
