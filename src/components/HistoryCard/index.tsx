import React from 'react';
import { Container, Title, Amount } from './styles';

interface IHistoryCardProps {
  title: string;
  amount: string;
  color: string;
}

export const HistoryCard = ({ title, amount, color }: IHistoryCardProps) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};
