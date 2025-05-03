import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, StatusBar } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { Canvas, Rect, Fill, vec, Paint, LinearGradient } from '@shopify/react-native-skia';

import { LibraryCard } from '../components/ui/LibraryCard';
import { LIBRARIES } from '../constants/libraries';
import { theme } from '../themes/theme';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  
  // Animación para el header
  const headerOpacity = useSharedValue(0);
  const headerGradient = useSharedValue(0);
  
  React.useEffect(() => {
    headerOpacity.value = withTiming(1, { 
      duration: 800, 
      easing: Easing.out(Easing.quad) 
    });
    
    // Animación continua para el gradiente del fondo
    headerGradient.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 4000 }),
        withTiming(0, { duration: 4000 }),
      ),
      -1, // Infinito
      true // Reverso
    );
  }, []);
  
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
    };
  });
  
  const renderItem = ({ item, index }: { item: typeof LIBRARIES[0], index: number }) => {
    return <LibraryCard library={item} index={index} />;
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Background con Skia */}
      <Canvas style={StyleSheet.absoluteFill}>
        <Fill>
          <Paint>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(256, 256)}
              colors={['#F6F8FA', '#EAEEF2']}
              positions={[0, 1]}
            />
          </Paint>
        </Fill>
      </Canvas>
      
      {/* Header con animación */}
      <Animated.View 
        style={[
          styles.header, 
          { paddingTop: insets.top + theme.spacing.m },
          headerAnimatedStyle
        ]}
      >
        <Text style={styles.title}>Biblioteca React Native</Text>
        <Text style={styles.subtitle}>
          Explora ejemplos de las librerías más útiles para tus proyectos
        </Text>
      </Animated.View>
      
      {/* Lista de librerías */}
      <FlashList
        data={LIBRARIES}
        renderItem={renderItem}
        estimatedItemSize={150}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + theme.spacing.xl }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.l,
    paddingBottom: theme.spacing.l,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginBottom: theme.spacing.s,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  list: {
    paddingTop: theme.spacing.s,
  },
}); 