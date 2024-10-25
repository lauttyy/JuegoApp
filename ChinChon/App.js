import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './ChinchonApi/vistas/Home';
import Creditos from './ChinchonApi/vistas/creditos'
import victoria from './ChinchonApi/vistas/victoria'
import Opcion from './ChinchonApi/componentes/Opcion';
import Cuenta from './ChinchonApi/componentes/Cuenta';
import Graficos from './ChinchonApi/componentes/Graficos';
import Niveles from './ChinchonApi/componentes/Niveles';
import cmojugar from './ChinchonApi/componentes/cmojugar';
import jugar from './ChinchonApi/componentes/jugar';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Home1Stack = createNativeStackNavigator();
const Opcion1Stack = createNativeStackNavigator();
const Creditos1Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Tab.Navigator  screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home-outline';
            } 
            else if (route.name === 'Opcion') {
              iconName = 'settings-outline';
            }
              else if (route.name === 'Creditos') {
              iconName = 'people-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            paddingTop: 10,
            
          },
          tabBarBackground: () => (
            <ImageBackground
              source={require('./ChinchonApi/assets/fondo2.gif')} style={styles.bg}
            />
          ),
        })}>
        <Tab.Screen name="Home" options={{headerShown: false, unmountOnBlur: true}} >
          {() => (
            <Home1Stack.Navigator>
              <Home1Stack.Screen name="Home1" component={Home} options={{headerShown: false}} />
              <Stack.Screen name ="jugar" component={jugar} options={{ headerShown: false}}/>
              <Stack.Screen name ="cmojugar" component={cmojugar} options={{ headerShown: false}}/>
              <Stack.Screen name ="victoria" component={victoria} options={{ headerShown: false}}/>
            </Home1Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="Opcion" options={{headerShown: false, unmountOnBlur: true}} >
          {() => (
            <Opcion1Stack.Navigator>
              <Opcion1Stack.Screen name="Opcion1" component={Opcion} options={{headerShown: false}} />
              <Stack.Screen name ="Cuenta" component={Cuenta} options={{headerShown: false}}/>
              <Stack.Screen name ="Graficos" component={Graficos} options={{headerShown: false}}/>
              <Stack.Screen name ="Niveles" component={Niveles} options={{headerShown: false}}/>
            </Opcion1Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="Creditos" options={{headerShown: false}}>
          {() => (
            <Creditos1Stack.Navigator>
              <Creditos1Stack.Screen name="Creditos1" component={Creditos} options={{headerShown: false}}/>
            </Creditos1Stack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
    <StatusBar style="auto" /> 
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'black',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
