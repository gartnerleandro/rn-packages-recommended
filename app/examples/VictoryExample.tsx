import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { 
  CartesianChart, 
  Line, 
  useChartPressState, 
  Area, 
  Bar,
  type CartesianChartRenderArg,
  type ChartBounds,
  type MaybeNumber
} from 'victory-native';
import { Circle } from '@shopify/react-native-skia';
import { theme } from '../../themes/theme';

// Tipos de ejemplos para mostrar
const EXAMPLES = [
  { 
    id: 'bar',
    title: 'Gráfico de barras', 
    description: 'Visualización clásica de datos categóricos'
  },
  { 
    id: 'line',
    title: 'Gráfico de líneas', 
    description: 'Ideal para mostrar tendencias a lo largo del tiempo'
  },
  { 
    id: 'area',
    title: 'Gráfico de área', 
    description: 'Muestra tendencias con énfasis en volumen'
  },
  { 
    id: 'interactive',
    title: 'Gráfico interactivo', 
    description: 'Con tooltip y gestos para interacción'
  }
];

// Datos de ejemplo para los gráficos
const barData = [
  { quarter: 'Q1', earnings: 13000 },
  { quarter: 'Q2', earnings: 16500 },
  { quarter: 'Q3', earnings: 14250 },
  { quarter: 'Q4', earnings: 19000 }
];

// Datos para gráfico de líneas
const lineData = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  highTmp: 40 + 30 * Math.random(),
}));

// Datos para gráfico de área
const areaData = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  value: 50 + 40 * Math.sin(i / 5),
}));

// Datos para gráfico interactivo
const interactiveData = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  highTmp: 40 + 30 * Math.random(),
  lowTmp: 20 + 15 * Math.random(),
}));

const { width } = Dimensions.get('window');
const chartWidth = width - theme.spacing.m * 2;
const chartHeight = 300;

// Tipo para los datos interactivos
type InteractiveDataPoint = {
  day: number;
  highTmp: number;
  lowTmp: number;
};

// Componente de tooltip para el ejemplo interactivo
function ToolTip({ 
  x, 
  y, 
  data, 
  index 
}: { 
  x: number; 
  y: number; 
  data: InteractiveDataPoint[];
  index: number | null;
}) {
  if (index === null) return null;
  
  const item = data[index];
  return (
    <>
      <Circle cx={x} cy={y} r={8} color="rgba(98, 0, 238, 0.8)" />
      <View style={[
        styles.tooltip, 
        { 
          transform: [
            { translateX: x - 60 },
            { translateY: y - 70 }
          ] 
        }
      ]}>
        <Text style={styles.tooltipText}>Día: {item.day}</Text>
        <Text style={styles.tooltipText}>Temp: {item.highTmp.toFixed(1)}°</Text>
      </View>
    </>
  );
}

export default function VictoryExample() {
  const [activeExample, setActiveExample] = useState('bar');
  
  // Renderizar el ejemplo seleccionado
  const renderExample = () => {
    switch (activeExample) {
      case 'bar':
        return (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Gráfico de Barras</Text>
            <Text style={styles.exampleDescription}>
              Gráfico de barras simple que muestra las ganancias trimestrales.
            </Text>
            
            <View style={styles.chartContainer}>
              <CartesianChart
                data={barData}
                xKey="quarter"
                yKeys={["earnings"]}
                axisOptions={{
                  formatXLabel: (value) => String(value),
                  formatYLabel: (value) => `$${(Number(value)/1000).toFixed(0)}k`,
                }}
                domainPadding={{ left: 30, right: 30, bottom: 0, top: 10 }}
              >
                {({ points, chartBounds }: CartesianChartRenderArg<typeof barData[0], "earnings">) => (
                  <>
                    {points.earnings.map((point, index) => (
                      <Bar
                        key={index}
                        points={[point]}
                        chartBounds={chartBounds}
                        color={theme.colors.primary}
                      />
                    ))}
                  </>
                )}
              </CartesianChart>
            </View>
            
            <View style={styles.codeContainer}>
              <Text style={styles.codeTitle}>Código:</Text>
              <Text style={styles.code}>
{`import { CartesianChart, Bar } from 'victory-native';

const data = [
  { quarter: 'Q1', earnings: 13000 },
  { quarter: 'Q2', earnings: 16500 },
  { quarter: 'Q3', earnings: 14250 },
  { quarter: 'Q4', earnings: 19000 }
];

<CartesianChart
  data={data}
  xKey="quarter"
  yKeys={["earnings"]}
  axisOptions={{
    formatXLabel: (value) => String(value),
    formatYLabel: (value) => \`$\${(Number(value)/1000).toFixed(0)}k\`,
  }}
  domainPadding={{ left: 30, right: 30, bottom: 0, top: 10 }}
>
  {({ points, chartBounds }) => (
    <>
      {points.earnings.map((point, index) => (
        <Bar
          key={index}
          points={[point]}
          chartBounds={chartBounds}
          color="#6200EE"
        />
      ))}
    </>
  )}
</CartesianChart>`}
              </Text>
            </View>
          </View>
        );
        
      case 'line':
        return (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Gráfico de Líneas</Text>
            <Text style={styles.exampleDescription}>
              Gráfico de líneas para mostrar tendencias a lo largo del tiempo.
            </Text>
            
            <View style={styles.chartContainer}>
              <CartesianChart
                data={lineData}
                xKey="day"
                yKeys={["highTmp"]}
                axisOptions={{
                  formatXLabel: (value) => String(value),
                  formatYLabel: (value) => `${Number(value).toFixed(0)}°`,
                }}
              >
                {({ points, chartBounds }: CartesianChartRenderArg<typeof lineData[0], "highTmp">) => (
                  <>
                    <Line 
                      points={points.highTmp} 
                      color={theme.colors.primary} 
                      strokeWidth={3} 
                    />
                    {points.highTmp.map((point, index) => {
                      // Solo renderizar el círculo si x e y están definidos
                      if (typeof point.x === 'number' && typeof point.y === 'number') {
                        return (
                          <Circle
                            key={index}
                            cx={point.x}
                            cy={point.y}
                            r={4}
                            color={theme.colors.primary}
                          />
                        );
                      }
                      return null;
                    })}
                  </>
                )}
              </CartesianChart>
            </View>
            
            <View style={styles.codeContainer}>
              <Text style={styles.codeTitle}>Código:</Text>
              <Text style={styles.code}>
{`import { CartesianChart, Line } from 'victory-native';
import { Circle } from '@shopify/react-native-skia';

const data = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  highTmp: 40 + 30 * Math.random(),
}));

<CartesianChart
  data={data}
  xKey="day"
  yKeys={["highTmp"]}
  axisOptions={{
    formatXLabel: (value) => String(value),
    formatYLabel: (value) => \`\${Number(value).toFixed(0)}°\`,
  }}
>
  {({ points, chartBounds }) => (
    <>
      <Line 
        points={points.highTmp} 
        color="#6200EE" 
        strokeWidth={3} 
      />
      {points.highTmp.map((point, index) => {
        // Solo renderizar el círculo si x e y están definidos
        if (typeof point.x === 'number' && typeof point.y === 'number') {
          return (
            <Circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={4}
              color="#6200EE"
            />
          );
        }
        return null;
      })}
    </>
  )}
</CartesianChart>`}
              </Text>
            </View>
          </View>
        );
        
      case 'area':
        return (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Gráfico de Área</Text>
            <Text style={styles.exampleDescription}>
              Gráfico de área para enfatizar volumen bajo la curva.
            </Text>
            
            <View style={styles.chartContainer}>
              <CartesianChart
                data={areaData}
                xKey="day"
                yKeys={["value"]}
                axisOptions={{
                  formatXLabel: (value) => String(value),
                }}
              >
                {({ points, chartBounds }: CartesianChartRenderArg<typeof areaData[0], "value">) => (
                  <>
                    <Area
                      points={points.value}
                      color={`${theme.colors.primary}40`}
                      y0={chartBounds.bottom}
                    />
                    <Line
                      points={points.value}
                      color={theme.colors.primary}
                      strokeWidth={2}
                    />
                  </>
                )}
              </CartesianChart>
            </View>
            
            <View style={styles.codeContainer}>
              <Text style={styles.codeTitle}>Código:</Text>
              <Text style={styles.code}>
{`import { CartesianChart, Area, Line } from 'victory-native';

const data = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  value: 50 + 40 * Math.sin(i / 5),
}));

<CartesianChart
  data={data}
  xKey="day"
  yKeys={["value"]}
  axisOptions={{
    formatXLabel: (value) => String(value),
  }}
>
  {({ points, chartBounds }) => (
    <>
      <Area
        points={points.value}
        color="rgba(98, 0, 238, 0.25)"
        y0={chartBounds.bottom}
      />
      <Line
        points={points.value}
        color="#6200EE"
        strokeWidth={2}
      />
    </>
  )}
</CartesianChart>`}
              </Text>
            </View>
          </View>
        );
        
      case 'interactive':
        return (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Gráfico Interactivo</Text>
            <Text style={styles.exampleDescription}>
              Gráfico con tooltip interactivo usando gestos.
            </Text>
            
            <View style={styles.chartContainer}>
              <InteractiveChart data={interactiveData} />
            </View>
            
            <View style={styles.codeContainer}>
              <Text style={styles.codeTitle}>Código:</Text>
              <Text style={styles.code}>
{`import { CartesianChart, Line, useChartPressState } from 'victory-native';
import { Circle } from '@shopify/react-native-skia';

function InteractiveChart({ data }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { state, isActive } = useChartPressState({ 
    x: 0, 
    y: { highTmp: 0, lowTmp: 0 } 
  });

  return (
    <CartesianChart
      data={data}
      xKey="day"
      yKeys={["highTmp", "lowTmp"]}
      chartPressState={state}
    >
      {({ points }) => {
        // Encontrar índice más cercano al punto presionado
        let selectedIdx = null;
        if (isActive && state.x.value !== undefined) {
          const closestIdx = data.findIndex(
            (_, idx) => idx === Math.round(state.x.value)
          );
          if (closestIdx >= 0) {
            selectedIdx = closestIdx;
          }
        }
        
        return (
          <>
            <Line 
              points={points.highTmp} 
              color="#6200EE" 
              strokeWidth={3} 
            />
            <Line 
              points={points.lowTmp} 
              color="#03DAC6" 
              strokeWidth={3} 
            />
            {isActive && selectedIdx !== null && (
              <ToolTip 
                x={points.highTmp[selectedIdx].x} 
                y={points.highTmp[selectedIdx].y}
                data={data}
                index={selectedIdx}
              />
            )}
          </>
        );
      }}
    </CartesianChart>
  );
}`}
              </Text>
            </View>
          </View>
        );
        
      default:
        return null;
    }
  };

  // Componente de gráfico interactivo
  function InteractiveChart({ 
    data 
  }: { 
    data: InteractiveDataPoint[];
  }) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const { state, isActive } = useChartPressState({ 
      x: 0, 
      y: { highTmp: 0, lowTmp: 0 } 
    });

    return (
      <CartesianChart
        data={data}
        xKey="day"
        yKeys={["highTmp", "lowTmp"]}
        chartPressState={state}
      >
        {({ points }: CartesianChartRenderArg<InteractiveDataPoint, "highTmp" | "lowTmp">) => {
          // Encontrar índice más cercano al punto presionado
          let selectedIdx = null;
          if (isActive && state.x.value !== undefined) {
            const xValue = Number(state.x.value);
            const closestIdx = data.findIndex(
              (_, idx) => idx === Math.round(xValue)
            );
            if (closestIdx >= 0) {
              selectedIdx = closestIdx;
              setSelectedIndex(closestIdx);
            }
          }
          
          return (
            <>
              <Line 
                points={points.highTmp} 
                color={theme.colors.primary}
                strokeWidth={3} 
              />
              <Line 
                points={points.lowTmp} 
                color={theme.colors.success}
                strokeWidth={3} 
              />
              {isActive && selectedIndex !== null && points.highTmp[selectedIndex] && 
               typeof points.highTmp[selectedIndex].x === 'number' && 
               typeof points.highTmp[selectedIndex].y === 'number' && (
                <ToolTip 
                  x={points.highTmp[selectedIndex].x as number} 
                  y={points.highTmp[selectedIndex].y as number} 
                  data={data}
                  index={selectedIndex}
                />
              )}
            </>
          );
        }}
      </CartesianChart>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Victory Native</Text>
      <Text style={styles.description}>
        Potente biblioteca para visualización de datos y gráficos en React Native.
        Utiliza React Native Reanimated, Gesture Handler y Skia para gráficos de alto rendimiento.
      </Text>
      
      {/* Selector de ejemplos */}
      <View style={styles.optionsContainer}>
        {EXAMPLES.map((example) => (
          <Pressable
            key={example.id}
            style={[
              styles.optionButton,
              activeExample === example.id && styles.activeOption
            ]}
            onPress={() => setActiveExample(example.id)}
          >
            <Text 
              style={[
                styles.optionText,
                activeExample === example.id && styles.activeOptionText
              ]}
            >
              {example.title}
            </Text>
            <Text style={styles.optionDescription}>{example.description}</Text>
          </Pressable>
        ))}
      </View>
      
      {/* Contenido del ejemplo */}
      {renderExample()}
      
      {/* Documentación adicional */}
      <View style={styles.docsContainer}>
        <Text style={styles.docsTitle}>Características principales</Text>
        
        <View style={styles.featureContainer}>
          <View style={styles.featureHeader}>
            <Ionicons name="speedometer-outline" size={22} color={theme.colors.primary} />
            <Text style={styles.featureTitle}>Alto rendimiento</Text>
          </View>
          <Text style={styles.featureDescription}>
            Utiliza React Native Skia para gráficos rápidos incluso en dispositivos de gama baja.
          </Text>
        </View>
        
        <View style={styles.featureContainer}>
          <View style={styles.featureHeader}>
            <Ionicons name="color-palette-outline" size={22} color={theme.colors.primary} />
            <Text style={styles.featureTitle}>Personalización completa</Text>
          </View>
          <Text style={styles.featureDescription}>
            Diseña gráficos personalizados con componentes básicos como Line, Area y Bar.
          </Text>
        </View>
        
        <View style={styles.featureContainer}>
          <View style={styles.featureHeader}>
            <Ionicons name="hand-left-outline" size={22} color={theme.colors.primary} />
            <Text style={styles.featureTitle}>Interactividad avanzada</Text>
          </View>
          <Text style={styles.featureDescription}>
            Añade gestos para zoom, pan y tooltips interactivos con React Native Gesture Handler.
          </Text>
        </View>
        
        <Text style={styles.githubLink}>
          Más información: nearform.com/open-source/victory-native/docs/
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  description: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.l,
  },
  optionsContainer: {
    marginBottom: theme.spacing.l,
  },
  optionButton: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.s,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  activeOption: {
    borderLeftColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}10`,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  activeOptionText: {
    color: theme.colors.primary,
  },
  optionDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  exampleContainer: {
    marginBottom: theme.spacing.l,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  exampleDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.m,
  },
  chartContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    alignItems: 'center',
    marginBottom: theme.spacing.m,
    height: 350,
  },
  codeContainer: {
    backgroundColor: '#2d2d2d',
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
  },
  codeTitle: {
    color: 'white',
    fontSize: 14,
    marginBottom: theme.spacing.xs,
  },
  code: {
    color: '#E6E6E6',
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
  },
  docsContainer: {
    marginBottom: theme.spacing.xl,
  },
  docsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  featureContainer: {
    marginBottom: theme.spacing.m,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginLeft: theme.spacing.s,
  },
  featureDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: 30,
  },
  githubLink: {
    fontSize: 14,
    color: theme.colors.primary,
    marginTop: theme.spacing.m,
    textAlign: 'center',
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 5,
    padding: 8,
    width: 120,
  },
  tooltipText: {
    color: 'white',
    fontSize: 12,
  }
}); 