import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../assets/shared/Colors'
import { useState,useEffect } from 'react'
import axios from '../services/axios';
import { useWindowDimensions } from 'react-native';

export default function News() {

  const [newsList, setNewsList] = useState();
  const {width} = useWindowDimensions();

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, {width}]}>
      <Image
        style={[styles.image, {width, resizeMode: 'contain'}]}
        source={{ uri: item.attributes.Imagem.data.attributes.url }}
      />
      <View style={{ flex: 0.3}}>
        <Text style={styles.title}>{item.attributes.Titulo}</Text>
        <Text style={styles.description}>{item.attributes.Descricao}</Text>
      </View>
    </View>
  );

  useEffect(() => {
    getNews();
  },[])

  const getNews = () => {
    axios.getNews().then(resp => {
      setNewsList(resp.data.data)
    })
  }
  
  if(!newsList){
    return null;
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notícias</Text>

      <FlatList
        data={newsList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
      />  
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: Colors.WHITE
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
    margin: 20
  }
})
