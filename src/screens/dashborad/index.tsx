import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components';

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
  LoadContainer,
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

interface HightlightProps {
  amount: string;
}

interface HighlightData {
  entries: HightlightProps;
  expensive: HightlightProps;
  total: HightlightProps;
}

export const Dashboard = () => {
  const dataKey = '@gofinances:transactions';
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  const theme = useTheme();

  const loadData = async () => {
    setIsLoading(true);

    try {
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];

      let entriesTotal = 0;
      let expensiveTotal = 0;
      let lastEntries = null;

      const formattedTransactions: DataListProps[] = transactions.map(
        (item: DataListProps) => {
          if (item.type === 'positive') {
            entriesTotal += Number(item.amount);
          } else {
            expensiveTotal += Number(item.amount);
          }

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
        }
      );

      const totalEntriesAndExpensives = entriesTotal - expensiveTotal;

      setTransactions(formattedTransactions);
      setHighlightData({
        entries: {
          amount: entriesTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        },
        expensive: {
          amount: expensiveTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        },
        total: {
          amount: totalEntriesAndExpensives.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        },
      });

      setIsLoading(false);
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

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
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
              amount={highlightData?.entries.amount}
              lastTransaction="Última entrada no dia 10 de novembro"
            />
            <HightLightCard
              type="down"
              title="S"
              amount={highlightData?.expensive.amount}
              lastTransaction="Última entrada no dia 10 de novembro"
            />
            <HightLightCard
              type="total"
              title="Entradas"
              amount={highlightData?.total.amount}
              lastTransaction="Última entrada no dia 10 de novembro"
            />
          </HightLightCards>

          <Transactions>
            <Title>Transações</Title>

            {transactions.length === 0 ? (
              <Text>Nenhuma transação</Text> // later put in stled-compoennet
            ) : (
              <TransactionList
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />}
              />
            )}
          </Transactions>
        </>
      )}
    </Container>
  );
};
