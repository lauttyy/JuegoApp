import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import Btn from '../botones/boton';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Opcion({ navigation }) {
 
  return (
    
    <ImageBackground source={require('../assets/fondoOp.jpg')} style={styles.bg}>
      <View style={styles.caja}>
        <Text style={styles.titulo}>OPCIONES</Text>
        
        <View style={styles.btnContainer}>
          <Btn texto="CUENTA" presionado={() => navigation.navigate("Cuenta")} />
          <Btn texto="GRAFICOS" presionado={() => navigation.navigate("Graficos")} />
          <Btn texto="NIVELES" presionado={() => navigation.navigate("Niveles")} />
            
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  bg: {
    height: '100%',
    justifyContent: 'center',
  },
  caja: {
    paddingTop: 30,
    marginHorizontal: 40,
    paddingBottom: 20, 
  },
  titulo: {
    fontSize: 60,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,  
  },
  btnContainer: {
    marginTop: 15, 
  },
});
