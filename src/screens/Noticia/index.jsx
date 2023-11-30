import { Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Colors from '../../../assets/shared/Colors';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export function Noticia() {
  const param = useRoute().params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{param.Titulo}</Text>
      <Text style={styles.subtitle}>{param.Subtitulo}</Text>
      <Image
        style={{ width: '100', height: 300, borderRadius: 10, marginHorizontal: 20 }}
        source={{ uri: param.Imagem }}
      />
      <Text style={styles.description}>{param.Corpo}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
    marginTop: 20,
    marginLeft: 20,
  },
  subtitle: {
    fontFamily: 'Outfit-Regular',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  image: {
    flex: 0.8,
    justifyContent: 'center',
    margin: 10,
  },
  newsTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 25,
    margin: 20,
  },
  description: {
    paddingHorizontal: 24,
    fontSize: 20,
    fontFamily: 'Outfit-Regular',
    textAlign: 'left',
    marginVertical: 20,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
