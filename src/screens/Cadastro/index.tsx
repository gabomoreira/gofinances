import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { Input } from '../../components/form/Input';
import { Container, Header, Title, Form, Fields } from './styles';
import { Button } from '../../components/form/Button';

export const Cadastro = () => {
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
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
};
