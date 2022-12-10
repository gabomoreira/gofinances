import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/form/Button';
import { categories } from '../../utils/categories';
import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles';

interface ICategoryProps {
  key: string;
  name: string;
}

interface ICategorySelectProps {
  category: string;
  setCategory: (item: ICategoryProps) => void;
  closeCategorySelect: () => void;
}

export const CategorySelect = ({
  category,
  setCategory,
  closeCategorySelect,
}: ICategorySelectProps) => {
  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" />

      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category>
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" />

        {/* <Button>
          <ButtonText>Selecionar</ButtonText>
        </Button> */}
      </Footer>
    </Container>
  );
};
