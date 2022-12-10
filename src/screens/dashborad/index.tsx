import React from 'react';

import {
  Container,
  Header,
  Wrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  PowerIcon,
  HightLightCards,
  Transactions,
  Title,
  TransactionList,
} from './styles';

import { StatusBar } from 'react-native';
import { HightLightCard } from '../../components/highlightCard';
import { TransactionCard } from '../../components/transactionCard';

const cards = [
  {
    title: 'Estágio',
    amount: 'R$ 1.200,00',
    category: {
      name: 'Vendas',
      icon: 'dollar-sign',
    },
    date: '10/12/2022',
  },
  {
    title: 'Desenvolvimento de Site',
    amount: 'R$ 7.200,00',
    category: {
      name: 'Vendas',
      icon: 'dollar-sign',
    },
    date: '20/03/2023',
  },
  {
    title: 'Desenvolvimento de Site',
    amount: 'R$ 7.200,00',
    category: {
      name: 'Vendas',
      icon: 'dollar-sign',
    },
    date: '20/03/2023',
  },
  {
    title: 'Desenvolvimento de Site',
    amount: 'R$ 7.200,00',
    category: {
      name: 'Vendas',
      icon: 'dollar-sign',
    },
    date: '20/03/2023',
  },
];

export const Dashboard = () => {
  return (
    <Container>
      <StatusBar backgroundColor="transparent" translucent />

      <Header>
        <Wrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/gabomoreira.png' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Gabriel</UserName>
            </User>
          </UserInfo>
          <PowerIcon name="power" />
        </Wrapper>
      </Header>

      <HightLightCards>
        <HightLightCard
          type="up"
          title="Entradas"
          amount="R$ 77.797,00"
          lastTransaction="Última entrada no dia 10 de novembro"
        />
        <HightLightCard
          type="down"
          title="Entradas"
          amount="R$ 77.797,00"
          lastTransaction="Última entrada no dia 10 de novembro"
        />
        <HightLightCard
          type="total"
          title="Entradas"
          amount="R$ 77.797,00"
          lastTransaction="Última entrada no dia 10 de novembro"
        />
      </HightLightCards>

      <Transactions>
        <Title>Transações</Title>

        <TransactionList
          data={cards}
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </Transactions>
    </Container>
  );
};
