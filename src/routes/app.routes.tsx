import React from 'react';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashborad';
import { Register } from '../screens/Register';
import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: theme.colors.secondary_light,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 88,
        },
      }}
    >
      <Screen
        name="Transações"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Resumo"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="bar-chart" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
