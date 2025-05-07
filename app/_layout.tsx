import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>  
      <ThemeProvider value={DefaultTheme}>
        <StatusBar barStyle="dark-content" />
        <Stack>
          <Stack.Screen
            name="(content)/index"
            options={{
              headerShown: false, headerTitle: "Examples" }} />
          <Stack.Screen name="(content)/(examples)/bottom-sheet" options={{ headerTitle: "Bottom Sheet"}} />
          <Stack.Screen
            name="(content)/(examples)/bottom-sheet-expo-router"
            options={{
              headerTitle: "Bottom Sheet Expo Router",
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
          <Stack.Screen name="(content)/(examples)/lottie-react-native" options={{ headerTitle: "Lottie React Native"}} />
          <Stack.Screen name="(content)/(examples)/toast-message" options={{ headerTitle: "Toast Message"}} />
          <Stack.Screen name="(content)/(examples)/react-native-highlighter" options={{ headerTitle: "React Native Highlighter"}} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <Toast position="bottom" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
