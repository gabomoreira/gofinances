import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Icon, Title } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  type: 'positive' | 'negative';
  isActive: boolean;
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

export const TransactionTypeButton = ({
  title,
  type,
  isActive,
  ...rest
}: Props) => {
  return (
    <Container type={type} isActive={isActive} {...rest}>
      <Icon type={type} name={type === 'positive' ? icons.up : icons.down} />
      <Title>{title}</Title>
    </Container>
  );
};
