import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import { Container, Header, Title, Content } from './styles';

interface ITransactionProps {
  id: string;
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

export const Resume = () => {
  const [categoriesAndTotal, setCategoriesAndTotal] = useState([]);

  const loadData = async () => {
    try {
      const dataKey = '@gofinances:transactions';
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];

      const expensives = transactions.filter(
        (transaction: ITransactionProps) => transaction.type === 'negative'
      );

      const expensivesTotal = expensives.reduce(
        (acumulator: number, expensive: ITransactionProps) => {
          return acumulator + expensive.amount;
        },
        0
      );

      console.log(expensivesTotal);

      const totalByCategory = [];

      categories.forEach((category) => {
        let categorySum = 0;

        expensives.forEach((expensive: ITransactionProps) => {
          if (expensive.category === category.key) {
            categorySum += Number(expensive.amount);
          }
        });

        if (categorySum > 0) {
          const total = categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

          totalByCategory.push({
            id: category.key,
            name: category.name,
            total,
            color: category.color,
          });
        }
      });

      setCategoriesAndTotal(totalByCategory);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por Categoria</Title>
      </Header>

      <Content>
        {categoriesAndTotal?.map((category) => (
          <HistoryCard
            key={category.id}
            color={category.color}
            title={category.name}
            amount={category.total}
          />
        ))}
      </Content>
    </Container>
  );
};
