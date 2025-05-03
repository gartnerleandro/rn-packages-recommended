import React from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';

import { theme } from '../../themes/theme';

// Ejemplos de gradientes predefinidos
const GRADIENT_EXAMPLES = [
  {
    name: 'Sunset',
    colors: ['#FF512F', '#F09819'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    name: 'Ocean',
    colors: ['#2193b0', '#6dd5ed'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  {
    name: 'Purple',
    colors: ['#834d9b', '#d04ed6'],
    start: { x: 0, y: 1 },
    end: { x: 1, y: 0 },
  },
  {
    name: 'Forest',
    colors: ['#134E5E', '#71B280'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
];

export default function GradientExample() {
  const [selectedGradient, setSelectedGradient] = React.useState(0);
  const animationProgress = useSharedValue(0);
  const selectedPosition = useSharedValue(0);
  
  // Animar cuando cambia el gradiente seleccionado
  React.useEffect(() => {
    animationProgress.value = 0;
    animationProgress.value = withTiming(1, {
      duration: 1000,
      easing: Easing.inOut(Easing.cubic),
    });
    
    selectedPosition.value = withTiming(selectedGradient * 80, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [selectedGradient]);
  
  // Estilo animado para el selector
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: selectedPosition.value }],
    };
  });
  
  // Estilo animado para el contenedor principal
  const gradientContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolateColor(animationProgress.value, [0, 1], [0.95, 1]) },
      ],
      opacity: animationProgress.value,
    };
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Linear Gradient</Text>
      <Text style={styles.description}>
        Añade gradientes lineales a tus componentes de manera sencilla.
      </Text>
      
      {/* Selector de gradientes */}
      <View style={styles.selectorContainer}>
        <Animated.View 
          style={[
            styles.selector, 
            { backgroundColor: GRADIENT_EXAMPLES[selectedGradient].colors[0] + '40' },
            indicatorStyle
          ]} 
        />
        
        {GRADIENT_EXAMPLES.map((gradient, index) => (
          <Pressable
            key={gradient.name}
            style={styles.gradientButton}
            onPress={() => setSelectedGradient(index)}
          >
            <Text 
              style={[
                styles.gradientButtonText,
                selectedGradient === index && { 
                  color: GRADIENT_EXAMPLES[index].colors[0],
                  fontWeight: '600',
                }
              ]}
            >
              {gradient.name}
            </Text>
          </Pressable>
        ))}
      </View>
      
      {/* Ejemplo principal de gradiente */}
      <Animated.View style={[styles.gradientExampleContainer, gradientContainerStyle]}>
        <LinearGradient
          colors={GRADIENT_EXAMPLES[selectedGradient].colors}
          start={GRADIENT_EXAMPLES[selectedGradient].start}
          end={GRADIENT_EXAMPLES[selectedGradient].end}
          style={styles.gradient}
        >
          <Text style={styles.gradientText}>
            {GRADIENT_EXAMPLES[selectedGradient].name}
          </Text>
        </LinearGradient>
      </Animated.View>
      
      {/* Variaciones de uso */}
      <Text style={styles.sectionTitle}>Variaciones de uso</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.variationCard}>
          <LinearGradient
            colors={GRADIENT_EXAMPLES[selectedGradient].colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.variationGradient}
          />
          <Text style={styles.variationText}>Diagonal</Text>
        </View>
        
        <View style={styles.variationCard}>
          <LinearGradient
            colors={GRADIENT_EXAMPLES[selectedGradient].colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.variationGradient}
          />
          <Text style={styles.variationText}>Horizontal</Text>
        </View>
        
        <View style={styles.variationCard}>
          <LinearGradient
            colors={GRADIENT_EXAMPLES[selectedGradient].colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.variationGradient}
          />
          <Text style={styles.variationText}>Vertical</Text>
        </View>
        
        <View style={styles.variationCard}>
          <LinearGradient
            colors={[...GRADIENT_EXAMPLES[selectedGradient].colors, GRADIENT_EXAMPLES[selectedGradient].colors[0]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.variationGradient}
          />
          <Text style={styles.variationText}>Multi-color</Text>
        </View>
      </ScrollView>
      
      {/* Código de ejemplo */}
      <View style={styles.codeContainer}>
        <Text style={styles.codeTitle}>Código básico:</Text>
        <Text style={styles.code}>
{`import { LinearGradient } from 'expo-linear-gradient';

export default function GradientComponent() {
  return (
    <LinearGradient
      colors={['#FF512F', '#F09819']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <Text style={{ color: 'white' }}>
        Texto con fondo gradiente
      </Text>
    </LinearGradient>
  );
}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.l,
  },
  selectorContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.l,
    height: 40,
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: theme.borderRadius.m,
  },
  selector: {
    position: 'absolute',
    width: 80,
    height: '100%',
    borderRadius: theme.borderRadius.m,
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientButtonText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  gradientExampleContainer: {
    height: 150,
    marginBottom: theme.spacing.l,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  variationCard: {
    width: 100,
    marginRight: theme.spacing.m,
  },
  variationGradient: {
    height: 100,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.xs,
  },
  variationText: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  codeContainer: {
    backgroundColor: '#2d2d2d',
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginTop: theme.spacing.l,
  },
  codeTitle: {
    color: 'white',
    ...theme.typography.caption,
    marginBottom: theme.spacing.s,
  },
  code: {
    color: '#E6E6E6',
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
  },
}); 