import { StyleSheet, Text, View, ImageBackground, ScrollView} from 'react-native';
import React from 'react';

export default function Comojugar({ navigation }) {
  return (
    <>
    <ImageBackground source={require('../assets/fondo.gif')} style={styles.bg}>
      
        <View style={styles.caja}> 
          <View style={styles.jugar}>
                <ScrollView>
                    <Text style={styles.text}>1- El Chinchón es un juego de cartas que se juega con un mazo de 48 cartas españolas (incluyendo los 8 y 9) donde el objetivo es formar combinaciones de cartas.{'\n'}
                    {'\n'}2- Cada jugador recibe 7 cartas, excepto el que inicia, que recibe 8 y debe descartarse de una carta.{'\n'}{'\n'}3- La mano puede finalizar cuando un jugador logra formar dos combinación de escalera, dos combinaciones de numeral,una combinacion de escalera y de numeral, dejando una carta de valor igual o menor a 5
                    {'\n'}{'\n'}En resumen, las combinaciones son: escalera (3 cartas consecutivas del mismo palo), numeral (3 cartas del mismo número de diferentes palos) o hacer dos combinaciones(una combinaciones de escalera y una combinaciones de numeral).
                    </Text>
                </ScrollView>  
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
    marginHorizontal: 30,
    marginVertical: 100,
  },
  jugar: {
    backgroundColor: '#f7a006',
    padding: 15,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  text: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  
  
});
