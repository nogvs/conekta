import { View, StyleSheet,Text,ScrollView, RefreshControl } from 'react-native'
import React, {useState,useCallback} from 'react'
import { useAuth } from '@clerk/clerk-expo'
import Header from '../components/Home/Header';
import SearchBar from '../components/Home/Searchbar';
import Slider from '../components/Home/Slider';
import Authoritie from '../components/Home/Authoritie';
import Colors from '../../assets/shared/Colors';
import Map from '../components/Home/Map';
import News from '../components/Home/News';
import InfoSquareCard from '../components/Home/InfoSquareCard';
import InfoCard from '../components/Home/InfoCard';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function Home() {
    const { isLoaded,signOut } = useAuth();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

  return (
    <View style={styles.container}>
      <ScrollView
        style = {styles.ScrollStyle}
        contentContainerStyle={{flex: 1}}
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
        <InfoSquareCard title={"Nível"} subtitle={"87cm"} fontAwesome updated={"Atualizado em 23/11/2023 21:00"} icon={"water"}/>
        <InfoSquareCard title={"Chuva"} subtitle={"3mm"} updated={"Atualizado em 23/11/2023 21:00"} icon={"md-rainy-sharp"}/>

        </View> 
        <View style={styles.cardContainer}>
        <InfoCard title={"Status Rio Pomba:"} subtitle={"NORMAL"} icon={"cloud-rain"}/>
        </View>
      <Slider />
      <Authoritie />
      <Map/>
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
