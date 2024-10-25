import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';

export default function Creditos({ navigation }) {
  return (
    <>
      <ImageBackground source={require('../assets/fondo3.gif')} style={styles.bg}>
        <View style={styles.caja}>
            <Text style={styles.titulo}>CREDITOS</Text>
            <View style={styles.cajaCredi}>
            <Text style={styles.creditos}>
                Esta aplicación fue desarrollada por:
            </Text>
            <Text style={styles.creditos}>
                - Lautaro Martinez -{'\n'}Desarrollador principal y diseñador de la app.
            </Text>
            <Text style={styles.creditos}>
                - Angel Cardozo -{'\n'}No importa lo que hizo.
            </Text>
            <Text style={styles.creditos}>
                ETC
            </Text>
            
            <Text style={styles.creditos}>
                Versión 1.0.0
                {'\n'}❤️
            </Text>
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
  },
  caja: {
    paddingTop: 30,
    marginHorizontal: 40,
    paddingBottom: 20, 
    borderRadius: 20, 
  },
  cajaCredi: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 40,
    borderRadius: 20, 
  },
  titulo: {
    fontSize: 60,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,  
  },
creditos: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,  
  },
  
  
});
