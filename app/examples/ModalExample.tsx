import React, { useRef, useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import BottomSheet, { 
  BottomSheetView, 
  BottomSheetBackdrop,
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetFooter
} from '@gorhom/bottom-sheet';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '../../themes/theme';

// Datos de ejemplo
const CONTENT_TYPES = [
  { 
    title: 'Bottom Sheet básico', 
    description: 'La forma más simple de implementar un bottom sheet',
    icon: 'layers-outline'
  },
  { 
    title: 'Bottom Sheet modal', 
    description: 'Modal presentado desde abajo con API imperativa',
    icon: 'albums-outline'
  },
  { 
    title: 'Altura dinámica', 
    description: 'Se adapta automáticamente al contenido',
    icon: 'resize-outline'
  },
  { 
    title: 'Con Footer', 
    description: 'Incluye contenido persistente al final',
    icon: 'footsteps-outline'
  },
];

export default function ModalExample() {
  // Referencias a los diferentes bottom sheets
  const basicSheetRef = useRef<BottomSheet>(null);
  const modalSheetRef = useRef<BottomSheetModal>(null);
  const dynamicSheetRef = useRef<BottomSheet>(null);
  const footerSheetRef = useRef<BottomSheet>(null);
  
  // Puntos de anclaje para diferentes ejemplos
  const basicSnapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  const modalSnapPoints = useMemo(() => ['50%'], []);
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const footerSnapPoints = useMemo(() => ['40%', '80%'], []);
  
  // Configuración para el sheet con altura dinámica
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);
  
  // Animación para el botón del modal
  const modalButtonScale = useSharedValue(1);
  const modalButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: modalButtonScale.value }],
    };
  });
  
  // Manejadores para abrir los distintos sheets
  const handleOpenBasic = useCallback(() => {
    basicSheetRef.current?.expand();
  }, []);
  
  const handleOpenModal = useCallback(() => {
    modalButtonScale.value = withTiming(0.95, { duration: 100 });
    setTimeout(() => {
      modalButtonScale.value = withTiming(1, { duration: 100 });
      modalSheetRef.current?.present();
    }, 100);
  }, []);
  
  const handleOpenDynamic = useCallback(() => {
    dynamicSheetRef.current?.expand();
  }, []);
  
  const handleOpenFooter = useCallback(() => {
    footerSheetRef.current?.expand();
  }, []);
  
  // Renderiza el backdrop
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );
  
  // Renderiza el footer para el último ejemplo
  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} style={styles.footer}>
        <View style={styles.footerContainer}>
          <Pressable style={styles.footerButton}>
            <Text style={styles.footerButtonText}>Cancelar</Text>
          </Pressable>
          <Pressable style={[styles.footerButton, styles.primaryButton]}>
            <Text style={styles.primaryButtonText}>Confirmar</Text>
          </Pressable>
        </View>
      </BottomSheetFooter>
    ),
    []
  );
  
  // SafeArea para evitar problemas con notch/home indicator
  const insets = useSafeAreaInsets();
  
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Gorhom Bottom Sheet</Text>
        <Text style={styles.description}>
          Implementación de alta calidad para bottom sheets con soporte para gestos, 
          animaciones fluidas y varias opciones de personalización.
        </Text>

        {/* Botones para abrir los diferentes ejemplos */}
        <View style={styles.buttonsContainer}>
          {CONTENT_TYPES.map((type, index) => {
            let onPress;
            
            switch (index) {
              case 0:
                onPress = handleOpenBasic;
                break;
              case 1:
                onPress = handleOpenModal;
                break;
              case 2:
                onPress = handleOpenDynamic;
                break;
              case 3:
                onPress = handleOpenFooter;
                break;
              default:
                onPress = () => {};
            }
            
            return (
              <Pressable 
                key={type.title}
                style={styles.optionButton}
                onPress={onPress}
              >
                <View style={styles.optionIconContainer}>
                  <Ionicons name={type.icon} size={24} color={theme.colors.primary} />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>{type.title}</Text>
                  <Text style={styles.optionDescription}>{type.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
              </Pressable>
            );
          })}
        </View>
        
        {/* Botón especial para ejemplo modal con animación */}
        <Animated.View style={[styles.modalButtonContainer, modalButtonStyle]}>
          <Pressable 
            style={styles.modalButton}
            onPress={handleOpenModal}
          >
            <Text style={styles.modalButtonText}>Abrir modal</Text>
          </Pressable>
        </Animated.View>
        
        {/* Código de ejemplo */}
        <View style={styles.codeContainer}>
          <Text style={styles.codeTitle}>Código básico:</Text>
          <Text style={styles.code}>
{`import BottomSheet from '@gorhom/bottom-sheet';

export default function App() {
  // Puntos de anclaje
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  
  // Ref para controlar el sheet
  const bottomSheetRef = useRef<BottomSheet>(null);
  
  // Handlers
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  
  return (
    <View style={{ flex: 1 }}>
      <Button title="Abrir" onPress={handleOpenPress} />
      
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <View style={{ padding: 16 }}>
          <Text>Contenido del bottom sheet</Text>
        </View>
      </BottomSheet>
    </View>
  );
}`}
          </Text>
        </View>
        
        {/* 1. Bottom Sheet básico */}
        <BottomSheet
          ref={basicSheetRef}
          index={-1}
          snapPoints={basicSnapPoints}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={styles.indicator}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.sheetTitle}>Bottom Sheet Básico</Text>
            <Text style={styles.sheetDescription}>
              Este es el componente BottomSheet básico con puntos de anclaje fijos.
              Puedes deslizar hacia arriba para expandirlo a diferentes alturas
              o hacia abajo para cerrarlo.
            </Text>
            
            <Text style={styles.sheetInfo}>Características:</Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={18} color={theme.colors.success} />
                <Text style={styles.featureText}>Múltiples puntos de anclaje (25%, 50%, 90%)</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={18} color={theme.colors.success} />
                <Text style={styles.featureText}>Desliza hacia abajo para cerrar</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={18} color={theme.colors.success} />
                <Text style={styles.featureText}>Backdrop con opacidad</Text>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
        
        {/* 2. Bottom Sheet Modal */}
        <BottomSheetModal
          ref={modalSheetRef}
          index={0}
          snapPoints={modalSnapPoints}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={styles.indicator}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.sheetTitle}>Bottom Sheet Modal</Text>
            <Text style={styles.sheetDescription}>
              Este es un BottomSheetModal, que se presenta de forma imperativa
              usando el método present() en lugar de expandirse automáticamente.
            </Text>
            
            <Text style={styles.sheetInfo}>Código para mostrar el modal:</Text>
            <View style={styles.modalCodeContainer}>
              <Text style={styles.modalCode}>modalRef.current?.present();</Text>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
        
        {/* 3. Bottom Sheet con altura dinámica */}
        <BottomSheet
          ref={dynamicSheetRef}
          index={-1}
          snapPoints={animatedSnapPoints}
          handleHeight={animatedHandleHeight}
          contentHeight={animatedContentHeight}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={styles.indicator}
        >
          <BottomSheetView onLayout={handleContentLayout} style={styles.contentContainer}>
            <Text style={styles.sheetTitle}>Altura Dinámica</Text>
            <Text style={styles.sheetDescription}>
              Este bottom sheet ajusta automáticamente su altura según el contenido.
              Utiliza el hook useBottomSheetDynamicSnapPoints para calcularlo.
            </Text>
            
            <Text style={styles.sheetInfo}>Contenido dinámico:</Text>
            {[1, 2, 3, 4, 5].map(item => (
              <View key={item} style={styles.dynamicItem}>
                <Text style={styles.dynamicItemText}>
                  Elemento dinámico {item}
                </Text>
              </View>
            ))}
          </BottomSheetView>
        </BottomSheet>
        
        {/* 4. Bottom Sheet con Footer */}
        <BottomSheet
          ref={footerSheetRef}
          index={-1}
          snapPoints={footerSnapPoints}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          footerComponent={renderFooter}
          handleIndicatorStyle={styles.indicator}
        >
          <BottomSheetScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.sheetTitle}>Footer Persistente</Text>
            <Text style={styles.sheetDescription}>
              Este bottom sheet incluye un footer que permanece visible incluso
              al desplazarse por el contenido. Ideal para acciones importantes.
            </Text>
            
            <Text style={styles.sheetInfo}>Contenido con scroll:</Text>
            {Array.from({ length: 15 }).map((_, index) => (
              <View key={index} style={styles.scrollItem}>
                <Text style={styles.scrollItemText}>Elemento {index + 1}</Text>
              </View>
            ))}
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </BottomSheetModalProvider>
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
  buttonsContainer: {
    marginBottom: theme.spacing.l,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.m,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.s,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    ...theme.typography.body,
    fontWeight: '600',
    color: theme.colors.text,
  },
  optionDescription: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
  },
  modalButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.l,
  },
  modalButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    padding: theme.spacing.l,
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
  sheetTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.s,
  },
  sheetDescription: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.l,
  },
  sheetInfo: {
    ...theme.typography.body,
    fontWeight: '600',
    marginBottom: theme.spacing.s,
  },
  featureList: {
    marginBottom: theme.spacing.l,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  featureText: {
    ...theme.typography.body,
    marginLeft: theme.spacing.s,
  },
  modalCodeContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    marginTop: theme.spacing.s,
  },
  modalCode: {
    fontFamily: 'monospace',
    color: theme.colors.primary,
  },
  dynamicItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    marginBottom: theme.spacing.s,
  },
  dynamicItemText: {
    ...theme.typography.body,
  },
  scrollContent: {
    padding: theme.spacing.l,
    paddingBottom: 100,
  },
  scrollItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    marginBottom: theme.spacing.s,
  },
  scrollItemText: {
    ...theme.typography.body,
  },
  footer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    paddingBottom: 20, // Para dispositivos con home indicator
  },
  footerContainer: {
    padding: theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerButton: {
    flex: 1,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.s,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: theme.spacing.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  footerButtonText: {
    ...theme.typography.body,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
  },
  primaryButtonText: {
    color: 'white',
  },
  indicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 40,
  },
}); 