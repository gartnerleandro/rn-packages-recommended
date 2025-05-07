import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomBackdrop = ({ style, ...props }: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    style={style}
    pressBehavior="close"
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    />
);

export default function BottomSheetScreen() {
const bottomSheetRef = useRef<BottomSheetModal>(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        
        <View style={[styles.container, styles.buttonContainer]}>
            <Button title="Open Bottom Sheet" onPress={() => bottomSheetRef.current?.present()} />
        </View>

      
    </SafeAreaView>
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={["50%", "75%"]}
            enablePanDownToClose={true}
            enableDismissOnClose={true}
            enableHandlePanningGesture={true}
            handleStyle={styles.handle}
            backdropComponent={CustomBackdrop}
        >
          <BottomSheetView style={styles.bottomSheet}>
            <Image source={require('@/assets/images/modal-background.jpg')} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>En este ejemplo puedes ver un modal en funcionamiento</Text>
                <Text>Este modal inferior es de tamaño dinámico, puedes deslizarlo hacia abajo para cerrar el modal, aunque también puedes cerrarlo tocando fuera del modal.</Text>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center'
},
  bottomSheet: {
    flex: 1
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
  handle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 40
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
});
