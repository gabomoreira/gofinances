import React, { useState, useEffect, useCallback } from 'react';

import {
  Container,
  Header,
  Wrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  PowerIcon,
  HightLightCards,
  Transactions,
  Title,
  TransactionList,
} from './styles';

import { StatusBar, Text } from 'react-native';
import { HightLightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  ITransactionCardProps,
} from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export interface DataListProps extends ITransactionCardProps {
  id: string;
}

export const Dashboard = () => {
  const [data, setData] = useState<DataListProps[]>([]);
  const dataKey = '@gofinances:transactions';

  const loadData = async () => {
    try {
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];

      const formattedTransactions: DataListProps[] = !transactions
        ? []
        : transactions.map((item: DataListProps) => {
            const amount = Number(item.amount).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            });

            const date = Intl.DateTimeFormat('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            }).format(new Date(item.date));

            return {
              id: item.id,
              name: item.name,
              type: item.type,
              category: item.category,
              date,
              amount,
            };
          });

      setData(formattedTransactions);
      console.log(formattedTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
    // const removeAll = async () => {
    //   await AsyncStorage.removeItem(dataKey);
    // };
    // removeAll();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

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

          <LogoutButton onPress={() => {}}>
            <PowerIcon name="power" />
          </LogoutButton>
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

        {data.length === 0 ? (
          <Text>Nenhuma transação</Text> // later put in stled-compoennet
        ) : (
          <TransactionList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TransactionCard data={item} />}
          />
        )}
      </Transactions>
    </Container>
  );
};
