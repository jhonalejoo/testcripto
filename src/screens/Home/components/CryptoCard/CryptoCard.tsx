// components/CryptoCard.tsx
import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {styles} from './CryptoCard.styles';

interface CryptoCardProps {
  item: {
    id: string;
    name: string;
    price_usd: string;
  };
  onPress: () => void;
}

const CryptoCard: React.FC<CryptoCardProps> = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>
          ${parseFloat(item.price_usd).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CryptoCard;
