// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCryptoStore } from '../../store/cryptoStore';
import { RootStackParamList } from '../../navigation/AppNavigator.types';
import CryptoCard from './components/CryptoCard/CryptoCard';
import SearchBar from './components/SearchBar/SearchBar';

export const Home: React.FC = () => {
    // Acceso al estado global del store
  const {
    cryptos,
    fetchCryptos,
    loading,
    setCryptoSelected,
  } = useCryptoStore();
  const [search, setSearch] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // Al montar la pantalla, se cargan las criptomonedas
  useEffect(() => {
    fetchCryptos();
  }, []);

  // Filtra la lista según el texto ingresado
  const filtered = cryptos.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar criptomoneda..."
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CryptoCard
            item={item}
            onPress={() => {
              // Al presionar, se selecciona la cripto y se navega al detalle
              setCryptoSelected(item);
              navigation.navigate('Detail');
            }}
          />
        )}
        // Carga más criptos al llegar al final de la lista
        onEndReached={() => {
          if (!loading) fetchCryptos();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </View>
  );
};
