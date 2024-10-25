import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Alert, Image, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Función para crear el mazo de cartas
const createDeck = () => {
    const suits = ['Copas', 'Bastos', 'Espadas', 'Oros'];
    const deck = [];

    // Agregar cartas del 1 al 7
    for (let value = 1; value <= 7; value++) {
        suits.forEach(suit => deck.push({ value, suit }));
    }
    // Agregar 8 y 9
    for (let value = 8; value <= 9; value++) {
        suits.forEach(suit => deck.push({ value, suit }));
    }
    // Agregar cartas del 10 al 12
    for (let value = 10; value <= 12; value++) {
        suits.forEach(suit => deck.push({ value, suit }));
    }
    
    return deck;
};

const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};


const cardImages = {
    1: { Copas: require('../assets/Cartas/card_copa_1.png'), Bastos: require('../assets/Cartas/card_basto_1.png'), Espadas: require('../assets/Cartas/card_espada_1.png'), Oros: require('../assets/Cartas/card_oro_1.png') },
    2: { Copas: require('../assets/Cartas/card_copa_2.png'), Bastos: require('../assets/Cartas/card_basto_2.png'), Espadas: require('../assets/Cartas/card_espada_2.png'), Oros: require('../assets/Cartas/card_oro_2.png') },
    3: { Copas: require('../assets/Cartas/card_copa_3.png'), Bastos: require('../assets/Cartas/card_basto_3.png'), Espadas: require('../assets/Cartas/card_espada_3.png'), Oros: require('../assets/Cartas/card_oro_3.png') },
    4: { Copas: require('../assets/Cartas/card_copa_4.png'), Bastos: require('../assets/Cartas/card_basto_4.png'), Espadas: require('../assets/Cartas/card_espada_4.png'), Oros: require('../assets/Cartas/card_oro_4.png') },
    5: { Copas: require('../assets/Cartas/card_copa_5.png'), Bastos: require('../assets/Cartas/card_basto_5.png'), Espadas: require('../assets/Cartas/card_espada_5.png'), Oros: require('../assets/Cartas/card_oro_5.png') },
    6: { Copas: require('../assets/Cartas/card_copa_6.png'), Bastos: require('../assets/Cartas/card_basto_6.png'), Espadas: require('../assets/Cartas/card_espada_6.png'), Oros: require('../assets/Cartas/card_oro_6.png') },
    7: { Copas: require('../assets/Cartas/card_copa_7.png'), Bastos: require('../assets/Cartas/card_basto_7.png'), Espadas: require('../assets/Cartas/card_espada_7.png'), Oros: require('../assets/Cartas/card_oro_7.png') },
    8: { Copas: require('../assets/Cartas/card_copa_8.png'), Bastos: require('../assets/Cartas/card_basto_8.png'), Espadas: require('../assets/Cartas/card_espada_8.png'), Oros: require('../assets/Cartas/card_oro_8.png') },
    9: { Copas: require('../assets/Cartas/card_copa_9.png'), Bastos: require('../assets/Cartas/card_basto_9.png'), Espadas: require('../assets/Cartas/card_espada_9.png'), Oros: require('../assets/Cartas/card_oro_9.png') },
    10: { Copas: require('../assets/Cartas/card_copa_10.png'), Bastos: require('../assets/Cartas/card_basto_10.png'), Espadas: require('../assets/Cartas/card_espada_10.png'), Oros: require('../assets/Cartas/card_oro_10.png') },
    11: { Copas: require('../assets/Cartas/card_copa_11.png'), Bastos: require('../assets/Cartas/card_basto_11.png'), Espadas: require('../assets/Cartas/card_espada_11.png'), Oros: require('../assets/Cartas/card_oro_11.png') },
    12: { Copas: require('../assets/Cartas/card_copa_12.png'), Bastos: require('../assets/Cartas/card_basto_12.png'), Espadas: require('../assets/Cartas/card_espada_12.png'), Oros: require('../assets/Cartas/card_oro_12.png') },
};

const Card = ({ card, onDiscard }) => {
    return (
        <Pressable style={styles.cardContainer} onPress={() => onDiscard(card)}>
            <Image source={cardImages[card.value][card.suit]} style={styles.cardImage} />
        </Pressable>
    );
};
const DeckCard = ({ onDraw }) => {
    return (
        <Pressable style={styles.deckCard} onPress={onDraw}>
            <Image source={require('../assets/Cartas/mazo2.png')} style={styles.cardImage1} />
        </Pressable>
    );
};

// Componente principal del juego
const Jugar = () => {
    const [gameOver, setGameOver] = useState(false);
    const navigation = useNavigation();
    const [deck, setDeck] = useState(shuffleDeck(createDeck())); // Barajar el mazo
    const [players, setPlayers] = useState([
        { name: 'Jugador', hand: [], points: 0 },
        { name: 'Bot Bobby', hand: [], points: 0 }
    ]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // Para turnos
    const [discardPile, setDiscardPile] = useState([]); // Pila de descartes
    const [waitingForDiscard, setWaitingForDiscard] = useState(false); // Control de espera para descarte
    const [cardsDealt, setCardsDealt] = useState(false); // Estado para controlar si se repartieron las cartas
    const resetDeck = () => {
            const newDeck = shuffleDeck(createDeck());
            setDeck(newDeck);
        };
    // Función para repartir las cartas
    const dealCards = () => {
        const newDeck = [...deck];
        const newPlayers = players.map((player, index) => {
            const handSize = index === 0 ? 8 : 7; // Jugador humano recibe 8, el bot 7
            const hand = newDeck.splice(0, handSize);
            return { ...player, hand };
        });
        setPlayers(newPlayers);
        setDeck(newDeck); // Actualiza el mazo
        setCardsDealt(true); // Cambia el estado a true después de repartir

        
    };

    // Función para el turno del jugador
    const playerTurn = () => {
        const currentPlayer = players[currentPlayerIndex];

        // Si el jugador tiene 8 cartas, debe descartarse
        if (currentPlayer.hand.length === 8) {
            setWaitingForDiscard(true); // Esperar el descarte
            return; // Salir de la función para evitar que el jugador tome una carta
        }
    };

    // Función para tomar una carta
    const tomarCarta = () => {
        const currentPlayer = players[currentPlayerIndex];
    
        // Verificar si el jugador ya tiene 8 cartas
        if (currentPlayer.hand.length >= 8) {
            return; // Salir de la función si tiene 8 cartas
        }
    
        // Tomar una carta del mazo
        if (deck.length > 0) {
            const drawnCard = deck.pop();
            currentPlayer.hand.push(drawnCard);
            setDeck(deck); // Actualiza el mazo
            setPlayers([...players]); // Actualiza jugadores
        }
    };

    const tomarCartaDescartada = () => {
        if (discardPile.length > 0 && players[0].hand.length < 8) {
            const cardToTake = discardPile[0]; // Tomar la última carta en la pila
            const currentPlayer = players[currentPlayerIndex];

            currentPlayer.hand.push(cardToTake); // Añadir la carta a la mano del jugador
            setDiscardPile([]); // Vaciar la pila de descartes después de tomar la carta
            setPlayers([...players]); // Actualizar jugadores

            Alert.alert("Carta Tomada", `Has tomado: ${cardToTake.value} ${cardToTake.suit}`);
        } 
        if (deck.length === 0) {
            resetDeck(); // Reinicia el mazo si está vacío
        }

    };
    const resetGame = () => {
        setDeck(shuffleDeck(createDeck())); // Barajar el mazo
        setPlayers([
            { name: 'Jugador', hand: [], points: 0 },
            { name: 'Bot Bobby', hand: [], points: 0 }
        ]);
        setCurrentPlayerIndex(0);
        setDiscardPile([]);
        setWaitingForDiscard(false);
        setCardsDealt(false);
        setGameOver(false); // Reiniciar estado del juego
    };
    const discardCard = (cardToDiscard) => {
        const currentPlayer = players[currentPlayerIndex];
    
        // Verifica que el jugador solo pueda descartar si tiene exactamente 8 cartas
        if (currentPlayer.hand.length !== 8) {
            return; // Salir de la función si no cumple la condición
        }
    
        // Verificar si la carta a descartar está en la mano del jugador
        if (currentPlayer.hand.includes(cardToDiscard)) {
            // Verificar si el jugador ha ganado
            const hasWon = verificarVictoria(currentPlayer.hand);
    
            if (hasWon) {
                if (cardToDiscard.value > 5) {
                    Alert.alert("Para ganar, descarta una carta de valor igual o menor a 5.");
                } else {
                    // Navegar a la pantalla de victoria
                    navigation.navigate('victoria');
                    resetGame();
                }
            }
    
            // Elimina la carta de la mano del jugador
            currentPlayer.hand = currentPlayer.hand.filter(card => card !== cardToDiscard);
            setDiscardPile([cardToDiscard]); // Solo agregar la carta descartada a la pila
            setPlayers([...players]); // Actualizar jugadores
    
            // Cambiar el turno al bot después de descartar
            setCurrentPlayerIndex(1);
            setWaitingForDiscard(false);
        } else {
            Alert.alert("Error", "No tienes esa carta en tu mano.");
        }
    };
    
    const botTurn = () => {
        const currentPlayer = players[1]; // El bot es el segundo jugador
        const drawnCard = deck.pop(); // El bot toma una carta del mazo
        currentPlayer.hand.push(drawnCard); // Añadir la carta al bot

        if (deck.length === 0) {
            resetDeck();
        }
        // Si el bot tiene 8 cartas, debe descartarse
        if (currentPlayer.hand.length === 8) {
            const discarded = currentPlayer.hand[Math.floor(Math.random() * currentPlayer.hand.length)];
            currentPlayer.hand = currentPlayer.hand.filter(card => card !== discarded); // Elimina la carta descartada
            setDiscardPile(prev => [discarded, ...prev]); // Añadir la carta descartada a la pila
            setPlayers([...players]);

        }

        // Cambiar turno al jugador humano
        setCurrentPlayerIndex(0);
    };

    useEffect(() => {
        if (currentPlayerIndex === 1 && !waitingForDiscard) { // Si es el turno del bot
            botTurn();
        }
    }, [currentPlayerIndex, waitingForDiscard]);
    
    const verificarVictoria = (hand) => {
        const groups = {}; // Para contar las cartas por valor
        const straights = []; // Para guardar las secuencias de escaleras
    
        // Contar las cartas por valor
        hand.forEach(card => {
            if (!groups[card.value]) {
                groups[card.value] = [];
            }
            groups[card.value].push(card);
        });
    
        // Verificar grupos de cartas iguales
        const equalGroups = Object.values(groups).filter(group => group.length >= 3);
        
        // Verificar escaleras
        const suits = ['Copas', 'Bastos', 'Espadas', 'Oros'];
        
        // Revisar para encontrar secuencias (escaleras) de 3 cartas
        for (const suit of suits) {
            const suitCards = hand.filter(card => card.suit === suit);
            suitCards.sort((a, b) => a.value - b.value);
            
            let count = 1;
            for (let i = 1; i < suitCards.length; i++) {
                if (suitCards[i].value === suitCards[i - 1].value + 1) {
                    count++;
                } else {
                    count = 1; // Reset count if not sequential
                }
                if (count >= 3) {
                    straights.push(suitCards.slice(i - 2, i + 1)); // Guardar la escalera encontrada
                }
            }

        }
        // Verificar condiciones de victoria
    const hasWon = (
        (equalGroups.length >= 2) || // Dos grupos de cartas iguales
        (equalGroups.length >= 1 && straights.length >= 1) || // Un grupo de iguales y una escalera
        (straights.length >= 2) // Dos escaleras
    );
        if (hasWon) {
            setGameOver(true); // El juego ha terminado
        }
        // Verificar condiciones de victoria
        return (
            (equalGroups.length >= 2) || // Dos grupos de cartas iguales
            (equalGroups.length >= 1 && straights.length >= 1) || // Un grupo de iguales y una escalera
            (straights.length >= 2) // Dos escaleras
        );
        
    };

    return (
        
        <ImageBackground source={require('../assets/mesa.jpg')} style={styles.container} >
            <Text style={styles.title}>Chinchón</Text>
            {!cardsDealt ? (
                <Pressable style={styles.button} onPress={dealCards}>
                    <Text style={styles.buttonText}>Repartir cartas</Text>
                </Pressable>
            ) : (
                <>
                
                    <Text style={styles.textBot}>BOT</Text>
                    <View  style={styles.bot}>
                    <Image source={require('../assets/Cartas/mazo.png')} style={styles.cardImageBot} />
                    <Image source={require('../assets/Cartas/mazo.png')} style={styles.cardImageBot} />
                    <Image source={require('../assets/Cartas/mazo.png')} style={styles.cardImageBot} />
                    <Image source={require('../assets/Cartas/mazo.png')} style={styles.cardImageBot} />
                    <Image source={require('../assets/Cartas/mazo.png')} style={styles.cardImageBot} />
                    <Image source={require('../assets/Cartas/mazo.png')} style={styles.cardImageBot} />
                    <Image source={require('../assets/Cartas/mazo.png')} style={styles.cardImageBot} />
                    <Image source={require('../assets/Cartas/mazo.png')} style={styles.cardImageBot} />
                    </View>
                    <View  style={styles.container2}>
                    <View style={styles.discardContainer}>
                    <Text style={styles.buttonText}>Pila de Descartes del Bot:</Text>
                        {discardPile.length > 0 && (
                            
                            <Pressable onPress={tomarCartaDescartada} >
                                <Image 
                                    source={cardImages[discardPile[0].value][discardPile[0].suit]} 
                                    style={styles.cardImage2} 
                                />
                            </Pressable>
                        )}
                    </View>
                    <View style={styles.actions}>
                    <Text style={styles.buttonText}>Tomar del Mazo:</Text>
                        <DeckCard onDraw={tomarCarta}/>
                    </View>
                    </View>
                    <View style={styles.handContainer}>
                    <Text style={styles.buttonText}>Tus Cartas:</Text>
                        <View style={styles.cardGrid}>
                            {players[0].hand.map((card, index) => (
                                <Card key={index} card={card} onDiscard={discardCard} onPress={playerTurn}/>
                            ))}
                        </View>
                    </View>
                    
                </>
            )}
        </ImageBackground>
      
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    container2:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    bot: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: undefined,
        flexDirection: 'row',
        marginBottom: '2%',
    },
    title: {
        marginTop: 25,
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    player: {
        margin: 10,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
    },
    actions: {
        marginTop: 20,
        marginBottom: 15,
        alignItems: 'center',
    },
    handContainer: {
        width: '100%',
        height: undefined,
        alignItems: 'center',
    },
    cardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cardContainer: {
        width: '23%',
        marginBottom: 10,
    },
    cardImage: {
        width: '90%',
        height: undefined,
        aspectRatio: 0.6,
        paddingHorizontal: 42,
    },
    cardImage1: {
        width: '45%',
        height: undefined,
        aspectRatio: 0.6,
        borderColor: 'black',
        paddingHorizontal: 60, 
    },
    cardImage2: {
        width: '18%',
        height: undefined,
        aspectRatio: 0.5,
        borderColor: 'black',
        paddingHorizontal: 39.1,
    },
    cardImageBot: {
        width: '14%',
        height: undefined,
        aspectRatio: 0.65,
        marginHorizontal: 3,
        paddingHorizontal: 10,
    },
    deckCard: {
        marginTop: 10,
    },
    discardContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    textBot: {
        color: 'white',
        fontWeight: 'bold',
    },
    
});

export default Jugar;
