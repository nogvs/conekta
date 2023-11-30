import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity } from 'react-native'
import React, { useState,useEffect }from 'react'
import Colors from '../../../assets/shared/Colors'
import axios from '../../services/axios';
import { useNavigation } from '@react-navigation/native';

export function Blog() {

  const navigation = useNavigation();
  const [newsList, setNewsList] = useState();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('New', {
      Titulo: item.attributes.Titulo,
      Subtitulo: item.attributes.Subtitulo,
      Imagem: item.attributes.Imagem.data.attributes.url,
      Corpo: item.attributes.Corpo
    })}>
    <View style={{borderRadius:10, alignItems: 'center', justifyContent: 'center',  margin: 20}}>   
      <View>
        <Text style={{fontFamily: 'Outfit-Bold', fontSize: 30}}>{item.attributes.Titulo}</Text>
        <Text style={{fontFamily: 'Outfit-Regular', fontSize: 20}}>{item.attributes.Subtitulo}</Text>
      </View>
      <Image
        style={{width: '100%', height: 300, borderRadius:10, marginTop: 10}}
        source={{ uri: item.attributes.Imagem.data.attributes.url }}
      />
    </View>
    </TouchableOpacity>   
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
      <Text style={styles.title}>Notícias 📰</Text>

      <FlatList
        data={newsList.reverse()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
    marginTop: 20,
    marginLeft: 20
  },
  image: {
    flex: 0.8,
    justifyContent: 'center',
 }, 
  newsTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 25,
    margin: 20
  },
 description:{
  paddingHorizontal: 24,
  fontSize:24,
  fontFamily: 'Outfit-Regular',
  textAlign: 'center'
},
   itemContainer: {
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center'
   }
})
