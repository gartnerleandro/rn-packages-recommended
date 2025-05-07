import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function ToastMessage() {
    const handleShowToast = ({ type, text, position }: { type: "success" | "error" | "info" | "warning", text: string, position: "top" | "bottom" }) => {
        Toast.show({
            text1: text,
            type: type,
            position,
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{`Para que este componente funcione asegúrate de agregar el componente <Toast /> en el archivo "_layout.tsx"`}</Text>
            <TouchableOpacity
                onPress={() => handleShowToast({ type: "success", text: "Hello", position: "top" })}
                style={[styles.button, styles.successButton]}
            >
                <Text style={styles.buttonText}>Show Success Toast</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleShowToast({ type: "error", text: "Error", position: "bottom" })}
                style={[styles.button, styles.errorButton]}
            >
                <Text style={styles.buttonText}>Show Error Toast</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleShowToast({ type: "info", text: "Info", position: "top" })}
                style={[styles.button, styles.infoButton]}
            >
                <Text style={styles.buttonText}>Show Info Toast</Text>
            </TouchableOpacity>    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: 100,
        alignItems: "center",
        gap: 10,
    },
    text: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        width: "50%",
    },
    successButton: {
        backgroundColor: "#1cd641",
    },
    errorButton: {
        backgroundColor: "#C70039",
    },
    infoButton: {
        backgroundColor: "#27bae5",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    }
});