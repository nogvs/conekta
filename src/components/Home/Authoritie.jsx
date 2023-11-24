import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Linking } from 'react-native'
import React, {useState, useEffect} from 'react'
import globalApi from '../../services/globalApi';

export default function Authoritie() {
  const [authoritieList, setAuthoritieList] = useState();

  const renderItem = ({ item }) => {
    const fazerLigacao = () => {
      const url = `tel:${item.attributes.Telefone}`;
  
      Linking.openURL(url)
        .then((sucesso) => {
          console.log('Discagem realizada com sucesso:', sucesso);
        })
        .catch((erro) => {
          console.error('Erro ao realizar a discagem:', erro);
        });
    };
  
    return (
      <View>
      <View style={styles.logoContainer}>
              <TouchableOpacity onPress={fazerLigacao}>
              <Image source={{uri:item.attributes.Icon.data.attributes.url}} style={styles.image} />
            </TouchableOpacity>
              </View>
              <Text style={styles.nomesAutoridades}>
                {item.attributes.Name}
                 </Text>
              </View>
    );
  };

    useEffect(() => {
      getAuthorities();
    },[])

    const getAuthorities = () => {
      globalApi.getAuthorities().then(resp => {
        setAuthoritieList(resp.data.data)
      })
    }

    if(!authoritieList){
      return null;
    }

    return (
      <View style={styles.container}>
        <View>
        <Text style={styles.title}>Discagem Rápida</Text>
        </View>
        <FlatList
          data={authoritieList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        /> 
      </View>
    )
  }
  
  const styles = StyleSheet.create({
      container:{
        marginTop: 10
      },
      logoContainer: {
        padding: 5
      },
      title: {
        fontSize: 20,
        margin:5,
        fontFamily:'Outfit-Bold'
      },
      image:{
          width: 100,
          height: 100,
          borderRadius: 10,
          margin: 2
      }, 
      nomesAutoridades: {
        textAlign: "center",
        fontSize: 15,
        fontFamily:'Outfit-SemiBold'
      }
    })
    