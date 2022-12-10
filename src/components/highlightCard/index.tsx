import React from 'react';

import { Container, Header, Title, Icon, Footer, Amount, LastTransaction } from './styles';

export const HightLightCard = () => {
  return (
    <Container>
      <Header>
        <Title>Entradas</Title>
        <Icon name="arrow-up-circle" />
      </Header>

      <Footer>
        <Amount>R$ 77.970,00</Amount>
        <LastTransaction>Última entrada dia 13 de abril</LastTransaction>
      </Footer>
    </Container>
  );
};
