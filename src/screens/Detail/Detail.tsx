// src/screens/DetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCryptoStore } from '../../store/cryptoStore';

export const DetailScreen: React.FC = () => {
  const { cryptoSelected } = useCryptoStore();

  if (!cryptoSelected) {
    return <Text>No hay criptomoneda seleccionada.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cryptoSelected.name} ({cryptoSelected.symbol})</Text>
      <Text style={styles.text}>💲 USD: ${cryptoSelected.price_usd}</Text>
      <Text style={styles.text}>ID: {cryptoSelected.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  text: { fontSize: 16, marginTop: 10 },
});
