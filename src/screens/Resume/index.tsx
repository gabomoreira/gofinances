import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { VictoryPie } from 'victory-native';

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  Month,
  SelectIcon,
} from './styles';
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

interface ITransactionProps {
  id: string;
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface ICategoryData {
  key: string;
  name: string;
  color: string;
  total: number;
  totalFormatted: string;
  percent: string;
}

export const Resume = () => {
  const [categoriesAndTotal, setCategoriesAndTotal] = useState<ICategoryData[]>(
    []
  );

  // const theme = useTheme();

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
          return acumulator + Number(expensive.amount);
        },
        0
      );

      const totalByCategory = [];

      categories.forEach((category) => {
        let categorySum = 0;

        expensives.forEach((expensive: ITransactionProps) => {
          if (expensive.category === category.key) {
            categorySum += Number(expensive.amount);
          }
        });

        if (categorySum > 0) {
          const totalFormatted = categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

          const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
            1
          )}%`;

          totalByCategory.push({
            key: category.key,
            name: category.name,
            color: category.color,
            total: categorySum,
            totalFormatted,
            percent,
          });
        }
      });

      setCategoriesAndTotal(totalByCategory);
      console.log(categoriesAndTotal);
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

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelect>
          <MonthSelectButton>
            <SelectIcon name="chevron-left" />
          </MonthSelectButton>

          <Month>Maio</Month>

          <MonthSelectButton>
            <SelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>

        <ChartContainer>
          <VictoryPie
            data={categoriesAndTotal}
            colorScale={categoriesAndTotal.map((item) => item.color)}
            style={{
              labels: {
                fontSize: RFValue(14),
                fontWeight: 'bold',
                // fill: theme.colors.shape,
              },
            }}
            // labelRadius={10}
            x="percent"
            y="total"
          />
        </ChartContainer>

        {categoriesAndTotal?.map((category) => (
          <HistoryCard
            key={category.key}
            color={category.color}
            title={category.name}
            amount={category.totalFormatted}
          />
        ))}
      </Content>
    </Container>
  );
};
