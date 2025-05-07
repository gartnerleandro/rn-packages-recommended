import { Image, StyleSheet, Text, View } from "react-native";

export default function BottomSheetExpoRouter() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/modal-background.jpg')} style={styles.image} />
        <View style={styles.content}>
            <Text style={styles.title}>En este ejemplo puedes ver un modal en funcionamiento</Text>
            <Text>Este modal inferior es de tamaño dinámico, puedes deslizarlo hacia abajo para cerrar el modal, aunque también puedes cerrarlo tocando fuera del modal.</Text>
            <Text>
              {`Para que este modal funcione asegúrate de configurar correctamente el componente <Stack> en el archivo "_layout.tsx" con las siguientes opciones:`}
            </Text>
            <Text>
              {`
                <Stack.Screen
                  name="RUTA_DE_LA_PAGINA"
                  options={{
                    headerTitle: "TITULO_DE_LA_PAGINA",
                    presentation: "formSheet",
                    sheetGrabberVisible: true,
                    sheetInitialDetentIndex: 0,
                    sheetAllowedDetents: [
                      0.25,
                      0.75,
                      1,
                    ],
                    headerShown: false,
                  }}
                />
              `}
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF",
      justifyContent: "center",
      alignItems: "center",
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    image: {
        width: "100%",
        height: 287,
        objectFit: "contain"
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