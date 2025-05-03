import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AppLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: '#ffffff' },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="library/[id]" />
        </Stack>
        
        <Toast position="bottom" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
} 