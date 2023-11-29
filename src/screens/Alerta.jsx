import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity,Modal,TextInput,} from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../assets/shared/Colors'
import axios from '../services/axios';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function Alerta() {

  const {user} = useUser();
  const [alertaList, setAlertaList] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [titulo, setTitulo] = useState('');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [marcadorName, setMarcadorName] = useState();

  

  const cadastrarAlerta = async () => {
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
<View style={styles.card}>
<View style={styles.iconContainer}>
<FontAwesome5 name={"water"} size={40} color={Colors.WHITE} /> 
</View>
<View style={styles.textContainer}>
  <Text style={styles.cardTitle}>{item.attributes.Titulo}</Text>
  <Text style={styles.subtitle}>{item.attributes.Autor}</Text>
  <Text style={styles.description}>{item.attributes.Descricao}</Text>
</View>
</View>
  );

  const handleCadastro = () => {

    axios.postMarker({
      data: {
        Name: marcadorName,
        Latitude: latitude.toString(),
        Longitude: longitude.toString(),
      },
    })
    .then((response) => {
      console.log('Marcador cadastrado com sucesso:', response.data);
    })
    .catch((error) => {
      console.error('Erro ao cadastrar marcador:', error.message);
    });

    axios.postAlert({
        data: {
          Autor: user.fullName,
          Descricao: descricao,
          Titulo: titulo,
        },
      })
      .then((response) => {
        console.log('Alerta cadastrado com sucesso:', response.data);
        setModalVisible(false);
        getAlerts();
        limparCampos();
      })
      .catch((error) => {
        console.error('Erro ao cadastrar o alerta:', error.message);
      });
  };

  useEffect(() => {
    getAlerts();
  },[])

  const limparCampos = () => {
    setDescricao('');
    setTitulo('');
    setLatitude('');
    setLongitude('');
    setMarcadorName('');
  };

  const getAlerts = () => {
    axios.getAlerts().then(resp => {
      setAlertaList(resp.data.data)
    })
  }
  
  if(!alertaList){
    return null;
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alertas</Text> 
      <FlatList
        data={alertaList.reverse()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />  
       <TouchableOpacity onPress={cadastrarAlerta} style={{ alignItems: 'center', marginTop: 20, marginBottom: 20, marginLeft: 15, backgroundColor: Colors.DARKGREEN, width: Dimensions.get('screen').width*0.95, flexDirection: 'row', justifyContent: 'center', borderRadius: 9, height: 60 }}>
      <Text style={{marginHorizontal: 10, color: Colors.WHITE, fontFamily: 'Outfit-Bold', fontSize: 20}}>Cadastrar Alerta</Text>
    </TouchableOpacity>
         
     
    <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
        <Text style={{textAlign: 'center', fontFamily: 'Outfit-Bold', fontSize: 30}}>Cadastro de Alerta</Text> 

        <GooglePlacesAutocomplete 
              placeholder='Endereço'
              onPress={(data, details = null) => {
                setMarcadorName(data.structured_formatting.main_text)
                setLatitude(details.geometry.location.lat)
                setLongitude(details.geometry.location.lng)
              }}
              query={{
                key:'AIzaSyAtUe9vcG79SmwAR17W9WZsKSqs1b9TdRw',
                language: 'pt-br'
              }}
              enablePoweredByContainer={false}
              fetchDetails={true} 
              styles={{
                  container: {
                    flex: 0.9,
                  },
                  textInputContainer: {
                    flexDirection: 'row',
                  },
                  textInput: {
                    backgroundColor: '#FFFFFF',
                    height: 70,
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                    fontSize: 20,
    borderWidth: 1,
    borderColor: Colors.LIGHTGREY,
    margin: 20
                  },
              }}   
        /> 
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
          {/* <FontAwesome  name={"warning"} size={100} color={Colors.DARKGREEN} /> */}
            
            <TextInput
             style={styles.input}
              placeholder="Título"
              value={titulo}
              type="text"
              required
              onChangeText={(text) => setTitulo(text)}
            />
            
            <TextInput
             style={styles.input}
              placeholder="Descrição"
              value={descricao}
              type="text"
              multiline={true}
              numberOfLines={4}
              required
              onChangeText={(text) => setDescricao(text)}
            />  
            <TouchableOpacity style={styles.botao} onPress={handleCadastro} >
                <Text style={styles.botaoText}>Registrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    margin: 15
  },
  card: {
    flexDirection: 'row',
    border: 1,
    borderRadius: 8,
    overflow: 'hidden',
    width: Dimensions.get('screen').width*0.95,
    height: 110,
    margin: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHTGREY,
  },
  iconContainer: {
    backgroundColor: Colors.DARKGREEN,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    padding: 16,
    flex: 1
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Outfit-SemiBold',
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
  },
  modal: {
    flex: 1, 
    margin: 20,
    justifyContent: 'center',
  }, 
  botao: {
    padding: 20,
    backgroundColor: Colors.DARKGREEN,
    height: 70,
    borderRadius: 9,    
    width: Dimensions.get('screen').width*0.85,
    marginTop: 20, 
    alignItems: "center"
  },   
  botaoText: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
  },
  input: {
    fontSize: 20, 
    fontFamily: 'Outfit-Regular', 
    marginBottom: 20, 
    marginTop: 20, 
  borderWidth: 1, 
  padding: 20,
  borderColor: Colors.LIGHTGREY,
  width: Dimensions.get('screen').width*0.85,
}
})
