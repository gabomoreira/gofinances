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

interface Category {
  name: string;
  icon: string;
}

interface Data {
  title: string;
  amount: string;
  category: Category;
  date: string;
}

interface ITransactionCardProps {
  data: Data;
}

export const TransactionCard = ({ data }: ITransactionCardProps) => {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount>{data.amount}</Amount>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
};
