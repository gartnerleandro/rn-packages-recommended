import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  Easing
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Canvas, RoundedRect, Shadow } from '@shopify/react-native-skia';

import { theme } from '../../themes/theme';

interface HeaderBarProps {
  title: string;
  showBackButton?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function HeaderBar({ 
  title, 
  showBackButton = true, 
  backgroundColor = theme.colors.card,
  textColor = theme.colors.text
}: HeaderBarProps) {
  const insets = useSafeAreaInsets();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  
  React.useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }, []);
  
  const backButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  
  const goBack = () => {
    scale.value = withTiming(0.9, { duration: 100 });
    
    // Pequeña animación antes de volver
    setTimeout(() => {
      scale.value = withTiming(1, { duration: 100 });
      setTimeout(() => {
        router.back();
      }, 50);
    }, 100);
  };
  
  return (
    <Animated.View style={[
      styles.container, 
      { paddingTop: insets.top },
      { backgroundColor },
      containerStyle
    ]}>
      <Canvas style={StyleSheet.absoluteFill}>
        <RoundedRect
          x={0}
          y={0}
          width={'100%'}
          height={'100%'}
          r={0}
        >
          <Shadow dx={0} dy={2} blur={4} color="rgba(0,0,0,0.1)" />
        </RoundedRect>
      </Canvas>
      
      <View style={styles.content}>
        {showBackButton && (
          <AnimatedPressable
            style={[styles.backButton, backButtonStyle]}
            onPress={goBack}
          >
            <Ionicons 
              name="arrow-back" 
              size={24} 
              color={textColor} 
            />
          </AnimatedPressable>
        )}
        
        <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
          {title}
        </Text>
        
        <View style={styles.rightSpace} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: theme.spacing.m,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...theme.typography.h3,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: theme.spacing.s,
  },
  rightSpace: {
    width: 40,
  },
}); 