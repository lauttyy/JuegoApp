import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import Btn from '../botones/Btn';

// https://reactnavigation.org/docs/tab-based-navigation

export default function Home({ navigation }) {
  return (
    <>
      <ImageBackground source={require('../assets/fondo.gif')} style={styles.bg}>
        <View style={styles.caja}>
          <Text style={styles.titulo}>CHIN-CHON CLASSIC</Text>
          <View style={styles.btnContainer}>
            <Btn texto="JUGAR" presionado={() => navigation.navigate("jugar")} />
            <Btn texto="Opciones" presionado={() => navigation.navigate("Opcion")} />
            <Btn texto="¿Como Jugar?" presionado={() => navigation.navigate("cmojugar")} />
          </View>
        </View>
        
      </ImageBackground>
    </>
    
  );
}
const styles = StyleSheet.create({
  bg: {
    height: '100%',
    justifyContent: 'center',
    margin: 0,
  },
  caja: {
    paddingTop: 30,
    marginHorizontal: 40,
    paddingBottom: 20, 
    borderRadius: 20, 
  },
  titulo: {
    fontSize: 55,
    color: 'white',
    textAlign: 'center', 
  },
  btnContainer: { 
    marginTop: 0, 
  },
  footer:{
    margin: 0,
    height: 90,
    backgroundColor: 'black',
  }
});
