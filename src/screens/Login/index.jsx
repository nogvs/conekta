import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  Animated,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Colors from '../../../assets/shared/Colors';
import { SignInWithOAuth } from '../../components/SignInWithOAuth';
import axios from '../../services/axios';
import { Paginator } from '../../components/Paginator';

export function Login() {
  const [onboardList, setOnboardList] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const onBoardRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { width }]}>
      <Image
        style={[styles.image, { width, resizeMode: 'contain' }]}
        source={{ uri: item.attributes.Imagem.data.attributes.url }}
      />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.attributes.Titulo}</Text>
        <Text style={styles.description}>{item.attributes.Descricao}</Text>
      </View>
    </View>
  );

  const viewableItemsChanges = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  useEffect(() => {
    getOnboards();
  }, []);

  const getOnboards = () => {
    axios.getOnboards().then((resp) => {
      setOnboardList(resp.data.data);
    });
  };

  if (!onboardList) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 3, alignItems: 'center' }}>
        <FlatList
          data={onboardList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          bounces={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanges}
          viewabilityConfig={viewConfig}
          ref={onBoardRef}
        />
        <Paginator data={onboardList} scrollX={scrollX} />
        <SignInWithOAuth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
  },
  image: {
    flex: 0.8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 38,
    fontFamily: 'Outfit-Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    paddingHorizontal: 24,
    fontSize: 24,
    fontFamily: 'Outfit-Regular',
    textAlign: 'center',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
