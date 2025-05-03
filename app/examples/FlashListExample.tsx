import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../../themes/theme';

// Generar datos de ejemplo
const generateItems = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `item-${index}`,
    title: `Elemento ${index + 1}`,
    description: `Esta es la descripción del elemento ${index + 1}`,
    height: Math.max(70, Math.floor(Math.random() * 50) + 70), // Altura variable para los elementos
    color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`,
  }));
};

const LAYOUTS = [
  { name: 'Lista Simple', itemCount: 100 },
  { name: 'Lista Grande', itemCount: 10000 },
  { name: 'Cuadrícula', itemCount: 500, grid: true },
];

type Item = ReturnType<typeof generateItems>[0];

export default function FlashListExample() {
  const [layout, setLayout] = React.useState(0);
  const [items, setItems] = React.useState(() => generateItems(LAYOUTS[0].itemCount));
  const [refreshing, setRefreshing] = React.useState(false);
  
  // Animaciones
  const flashListOpacity = useSharedValue(1);
  const tabPosition = useSharedValue(0);
  
  // Cambiar layout
  React.useEffect(() => {
    // Animar la salida de la lista actual
    flashListOpacity.value = withSequence(
      withTiming(0, { duration: 200 }),
      withDelay(
        100,
        withTiming(1, { duration: 300 })
      )
    );
    
    // Generar nuevos elementos después de la animación
    setTimeout(() => {
      setItems(generateItems(LAYOUTS[layout].itemCount));
    }, 200);
    
    // Animar el indicador de pestaña
    tabPosition.value = withTiming(layout * 110, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [layout]);
  
  // Simular una recarga
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setItems(generateItems(LAYOUTS[layout].itemCount));
      setRefreshing(false);
    }, 1500);
  };
  
  // Estilos animados
  const listStyle = useAnimatedStyle(() => {
    return {
      opacity: flashListOpacity.value,
    };
  });
  
  const tabIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPosition.value }],
    };
  });
  
  // Renderizar un elemento de la lista
  const renderItem = ({ item, index }: { item: Item; index: number }) => {
    return (
      <View
        style={[
          styles.itemContainer,
          LAYOUTS[layout].grid ? styles.gridItem : { height: item.height },
        ]}
      >
        <LinearGradient
          colors={[item.color, adjustColor(item.color, -20)]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          {!LAYOUTS[layout].grid && (
            <Text style={styles.itemDescription}>{item.description}</Text>
          )}
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopify FlashList</Text>
      <Text style={styles.description}>
        Una alternativa a FlatList con mejor rendimiento para listas largas.
      </Text>
      
      {/* Selector de tipo de lista */}
      <View style={styles.tabContainer}>
        <Animated.View style={[styles.tabIndicator, tabIndicatorStyle]} />
        
        {LAYOUTS.map((layoutOption, index) => (
          <Pressable
            key={layoutOption.name}
            style={styles.tab}
            onPress={() => setLayout(index)}
          >
            <Text 
              style={[
                styles.tabText, 
                layout === index && styles.activeTabText
              ]}
            >
              {layoutOption.name}
            </Text>
          </Pressable>
        ))}
      </View>
      
      {/* FlashList */}
      <Animated.View style={[styles.listContainer, listStyle]}>
        <FlashList
          data={items}
          renderItem={renderItem}
          estimatedItemSize={LAYOUTS[layout].grid ? 150 : 80}
          numColumns={LAYOUTS[layout].grid ? 2 : 1}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          ItemSeparatorComponent={
            LAYOUTS[layout].grid ? undefined : () => <View style={styles.separator} />
          }
          contentContainerStyle={
            LAYOUTS[layout].grid ? styles.gridContent : styles.listContent
          }
        />
      </Animated.View>
      
      {/* Código de ejemplo */}
      <View style={styles.codeContainer}>
        <Text style={styles.codeTitle}>Código básico:</Text>
        <Text style={styles.code}>
{`import { FlashList } from '@shopify/flash-list';

export default function MyList() {
  return (
    <FlashList
      data={items}
      renderItem={({ item }) => (
        <Text>{item.title}</Text>
      )}
      estimatedItemSize={50}
    />
  );
}`}
        </Text>
      </View>
      
      {/* Ventajas de FlashList */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Ventajas sobre FlatList:</Text>
        <Text style={styles.infoText}>• Mejor rendimiento para listas grandes</Text>
        <Text style={styles.infoText}>• Menor uso de memoria</Text>
        <Text style={styles.infoText}>• Scroll más fluido</Text>
        <Text style={styles.infoText}>• Mejor reutilización de celdas</Text>
      </View>
    </View>
  );
}

// Función para ajustar un color
function adjustColor(color: string, amount: number): string {
  if (color.startsWith('hsl')) {
    // Extraer valores HSL
    const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return color;
    
    const h = parseInt(match[1]);
    const s = parseInt(match[2]);
    const l = Math.max(0, Math.min(100, parseInt(match[3]) + amount));
    
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  
  return color;
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
  tabContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.m,
    height: 40,
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: theme.borderRadius.m,
  },
  tabIndicator: {
    position: 'absolute',
    width: 110,
    height: '100%',
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    borderRadius: theme.borderRadius.m,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    marginBottom: theme.spacing.m,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
  },
  itemContainer: {
    borderRadius: theme.borderRadius.s,
    overflow: 'hidden',
  },
  gridItem: {
    margin: 6,
    height: 150,
    flex: 1,
  },
  itemContent: {
    flex: 1,
    padding: theme.spacing.m,
    justifyContent: 'center',
  },
  itemTitle: {
    ...theme.typography.body,
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
  },
  itemDescription: {
    ...theme.typography.small,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  listContent: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
  },
  gridContent: {
    padding: theme.spacing.s,
  },
  codeContainer: {
    backgroundColor: '#2d2d2d',
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
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
  infoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
  },
  infoTitle: {
    ...theme.typography.body,
    fontWeight: '600',
    marginBottom: theme.spacing.s,
  },
  infoText: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
}); 