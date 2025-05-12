import React, { useEffect, useState } from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useCryptoStore} from '../../store/cryptoStore';
import detailsStyles from './Detail.styles';
import { CryptoService } from '../../services/CryptoService';

export const DetailScreen: React.FC = () => {
  const {cryptoSelected, setCryptoSelected} = useCryptoStore();
  const [loading, setLoading] = useState(true);

  // Cuando cambia el ID, se vuelve a pedir la información actualizada
  useEffect(() => {
    if (cryptoSelected?.id) {
      CryptoService.getCryptoById(cryptoSelected.id)
        .then(setCryptoSelected)
        .finally(() => setLoading(false));
    }
  }, [cryptoSelected?.id]);

  if (loading || !cryptoSelected) {
    return <ActivityIndicator style={{flex: 1}} />;
  }

  return (
    <View style={detailsStyles.container}>
      <View style={detailsStyles.card}>
        <Text style={detailsStyles.title}>
          {cryptoSelected.name} ({cryptoSelected.symbol})
        </Text>
        <Text style={detailsStyles.text}>💲 USD: ${parseFloat(cryptoSelected.price_usd).toFixed(2)}</Text>
        <Text style={detailsStyles.text}>📈 24h Cambio: {cryptoSelected.percent_change_24h}%</Text>
        <Text style={detailsStyles.text}>🏦 Market Cap: ${cryptoSelected.market_cap_usd}</Text>
        <Text style={detailsStyles.text}>📊 Volumen 24h: ${cryptoSelected.volume24}</Text>
        <Text style={detailsStyles.text}>🔄 Supply: {cryptoSelected.csupply}</Text>
        <Text style={detailsStyles.text}>🏅 Ranking: #{cryptoSelected.rank}</Text>
      </View>
    </View>
  );
};
