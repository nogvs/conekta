import { View, StyleSheet,Text,ScrollView, RefreshControl } from 'react-native'
import React, {useState,useCallback, useEffect} from 'react'
import { useAuth } from '@clerk/clerk-expo'
import {Header} from '../../components/Header';
import {Slider} from '../../components/Slider';
import {Authoritie} from '../../components/Authoritie';
import Colors from '../../../assets/shared/Colors';
import {Map} from '../../components/Map';
import {InfoSquareCard} from '../../components/InfoSquareCard';
import {InfoCard} from '../../components/InfoCard';
import axios from '../../services/axios';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function getStatus(value) {
  switch (true) {
    case value >= 0 && value < 3:
      return 'NORMAL';
    case value >= 3 && value < 5.5:
      return 'ESTADO DE ALERTA';
    case value >= 5.5 && value < 10:
      return 'TRANSBORDO';
    default:
      return 'NORMAL';
  }
}

export function Home() {
    const { isLoaded,signOut } = useAuth();
    const [refreshing, setRefreshing] = useState(false);
    const [markerList, setMarkerList] = useState(); 
    const [infoList, setInfoList] = useState(); 
    const [sliderList, setSliderList] = useState();

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      getInfos(); 
      getSlider();
      getMarkers();
      wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    const fetchData = useCallback(() => {
      getInfos();
      getSlider();
      getMarkers();
    }, []);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        fetchData();
      }, 5000);
  
      return () => clearInterval(intervalId);
    }, [fetchData]);

    const getInfos = () => {
      axios.getInfos().then(resp => {
        setInfoList(resp.data.data)
      })
    }  

    const getSlider = () => {
      axios.getSlider().then(resp => {
        setSliderList(resp.data.data)
      })
    }

    const getMarkers = () => {
      axios.getMarkers().then(resp => {
        setMarkerList(resp.data.data)
      })
    }

    if(!infoList){
      return null;
    }

    if(!sliderList){
      return null;
    }

    if(!markerList){
      return null;
    }


    let status = getStatus(parseFloat(infoList[infoList.length - 1].attributes.Nivel));

  return (
    <View style={styles.container}>
      <ScrollView
        style = {styles.ScrollStyle}
        contentContainerStyle={{flex: 1}}
        showsVerticalScrollIndicator={false}
        refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={onRefresh} 
            />
        }>
      <Header />
      {/* Melhoria Futura, implementar busca por notícias
      
      <SearchBar setSearchText={(value) => console.log(value)}/> 
      
      */}
       <View style={styles.cardSquareContainer}>
        <InfoSquareCard title={"Nível Rio"} subtitle={infoList[infoList.length - 1].attributes.Nivel} fontAwesome updated={infoList[infoList.length - 1].attributes.AtualizadoEm} icon={"water"}/>
        <InfoSquareCard title={"Chuva Diária"} subtitle={infoList[infoList.length - 1].attributes.ChuvaDia} updated={infoList[infoList.length - 1].attributes.AtualizadoEm} icon={"md-rainy-sharp"}/>
        </View> 
        <View style={styles.cardContainer}>
        <InfoCard title={"Status Rio Pomba:"} subtitle={status} icon={"cloud-rain"}/>
        </View>
      <Slider sliderList={sliderList}/>
      <Authoritie />
      <Map markerList={markerList}/>
        {/* <Button 
            title='Sair'
            onPress={() => signOut()}
        /> */}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding: 20,
    backgroundColor: Colors.WHITE
  },
  cardSquareContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  cardContainer: {
    flexDirection: 'row',
    margin: 5,
  }
})
