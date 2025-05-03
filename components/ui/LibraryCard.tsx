import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { Canvas, RoundedRect, Shadow, vec } from '@shopify/react-native-skia';
import { router } from 'expo-router';

import { Library } from '../../constants/libraries';
import { theme } from '../../themes/theme';

interface LibraryCardProps {
  library: Library;
  index: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function LibraryCard({ library, index }: LibraryCardProps) {
  const scale = useSharedValue(1);
  const elevation = useSharedValue(4);
  
  const delayedRender = useSharedValue(0);
  React.useEffect(() => {
    delayedRender.value = withSpring(1, { 
      damping: 20, 
      stiffness: 90,
      mass: 1,
      velocity: 0.5,
      delay: index * 100
    });
  }, []);

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: interpolateColor(delayedRender.value, [0, 1], [50, 0]) },
      ],
      opacity: delayedRender.value
    };
  });

  const onPressIn = () => {
    scale.value = withSpring(0.98);
    elevation.value = withSpring(2);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
    elevation.value = withSpring(4);
  };

  const navigateToLibrary = () => {
    router.push(library.route);
  };

  // Generar colores para el degradado basado en el color principal
  const lighterColor = library.color;
  const darkerColor = adjustColor(library.color, -30);
  
  return (
    <AnimatedPressable
      style={[styles.container, cardStyle]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={navigateToLibrary}
    >
      <Canvas style={styles.canvas}>
        <RoundedRect
          x={0}
          y={0}
          width={styles.canvas.width}
          height={styles.canvas.height}
          r={theme.borderRadius.m}
        >
          <Shadow dx={0} dy={2} blur={elevation} color="rgba(0, 0, 0, 0.15)" />
        </RoundedRect>
      </Canvas>
      
      <LinearGradient
        colors={[lighterColor, darkerColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.name}>{library.name}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {library.description}
          </Text>
          
          <View style={styles.tags}>
            {library.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </AnimatedPressable>
  );
}

// Función para ajustar colores (oscurecer o aclarar)
function adjustColor(color: string, amount: number): string {
  // Simple function to adjust color brightness
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.substring(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substring(2, 4), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substring(4, 6), 16) + amount));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.m,
    marginVertical: theme.spacing.s,
    height: 150,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
  },
  canvas: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    flex: 1,
    borderRadius: theme.borderRadius.m,
  },
  content: {
    flex: 1,
    padding: theme.spacing.m,
    justifyContent: 'space-between',
  },
  name: {
    ...theme.typography.h3,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    ...theme.typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: theme.spacing.xs,
  },
  tags: {
    flexDirection: 'row',
    marginTop: theme.spacing.s,
  },
  tag: {
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: theme.borderRadius.s,
    marginRight: theme.spacing.xs,
  },
  tagText: {
    ...theme.typography.small,
    color: 'white',
  },
}); 