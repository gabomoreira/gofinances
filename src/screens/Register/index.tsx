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

export const Register = () => {
  const [selectedType, setSelectedType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const handleSelect = (type: 'up' | 'down') => {
    setSelectedType(type);
  };

  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionTypes>
            <TransactionTypeButton
              isActive={selectedType === 'up'}
              onPress={() => handleSelect('up')}
              title="Entrada"
              type="up"
            />
            <TransactionTypeButton
              isActive={selectedType === 'down'}
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

        <Button title="Enviar" />
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
