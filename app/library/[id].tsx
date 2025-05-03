import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HeaderBar } from '../../components/ui/HeaderBar';
import { LIBRARIES } from '../../constants/libraries';
import { theme } from '../../themes/theme';

// Importamos los ejemplos de cada librería
import LottieExample from '../examples/LottieExample';
import ToastExample from '../examples/ToastExample';
import CalendarExample from '../examples/CalendarExample';
import ModalExample from '../examples/ModalExample';
import FlashListExample from '../examples/FlashListExample';
import VictoryExample from '../examples/VictoryExample';
//import ContentLoaderExample from '../examples/ContentLoaderExample';
import GradientExample from '../examples/GradientExample';
import PurchasesExample from '../examples/PurchasesExample';
import HighlighterExample from '../examples/HighlighterExample';

// Mapa de componentes de ejemplo por ID
const EXAMPLES_MAP: Record<string, React.ComponentType> = {
  'lottie': LottieExample,
  'toast': ToastExample,
  'calendar': CalendarExample,
  'modal': ModalExample,
  'flashlist': FlashListExample, 
  'victory': VictoryExample,
  //'contentloader': ContentLoaderExample,
  'gradient': GradientExample,
  'purchases': PurchasesExample,
  'highlighter': HighlighterExample,
};

export default function LibraryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  
  // Encontrar la librería por ID
  const library = LIBRARIES.find(lib => lib.id === id);
  
  // Obtener el componente de ejemplo correspondiente
  const ExampleComponent = id ? EXAMPLES_MAP[id] : null;
  
  if (!library || !ExampleComponent) {
    return (
      <View style={styles.container}>
        <HeaderBar title="Ejemplo no encontrado" />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <HeaderBar 
        title={library.name}
        backgroundColor={library.color} 
        textColor="white"
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + theme.spacing.xl }
        ]}
      >
        <ExampleComponent />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.m,
  },
}); 