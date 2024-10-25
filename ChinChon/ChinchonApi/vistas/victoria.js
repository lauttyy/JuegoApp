import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import Btn from '../botones/boton';

export default function Victoria({ navigation }) {
  return (
    <>
      <ImageBackground source={require('../assets/fondoVD.png')} style={styles.bg}>
        
        <View style={styles.caja}>
          <View style={styles.victoria}>
            <Text style={styles.text}>VICTORIA</Text>
          </View>   
            <Btn texto="Volver a Jugar" presionado={() => navigation.navigate("jugar")}></Btn>
            <Btn texto="Voler a Inicio" presionado={() => navigation.navigate("Home")}></Btn> 
               
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    height: '100%',
    justifyContent: 'center',
  },
  caja: {
    marginHorizontal: 40,
    paddingBottom: 20, 
  },
  victoria: {
    backgroundColor: 'rgba(0, 180, 0, 0.8)',
    padding: 15,
    borderRadius: 20,
    borderColor: 'green',
    borderWidth: 1.5,
  },
  text: {
    fontSize: 70,
    color: 'white',
    textAlign: 'center',
  },
  
  
});
