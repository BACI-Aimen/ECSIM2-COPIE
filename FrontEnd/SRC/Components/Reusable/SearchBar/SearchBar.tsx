import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import styles from './SearchBar.styles';

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (text: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Rechercher un mur', onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (text: string) => {
    setSearchText(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={searchText}
        onChangeText={handleChange}
      />
    </View>
  );
};

export default SearchBar;
