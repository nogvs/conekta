import { View, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import Colors from '../../../assets/shared/Colors';

export function Searchbar({ setSearchText }) {
  const [searchInput, setSearchInput] = useState();
  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <Feather name="search" size={15} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Buscar"
          onChangeText={(value) => setSearchInput(value)}
          onSubmitEditing={() => setSearchText(searchInput)}
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  searchbar: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    borderWidth: 0.7,
    borderColor: Colors.LIGHTGREY,
    padding: 8,
    borderRadius: 8,
  },
  input: {
    width: '100%',
  },
});
