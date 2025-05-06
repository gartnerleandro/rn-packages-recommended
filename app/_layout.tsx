import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>  
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(content)/index" options={{ headerShown: false, headerTitle: "Examples" }} />
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
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
