import { Text, TouchableOpacity, StyleSheet } from "react-native"

export default function Btn({ presionado, texto = "Home" }) {
    return (
        <>
            <TouchableOpacity onPress={presionado} style={styles.boton}>
                <Text>
                    <Text style={styles.texto}>{texto}</Text>
                </Text>
            </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    boton: {
        backgroundColor: '#f7a006',
        alignItems: 'center',
        marginHorizontal: 40,
        paddingVertical: 20,
        color: 'white',
        marginVertical: 40,
        borderRadius: 10,
        borderWidth: 0.3,
    },
    texto: {
        fontSize: 30,
    },
}
)