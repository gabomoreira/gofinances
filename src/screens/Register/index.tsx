import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

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
import { Modal } from 'react-native';
import { CategorySelect } from '../CategorySelect';
import { InputHookForm } from '../../components/form/InputHookForm';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  amount: string;
}

export const Register = () => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const { control, handleSubmit } = useForm();

  const handleSelect = (type: 'up' | 'down') => {
    setTransactionType(type);
  };

  const handleRegister = (formData: FormData) => {
    const data = {
      name: formData.name,
      amount: formData.amount,
      transactionType,
      category: category.key,
    };

    console.log(data);
  };

  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputHookForm control={control} name="name" placeholder="Nome" />
          <InputHookForm control={control} name="amount" placeholder="Preço" />

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
  );
};
