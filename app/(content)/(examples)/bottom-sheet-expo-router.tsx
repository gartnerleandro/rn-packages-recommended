import { Image, StyleSheet, Text, View } from "react-native";

export default function BottomSheetExpoRouter() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/modal-background.jpg')} style={styles.image} />
        <View style={styles.content}>
            <Text style={styles.title}>En este ejemplo puedes ver un modal en funcionamiento</Text>
            <Text>Este modal inferior es de tamaño dinámico, puedes deslizarlo hacia abajo para cerrar el modal, aunque también puedes cerrarlo tocando fuera del modal.</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
        width: "100%",
        height: 287,
        objectFit: "contain",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      },
      content: {
        flex: 1,
        padding: 16
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16
      },
  });