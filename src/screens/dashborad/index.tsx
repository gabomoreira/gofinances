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
  lastTransaction: string;
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

  const getLastTransactionDate = (
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) => {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction: DataListProps) => transaction.type === type)
          .map((transaction: DataListProps) =>
            new Date(transaction.date).getTime()
          )
      )
    );

    if (isNaN(lastTransaction.getDate())) return `não definida`;

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      'pt-BR',
      {
        month: 'long',
      }
    )}`;
  };

  const loadData = async () => {
    setIsLoading(true);

    try {
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];

      let entriesTotal = 0;
      let expensiveTotal = 0;

      const formattedTransactions: DataListProps[] = transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((item: DataListProps) => {
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
        });

      const totalEntriesAndExpensives = entriesTotal - expensiveTotal;

      setTransactions(formattedTransactions);

      const lastTransactionEntries = getLastTransactionDate(
        transactions,
        'positive'
      );
      const lastTransactionExpensives = getLastTransactionDate(
        transactions,
        'negative'
      );
      const totalInterval = `01 a ${lastTransactionExpensives}`;

      setHighlightData({
        entries: {
          amount: entriesTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          lastTransaction: `Última entrada ${lastTransactionEntries}`,
        },
        expensive: {
          amount: expensiveTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          lastTransaction: `Última saída ${lastTransactionExpensives}`,
        },
        total: {
          amount: totalEntriesAndExpensives.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          lastTransaction: totalInterval,
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
              lastTransaction={highlightData?.entries.lastTransaction}
            />
            <HightLightCard
              type="down"
              title="Saídas"
              amount={highlightData?.expensive.amount}
              lastTransaction={highlightData?.expensive.lastTransaction}
            />
            <HightLightCard
              type="total"
              title="Total"
              amount={highlightData?.total.amount}
              lastTransaction={highlightData?.total.lastTransaction}
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
