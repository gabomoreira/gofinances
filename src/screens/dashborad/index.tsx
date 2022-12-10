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
        <HightLightCard />
        <HightLightCard />
        <HightLightCard />
      </HightLightCards>
    </Container>
  );
};
