// src/components/SearchBar.tsx
import React from 'react';
import {View, TextInput} from 'react-native';
import Icon from '@react-native-vector-icons/evil-icons';
import {styles} from './SearchBar.styles';
interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? 'Search...'}
        style={styles.input}
        placeholderTextColor="#888"
      />
    </View>
  );
};

export default SearchBar;
