import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashborad';
import { Register } from '../screens/Register';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Transações" component={Dashboard} />
      <Screen name="Cadastrar" component={Register} />
    </Navigator>
  );
};
