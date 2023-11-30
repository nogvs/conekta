import { View, Dimensions, StyleSheet, FlatList, Image } from 'react-native';
import React from 'react';

export function Slider({ sliderList }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image source={{ uri: item.attributes.Image.data.attributes.url }} style={styles.image} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  image: {
    width: Dimensions.get('screen').width * 0.9,
    height: 100,
    borderRadius: 10,
    margin: 2,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
  },
});
