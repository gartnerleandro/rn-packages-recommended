import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LottieReactNative() {
    const animationRef = useRef<LottieView>(null);

    const handlePlay = () => {
        animationRef.current?.play();
    }

    const handlePause = () => {
        animationRef.current?.pause();
    }


  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} bounces={false}>
        <Text style={styles.title}>Lottie en bucle</Text>
        <LottieView
        source={require("@/assets/lotties/lottie-1.json")}
        style={{width: 100, height: 300}}
        autoPlay
        loop
        />
        <Text style={styles.title}>Lottie con controles</Text>
        <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={handlePlay}>
                <MaterialIcons name="play-arrow" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={handlePause}>
                <MaterialIcons name="pause" size={24} color="white" />
            </TouchableOpacity>
        </View>
        <LottieView
            ref={animationRef}
            source={require("@/assets/lotties/lottie-2.json")}
            style={{width: 100, height: 300}}
        />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    controls: {
        flexDirection: "row",
        margin: 10,
        gap: 10,
    },
    controlButton: {
        backgroundColor: "#000",
        padding: 10,
        borderRadius: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    }
})