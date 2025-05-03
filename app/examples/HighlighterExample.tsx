import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, Alert, Linking } from 'react-native';
import HighlightedText, { Highlight } from 'react-native-highlighter';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../themes/theme';

// Tipos de ejemplos para mostrar
const EXAMPLES = [
  { 
    id: 'basic',
    title: 'Resaltado básico', 
    description: 'Resalta palabras clave con diferentes estilos'
  },
  { 
    id: 'interactive',
    title: 'Resaltado interactivo', 
    description: 'Permite interactuar con las palabras clave resaltadas'
  },
  { 
    id: 'social',
    title: 'Elementos sociales', 
    description: 'Detecta hashtags, menciones, emails y enlaces'
  },
  { 
    id: 'combined',
    title: 'Ejemplo completo', 
    description: 'Combina todas las características en un solo ejemplo'
  }
];

// Textos de ejemplo
const SAMPLE_TEXTS = {
  basic: 'React Native combina las mejores partes del desarrollo nativo con React, una biblioteca de JavaScript para construir interfaces de usuario. Puedes usar React Native hoy mismo en tus proyectos existentes de Android e iOS o crear una aplicación completamente nueva desde cero.',
  
  interactive: 'Toca en cualquiera de las palabras clave resaltadas para ver una acción. React Native permite interactividad completa con gestos. TypeScript mejora la experiencia de desarrollo y Expo facilita la creación de aplicaciones.',
  
  social: 'Síguenos en @reactnative para las últimas actualizaciones.\nContacta a soporte@ejemplo.com si tienes preguntas.\nVisita https://reactnative.dev para la documentación oficial.\n#reactnative #javascript #mobile #desarrollo',
  
  combined: 'React Native es un framework poderoso para desarrollo móvil multiplataforma.\n\nSíguenos en @expo y @reactnative para novedades.\nVisita https://expo.dev o contacta a hello@expo.io\n\n#reactnative #typescript #desarrollo #expo'
};

export default function HighlighterExample() {
  const [activeExample, setActiveExample] = useState('basic');
  
  // Configuración para resaltado básico
  const basicMainKeywords = new Highlight({
    keywords: ['React Native', 'interfaces de usuario'],
    style: { color: theme.colors.primary, fontWeight: 'bold' },
  });
  
  const basicExtraKeywords = new Highlight({
    keywords: ['desarrollo nativo', 'Android', 'iOS'],
    style: { backgroundColor: '#F7DB6A' },
  });
  
  // Configuración para resaltado interactivo
  const interactiveKeywords = new Highlight({
    keywords: ['React Native', 'TypeScript', 'Expo'],
    style: { color: theme.colors.primary, fontWeight: 'bold' },
    onPress: (keyword) => Alert.alert('Palabra clave', `Has tocado: ${keyword}`),
  });
  
  const interactiveSecondary = new Highlight({
    keywords: ['interactividad', 'gestos', 'desarrollo'],
    style: { backgroundColor: '#F7DB6A' },
    onPress: (keyword) => Alert.alert('Categoría', `Categoría: ${keyword}`),
  });
  
  // Render del ejemplo seleccionado
  const renderExample = () => {
    switch (activeExample) {
      case 'basic':
        return (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Resaltado Básico</Text>
            <Text style={styles.exampleDescription}>
              Este ejemplo muestra cómo resaltar palabras clave en un texto con diferentes estilos.
            </Text>
            <View style={styles.textContainer}>
              <HighlightedText 
                highlights={[basicMainKeywords, basicExtraKeywords]}
                caseSensitive={false}
              >
                {SAMPLE_TEXTS.basic}
              </HighlightedText>
            </View>
            <View style={styles.codeContainer}>
              <Text style={styles.codeTitle}>Código:</Text>
              <Text style={styles.code}>
{`const mainKeywords = new Highlight({
  keywords: ['React Native', 'interfaces de usuario'],
  style: { color: '#6C00FF', fontWeight: 'bold' },
});

const extraKeywords = new Highlight({
  keywords: ['desarrollo nativo', 'Android', 'iOS'],
  style: { backgroundColor: '#F7DB6A' },
});

<HighlightedText 
  highlights={[mainKeywords, extraKeywords]}
  caseSensitive={false}
>
  {texto}
</HighlightedText>`}
              </Text>
            </View>
          </View>
        );
        
      case 'interactive':
        return (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Resaltado Interactivo</Text>
            <Text style={styles.exampleDescription}>
              Este ejemplo demuestra cómo hacer que las palabras resaltadas respondan a interacciones.
              Toca cualquier palabra resaltada para ver un mensaje.
            </Text>
            <View style={styles.textContainer}>
              <HighlightedText 
                highlights={[interactiveKeywords, interactiveSecondary]}
                caseSensitive={false}
              >
                {SAMPLE_TEXTS.interactive}
              </HighlightedText>
            </View>
            <View style={styles.codeContainer}>
              <Text style={styles.codeTitle}>Código:</Text>
              <Text style={styles.code}>
{`const keywords = new Highlight({
  keywords: ['React Native', 'TypeScript', 'Expo'],
  style: { color: '#6C00FF', fontWeight: 'bold' },
  onPress: (keyword) => Alert.alert(
    'Palabra clave', 
    \`Has tocado: \${keyword}\`
  ),
});`}
              </Text>
            </View>
          </View>
        );
        
      case 'social':
        return (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Elementos Sociales</Text>
            <Text style={styles.exampleDescription}>
              Detección automática de hashtags, menciones, emails y enlaces.
              Cada uno puede tener su propio estilo y comportamiento.
            </Text>
            <View style={styles.textContainer}>
              <HighlightedText 
                caseSensitive={false}
                hashtags={true}
                hashtagStyle={styles.hashtagStyle}
                onHashtagPress={(hashtag) => Alert.alert('Hashtag', hashtag)}
                mentions={true}
                mentionStyle={styles.mentionStyle}
                onMentionPress={(mention) => 
                  Alert.alert('Mención', `Abriendo perfil de ${mention}`)
                }
                emails={true}
                emailStyle={styles.emailStyle}
                onEmailPress={(email) => Linking.openURL(`mailto:${email}`)}
                links={true}
                linkStyle={styles.linkStyle}
                onLinkPress={(url) => Linking.openURL(url)}
              >
                {SAMPLE_TEXTS.social}
              </HighlightedText>
            </View>
            <View style={styles.codeContainer}>
              <Text style={styles.codeTitle}>Código:</Text>
              <Text style={styles.code}>
{`<HighlightedText 
  hashtags={true}
  hashtagStyle={{ color: '#F54291' }}
  onHashtagPress={(hashtag) => Alert.alert('Hashtag', hashtag)}
  mentions={true}
  mentionStyle={{ color: '#379237', fontWeight: 'bold' }}
  emails={true}
  emailStyle={{ color: '#FF6D28' }}
  links={true}
  linkStyle={{ color: '#0077CC', textDecorationLine: 'underline' }}
>
  {texto}
</HighlightedText>`}
              </Text>
            </View>
          </View>
        );
        
      case 'combined':
        // Configuración para el ejemplo combinado
        const combinedKeywords = new Highlight({
          keywords: ['React Native', 'desarrollo móvil', 'multiplataforma'],
          style: { color: theme.colors.primary, fontWeight: 'bold' },
          onPress: (keyword) => Alert.alert('Palabra clave', `Has tocado: ${keyword}`),
        });
        
        return (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Ejemplo Completo</Text>
            <Text style={styles.exampleDescription}>
              Este ejemplo combina todas las características de la librería:
              resaltado de palabras clave, interactividad, hashtags, menciones, emails y enlaces.
            </Text>
            <View style={styles.textContainer}>
              <HighlightedText 
                highlights={[combinedKeywords]}
                caseSensitive={false}
                hashtags={true}
                hashtagStyle={styles.hashtagStyle}
                onHashtagPress={(hashtag) => Alert.alert('Hashtag', hashtag)}
                mentions={true}
                mentionStyle={styles.mentionStyle}
                onMentionPress={(mention) => 
                  Alert.alert('Mención', `Abriendo perfil de ${mention}`)
                }
                emails={true}
                emailStyle={styles.emailStyle}
                onEmailPress={(email) => Linking.openURL(`mailto:${email}`)}
                links={true}
                linkStyle={styles.linkStyle}
                onLinkPress={(url) => Linking.openURL(url)}
              >
                {SAMPLE_TEXTS.combined}
              </HighlightedText>
            </View>
          </View>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>React Native Highlighter</Text>
      <Text style={styles.description}>
        Biblioteca para resaltar contenido específico en texto y permitir interacción
        con palabras clave, hashtags, menciones, emails y enlaces.
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
        <Text style={styles.docsTitle}>Referencia rápida</Text>
        
        <View style={styles.featureContainer}>
          <View style={styles.featureHeader}>
            <Ionicons name="color-palette-outline" size={22} color={theme.colors.primary} />
            <Text style={styles.featureTitle}>Estilos personalizables</Text>
          </View>
          <Text style={styles.featureDescription}>
            Define estilos para diferentes tipos de resaltado, desde colores y fondos hasta tipografías.
          </Text>
        </View>
        
        <View style={styles.featureContainer}>
          <View style={styles.featureHeader}>
            <Ionicons name="finger-print-outline" size={22} color={theme.colors.primary} />
            <Text style={styles.featureTitle}>Interactividad completa</Text>
          </View>
          <Text style={styles.featureDescription}>
            Asigna funciones onPress a cada tipo de resaltado para manejar interacciones.
          </Text>
        </View>
        
        <View style={styles.featureContainer}>
          <View style={styles.featureHeader}>
            <Ionicons name="at-outline" size={22} color={theme.colors.primary} />
            <Text style={styles.featureTitle}>Detección social</Text>
          </View>
          <Text style={styles.featureDescription}>
            Reconoce automáticamente hashtags (#tema), menciones (@usuario), emails y URLs.
          </Text>
        </View>
        
        <Text style={styles.githubLink}>
          Ver más en GitHub: farhoudshapouran/react-native-highlighter
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
  textContainer: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.m,
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
  // Estilos para elementos sociales
  hashtagStyle: { 
    color: '#F54291',
    fontWeight: '600',
  },
  mentionStyle: { 
    color: '#379237', 
    fontWeight: '600',
  },
  emailStyle: { 
    color: '#FF6D28', 
    fontWeight: '600',
  },
  linkStyle: { 
    color: '#0077CC', 
    textDecorationLine: 'underline',
  },
  // Documentación adicional
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
}); 