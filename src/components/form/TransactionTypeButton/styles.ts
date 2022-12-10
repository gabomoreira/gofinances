import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface IType {
  type: 'up' | 'down';
}

interface IContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<IContainerProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  padding: 16px;

  border: ${({ isActive }) => (isActive ? 0 : '1.5px')} solid
    ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  background-color: ${({ theme, isActive, type }) =>
    isActive && type === 'up'
      ? theme.colors.success_light
      : isActive && type === 'down'
      ? theme.colors.attention_light
      : theme.colors.background};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const Icon = styled(Feather)<IType>`
  font-size: ${RFValue(24)}px;
  margin-right: 20px;

  color: ${({ type, theme }) =>
    type === 'up' ? theme.colors.success : theme.colors.attention};
`;
