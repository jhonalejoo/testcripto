// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCryptoStore } from '../../store/cryptoStore';

export const Home: React.FC = () => {
  const { cryptos, fetchCryptos, loading, setCryptoSelected } = useCryptoStore();
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchCryptos();
  }, []);

  const filtered = cryptos.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Buscar criptomoneda..."
        onChangeText={setSearch}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setCryptoSelected(item);
                navigation.navigate('Detail');
              }}
            >
              <Text>{item.name} - ${item.price_usd}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};
