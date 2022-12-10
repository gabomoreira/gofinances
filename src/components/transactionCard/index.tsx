import React from 'react';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  CategoryName,
  Icon,
  Date,
} from './styles';

export const TransactionCard = () => {
  return (
    <Container>
      <Title>Desenvolvimento de Site</Title>
      <Amount>R$ 1.200,00</Amount>

      <Footer>
        <Category>
          <Icon name="dollar-sign" />
          <CategoryName>Vendas</CategoryName>
        </Category>
        <Date>10/12/2022</Date>
      </Footer>
    </Container>
  );
};
