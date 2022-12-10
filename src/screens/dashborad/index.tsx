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
} from './styles';

import { StatusBar, Text } from 'react-native';
import { HightLightCard } from '../../components/highlightCard';

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
    </Container>
  );
};
