import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

import { theme } from '../../themes/theme';

// Nota: Necesitarías añadir archivos Lottie reales en la carpeta assets/lottie
// Por ahora, usamos URLs públicas
const ANIMATIONS = [
  { 
    name: 'Cohete despegando', 
    url: 'https://assets6.lottiefiles.com/private_files/lf30_tonsVH.json',
    loop: true
  },
  { 
    name: 'Éxito', 
    url: 'https://assets7.lottiefiles.com/packages/lf20_qm8eqzse.json',
    loop: false
  },
  { 
    name: 'Loading', 
    url: 'https://assets1.lottiefiles.com/packages/lf20_usmfx6bp.json',
    loop: true
  },
];

export default function LottieExample() {
  const [selectedAnim, setSelectedAnim] = React.useState(0);
  const animationRef = React.useRef<LottieView>(null);
  const isPlaying = React.useRef(true);
  
  // Valor animado para el indicador de selección
  const selectionX = useSharedValue(0);
  
  // Efecto para ajustar la posición del indicador
  React.useEffect(() => {
    selectionX.value = withTiming(selectedAnim * 100, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [selectedAnim]);
  
  // Estilo animado para el indicador
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: selectionX.value }],
    };
  });
  
  // Alternar reproducción/pausa
  const togglePlay = () => {
    if (isPlaying.current) {
      animationRef.current?.pause();
    } else {
      animationRef.current?.resume();
    }
    isPlaying.current = !isPlaying.current;
  };
  
  // Reiniciar animación
  const resetAnimation = () => {
    animationRef.current?.reset();
    animationRef.current?.play();
    isPlaying.current = true;
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lottie React Native</Text>
      <Text style={styles.description}>
        Lottie es una biblioteca que renderiza animaciones de Adobe After Effects 
        exportadas como JSON con bodymovin.
      </Text>
      
      {/* Selector de animaciones */}
      <View style={styles.selectorContainer}>
        <Animated.View style={[styles.indicator, indicatorStyle]} />
        
        {ANIMATIONS.map((anim, index) => (
          <Pressable
            key={anim.name}
            style={styles.selectorButton}
            onPress={() => setSelectedAnim(index)}
          >
            <Text 
              style={[
                styles.selectorText,
                selectedAnim === index && styles.activeText
              ]}
            >
              {anim.name}
            </Text>
          </Pressable>
        ))}
      </View>
      
      {/* Contenedor de la animación */}
      <View style={styles.animContainer}>
        <LottieView
          ref={animationRef}
          source={{ uri: ANIMATIONS[selectedAnim].url }}
          autoPlay
          loop={ANIMATIONS[selectedAnim].loop}
          style={styles.animation}
        />
      </View>
      
      {/* Controles */}
      <View style={styles.controls}>
        <Pressable 
          style={styles.button} 
          onPress={togglePlay}
        >
          <Text style={styles.buttonText}>
            {isPlaying.current ? 'Pausar' : 'Reproducir'}
          </Text>
        </Pressable>
        
        <Pressable 
          style={styles.button} 
          onPress={resetAnimation}
        >
          <Text style={styles.buttonText}>Reiniciar</Text>
        </Pressable>
      </View>
      
      {/* Código de ejemplo */}
      <View style={styles.codeContainer}>
        <Text style={styles.codeTitle}>Código básico:</Text>
        <Text style={styles.code}>
{`import LottieView from 'lottie-react-native';

export default function Animation() {
  return (
    <LottieView
      source={require('./animation.json')}
      autoPlay
      loop
    />
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
  },
  indicator: {
    position: 'absolute',
    width: 100,
    height: '100%',
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    borderRadius: theme.borderRadius.m,
  },
  selectorButton: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectorText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  activeText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  animContainer: {
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: theme.borderRadius.m,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
    overflow: 'hidden',
  },
  animation: {
    width: 180,
    height: 180,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.l,
  },
  button: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.m,
    marginHorizontal: theme.spacing.s,
  },
  buttonText: {
    color: 'white',
    ...theme.typography.caption,
    fontWeight: '600',
  },
  codeContainer: {
    backgroundColor: '#2d2d2d',
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
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