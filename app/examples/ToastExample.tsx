import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Toast from 'react-native-toast-message';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { theme } from '../../themes/theme';

const TOAST_TYPES = [
  {
    name: 'Success',
    type: 'success',
    message: '¡Operación completada con éxito!',
    description: 'Todos los cambios fueron guardados',
    color: theme.colors.success,
  },
  {
    name: 'Error',
    type: 'error',
    message: 'Ha ocurrido un error',
    description: 'Por favor, intenta de nuevo más tarde',
    color: theme.colors.error,
  },
  {
    name: 'Info',
    type: 'info',
    message: 'Información importante',
    description: 'Esta es una notificación informativa',
    color: theme.colors.primary,
  },
  {
    name: 'Warning',
    type: 'warning',
    message: 'Advertencia',
    description: 'Tus cambios no se han guardado aún',
    color: theme.colors.warning,
  },
];

export default function ToastExample() {
  const [selectedType, setSelectedType] = React.useState(0);
  
  // Valor animado para el indicador de selección 
  const selectionPosition = useSharedValue(0);
  
  // Efecto para animar el indicador al cambiar el tipo seleccionado
  React.useEffect(() => {
    selectionPosition.value = withTiming(80 * selectedType, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [selectedType]);
  
  // Estilo animado para el indicador
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: selectionPosition.value }],
    };
  });
  
  // Mostrar toast con el tipo seleccionado
  const showToast = () => {
    const { type, message, description } = TOAST_TYPES[selectedType];
    Toast.show({
      type,
      text1: message,
      text2: description,
      position: 'bottom',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Toast Message</Text>
      <Text style={styles.description}>
        Una biblioteca personalizable para mostrar notificaciones de tipo "toast" en tus aplicaciones.
      </Text>
      
      {/* Selector de tipos de toast */}
      <View style={styles.selectorContainer}>
        <Animated.View 
          style={[
            styles.selector, 
            { backgroundColor: TOAST_TYPES[selectedType].color + '20' },
            indicatorStyle
          ]} 
        />
        
        {TOAST_TYPES.map((toast, index) => (
          <Pressable
            key={toast.name}
            style={styles.typeButton}
            onPress={() => setSelectedType(index)}
          >
            <Text 
              style={[
                styles.typeText,
                selectedType === index && { 
                  color: TOAST_TYPES[selectedType].color,
                  fontWeight: '600'
                }
              ]}
            >
              {toast.name}
            </Text>
          </Pressable>
        ))}
      </View>
      
      {/* Botón para mostrar toast */}
      <Pressable
        style={[styles.showButton, { backgroundColor: TOAST_TYPES[selectedType].color }]}
        onPress={showToast}
      >
        <Text style={styles.showButtonText}>
          Mostrar Toast
        </Text>
      </Pressable>
      
      {/* Ejemplo de código */}
      <View style={styles.codeContainer}>
        <Text style={styles.codeTitle}>Código básico:</Text>
        <Text style={styles.code}>
{`// En tu componente principal (App.tsx)
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <YourApp />
      <Toast />
    </>
  );
}

// Para mostrar un toast en cualquier componente:
Toast.show({
  type: 'success',
  text1: 'Título del toast',
  text2: 'Mensaje descriptivo opcional'
});`}
        </Text>
      </View>
      
      {/* Consejos de uso */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Consejos de uso:</Text>
        <Text style={styles.tip}>
          • Coloca el componente Toast fuera de cualquier contenedor con padding/margin
        </Text>
        <Text style={styles.tip}>
          • Puedes personalizar completamente la apariencia con toastConfig
        </Text>
        <Text style={styles.tip}>
          • Las notificaciones toast son ideales para feedback no intrusivo
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
  typeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  showButton: {
    height: 50,
    borderRadius: theme.borderRadius.m,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  showButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  codeContainer: {
    backgroundColor: '#2d2d2d',
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.l,
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
  tipsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
  },
  tipsTitle: {
    ...theme.typography.body,
    fontWeight: '600',
    marginBottom: theme.spacing.s,
  },
  tip: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
}); 