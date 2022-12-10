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
import { HightLightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  ITransactionCardProps,
} from '../../components/TransactionCard';

export interface DataListProps extends ITransactionCardProps {
  id: string;
}

export const Dashboard = () => {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Estágio',
      amount: 'R$ 1.200,00',
      category: {
        name: 'Trabalho',
        icon: 'briefcase',
      },
      date: '10/12/2022',
    },
    {
      id: '2',
      type: 'negative',
      title: 'Coffee Shop',
      amount: 'R$ 450,00',
      category: {
        name: 'Alimentação',
        icon: 'coffee',
      },
      date: '24/12/2022',
    },
    {
      id: '3',
      type: 'positive',
      title: 'Semana teste de estagiário',
      amount: 'R$ 200,00',
      category: {
        name: 'Trabalho',
        icon: 'briefcase',
      },
      date: '10/12/2022',
    },
  ];

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
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
