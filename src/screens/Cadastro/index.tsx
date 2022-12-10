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

export const Cadastro = () => {
  const [selectedType, setSelectedType] = useState('');

  const handleSelect = (type: 'up' | 'down') => {
    setSelectedType(type);
  };

  return (
    <Container>
      <StatusBar backgroundColor="transparent" translucent />

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
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
};
