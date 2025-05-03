import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Purchases, { CustomerInfo, PurchasesPackage, LOG_LEVEL, PurchasesOffering } from 'react-native-purchases';
import { PaywallView, PaywallFooterContainerView } from 'react-native-purchases-ui';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../themes/theme';

// Tipos de ejemplos para mostrar
const EXAMPLES = [
  { 
    id: 'configuration',
    title: 'Configuración', 
    description: 'Inicialización y configuración básica'
  },
  { 
    id: 'customer',
    title: 'Datos del cliente', 
    description: 'Información y estado de suscripción'
  },
  { 
    id: 'offerings',
    title: 'Ofertas y paquetes', 
    description: 'Mostrar ofertas y paquetes disponibles'
  },
  { 
    id: 'paywall',
    title: 'Paywall UI', 
    description: 'Interfaz de compra predefinida'
  }
];

// API KEY DE REVENUECAT DE PRUEBA - REEMPLAZAR CON TU PROPIA API KEY EN PRODUCCIÓN
const RC_API_KEY = 'appl_RXXWQPIkCNSbmqdlbXQfUzSyqjJ';

export default function PurchasesExample() {
  const [activeExample, setActiveExample] = useState('configuration');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [offerings, setOfferings] = useState<PurchasesOffering[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Inicializar Purchases al montar el componente
  useEffect(() => {
    // Configurar el SDK
    setupPurchases();
    
    // Limpiar al desmontar
    return () => {
      // No es necesario "destruir" el SDK, pero podríamos hacer limpieza adicional aquí
    };
  }, []);

  // Función para configurar el SDK de Purchases
  const setupPurchases = async () => {
    try {
      setIsLoading(true);
      
      // Configurar el nivel de log
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
      
      // Inicializar el SDK con la API key
      await Purchases.configure({
        apiKey: RC_API_KEY,
        // Configuración adicional
        observerMode: true, // Modo observador para evitar conflictos con otras soluciones de compras
        useAmazon: false, // false para Google Play, true para Amazon
      });
      
      // Generar un ID de usuario único o usar uno existente
      // En una aplicación real, este podría provenir de tu sistema de autenticación
      const generatedId = `user_${Math.random().toString(36).substring(2, 15)}`;
      setUserId(generatedId);
      
      // Identificar al usuario (opcional)
      await Purchases.logIn(generatedId);
      
      // Obtener información del cliente
      const info = await Purchases.getCustomerInfo();
      setCustomerInfo(info);
      
      // Obtener ofertas disponibles
      const offeringsData = await Purchases.getOfferings();
      if (offeringsData.current?.availablePackages) {
        setOfferings(offeringsData.current.availablePackages);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error al configurar Purchases:', error);
      setIsLoading(false);
      Alert.alert('Error', 'No se pudo inicializar el SDK de compras');
    }
  };

  // Realizar una compra de ejemplo
  const handlePurchase = async (packageToPurchase: PurchasesPackage) => {
    try {
      setIsLoading(true);
      
      // Realizar la compra
      const { customerInfo: updatedInfo } = await Purchases.purchasePackage(packageToPurchase);
      
      // Actualizar la información del cliente
      setCustomerInfo(updatedInfo);
      
      setIsLoading(false);
      
      // Verificar el estado de la suscripción
      if (updatedInfo.entitlements.active['premium']) {
        Alert.alert('¡Compra exitosa!', 'Ahora tienes acceso premium.');
      }
    } catch (error: any) {
      setIsLoading(false);
      
      // Manejar los diferentes tipos de errores
      if (!error.userCancelled) {
        Alert.alert('Error', `Ocurrió un error en la compra: ${error.message}`);
      }
    }
  };

  // Restaurar compras
  const handleRestorePurchases = async () => {
    try {
      setIsLoading(true);
      
      // Restaurar compras
      const restoredInfo = await Purchases.restorePurchases();
      
      // Actualizar la información del cliente
      setCustomerInfo(restoredInfo);
      
      setIsLoading(false);
      
      // Verificar si se restauró alguna compra
      if (Object.keys(restoredInfo.entitlements.active).length > 0) {
        Alert.alert('Restauración exitosa', 'Tus compras han sido restauradas.');
      } else {
        Alert.alert('Información', 'No se encontraron compras para restaurar.');
      }
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert('Error', `No se pudieron restaurar las compras: ${error.message}`);
    }
  };

  // Verificar si el usuario tiene un entitlement específico
  const hasEntitlement = (entitlementId: string) => {
    if (!customerInfo) return false;
    return !!customerInfo.entitlements.active[entitlementId];
  };

  // Renderizar el ejemplo seleccionado
  const renderExample = () => {
    switch (activeExample) {
      case 'configuration':
        return (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Configuración de RevenueCat</Text>
            <Text style={styles.exampleDescription}>
              Inicializa el SDK de RevenueCat para gestionar suscripciones y compras dentro de la aplicación.
            </Text>
            
            <View style={styles.codeContainer}>
              <Text style={styles.codeTitle}>Inicialización básica:</Text>
              <Text style={styles.code}>
{`import Purchases from 'react-native-purchases';

// Inicializar el SDK
await Purchases.configure({
  apiKey: 'tu_api_key',
  observerMode: true, // opcional
});

// Identificar a un usuario (opcional)
await Purchases.logIn('user_id');

// Obtener información del usuario
const info = await Purchases.getCustomerInfo();`}
              </Text>
            </View>
            
            <View style={styles.statusContainer}>
              <Text style={styles.statusTitle}>Estado actual:</Text>
              <View style={styles.statusItem}>
                <Ionicons name={isLoading ? "ellipsis-horizontal" : "checkmark-circle"} size={20} color={isLoading ? theme.colors.warning : theme.colors.success} />
                <Text style={styles.statusText}>SDK Inicializado</Text>
              </View>
              
              <View style={styles.statusItem}>
                <Ionicons name={userId ? "checkmark-circle" : "close-circle"} size={20} color={userId ? theme.colors.success : theme.colors.error} />
                <Text style={styles.statusText}>Usuario Identificado: {userId ? userId : 'No'}</Text>
              </View>
            </View>
          </View>
        );
        
      case 'customer':
        return (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Información del Cliente</Text>
            <Text style={styles.exampleDescription}>
              Accede a la información del cliente, incluido el historial de compras y los derechos (entitlements) activos.
            </Text>
            
            {isLoading ? (
              <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
            ) : (
              <>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoTitle}>Detalles del cliente:</Text>
                  
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>ID del cliente:</Text>
                    <Text style={styles.infoValue}>{customerInfo?.originalAppUserId || 'No disponible'}</Text>
                  </View>
                  
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Estado Premium:</Text>
                    <Text style={styles.infoValue}>
                      {hasEntitlement('premium') ? '✅ Activo' : '❌ Inactivo'}
                    </Text>
                  </View>
                  
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Método de compra:</Text>
                    <Text style={styles.infoValue}>{customerInfo?.latestExpirationDate ? 'Store' : 'Ninguno'}</Text>
                  </View>
                </View>
                
                <Pressable 
                  style={styles.button}
                  onPress={handleRestorePurchases}
                >
                  <Text style={styles.buttonText}>Restaurar compras</Text>
                </Pressable>
              </>
            )}
            
            <View style={styles.codeContainer}>
              <Text style={styles.codeTitle}>Código:</Text>
              <Text style={styles.code}>
{`// Obtener información actualizada
const info = await Purchases.getCustomerInfo();

// Verificar un entitlement específico
const hasPremium = !!info.entitlements.active['premium'];

// Restaurar compras
const restoredInfo = await Purchases.restorePurchases();`}
              </Text>
            </View>
          </View>
        );
        
      case 'offerings':
        return (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Ofertas y Paquetes</Text>
            <Text style={styles.exampleDescription}>
              Muestra las ofertas y paquetes configurados en el dashboard de RevenueCat y permite realizar compras.
            </Text>
            
            {isLoading ? (
              <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
            ) : (
              <>
                {offerings && offerings.length > 0 ? (
                  <View style={styles.offeringsContainer}>
                    <Text style={styles.offeringsTitle}>Paquetes disponibles:</Text>
                    
                    {offerings.map((pkg, index) => (
                      <Pressable 
                        key={index} 
                        style={styles.packageItem}
                        onPress={() => handlePurchase(pkg)}
                      >
                        <View>
                          <Text style={styles.packageTitle}>{pkg.product.title}</Text>
                          <Text style={styles.packagePrice}>
                            {pkg.product.priceString} {pkg.packageType === 'MONTHLY' ? '/ mes' : 
                             pkg.packageType === 'ANNUAL' ? '/ año' : ''}
                          </Text>
                          <Text style={styles.packageDescription}>{pkg.product.description}</Text>
                        </View>
                        <Ionicons name="cart-outline" size={24} color={theme.colors.primary} />
                      </Pressable>
                    ))}
                  </View>
                ) : (
                  <View style={styles.noDataContainer}>
                    <Ionicons name="alert-circle-outline" size={48} color={theme.colors.warning} />
                    <Text style={styles.noDataText}>
                      No hay ofertas disponibles.
                      {'\n'}
                      En un entorno real, aquí aparecerían los paquetes configurados en RevenueCat.
                    </Text>
                  </View>
                )}
              </>
            )}
            
            <View style={styles.codeContainer}>
              <Text style={styles.codeTitle}>Código:</Text>
              <Text style={styles.code}>
{`// Obtener ofertas
const offerings = await Purchases.getOfferings();
const packages = offerings.current?.availablePackages;

// Realizar una compra
try {
  const { customerInfo } = await Purchases.purchasePackage(package);
  
  // Verificar entitlement
  if (customerInfo.entitlements.active['premium']) {
    // El usuario tiene acceso premium
  }
} catch (e) {
  if (!e.userCancelled) {
    // Manejar error
  }
}`}
              </Text>
            </View>
          </View>
        );
        
      case 'paywall':
        return (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Paywall UI Predefinido</Text>
            <Text style={styles.exampleDescription}>
              RevenueCat ofrece componentes UI predefinidos para mostrar paywalls atractivos 
              sin necesidad de diseñarlos desde cero.
            </Text>
            
            <View style={styles.paywallPlaceholder}>
              <Text style={styles.paywallNote}>
                Componente PaywallView de ejemplo:
                {'\n'}
                (Requiere configuración en el dashboard de RevenueCat)
              </Text>
              
              {/* 
              En una aplicación real, aquí iría:
              
              <PaywallView
                offering="tu_offering_id"
                customerInfo={customerInfo}
                onPurchaseCompleted={(customerInfo) => {
                  console.log('Compra completada', customerInfo);
                }}
                onPurchaseError={(error) => {
                  console.log('Error en la compra', error);
                }}
                onPurchaseCancelled={() => {
                  console.log('Compra cancelada');
                }}
                onRestoreCompleted={(customerInfo) => {
                  console.log('Restauración completada', customerInfo);
                }}
                onRestoreError={(error) => {
                  console.log('Error en la restauración', error);
                }}
              />
              */}
            </View>
            
            <View style={styles.codeContainer}>
              <Text style={styles.codeTitle}>Código:</Text>
              <Text style={styles.code}>
{`import { PaywallView } from 'react-native-purchases-ui';

// En tu componente:
<PaywallView
  offering="offering_id"
  customerInfo={customerInfo}
  onPurchaseCompleted={(customerInfo) => {
    // Manejar compra exitosa
  }}
  onPurchaseError={(error) => {
    // Manejar error
  }}
  onRestoreCompleted={(customerInfo) => {
    // Manejar restauración exitosa
  }}
/>

// También puedes usar componentes individuales:
<PaywallFooterContainerView
  offering="offering_id"
  customerInfo={customerInfo}
/>`}
              </Text>
            </View>
          </View>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>RevenueCat Purchases</Text>
      <Text style={styles.description}>
        Gestiona suscripciones y compras en la aplicación de forma sencilla. Ofrece herramientas 
        para configurar, vender y analizar compras en iOS, Android y web.
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
            <Ionicons name="card-outline" size={22} color={theme.colors.primary} />
            <Text style={styles.featureTitle}>Gestión de compras</Text>
          </View>
          <Text style={styles.featureDescription}>
            API unificada para gestionar compras en iOS, Android y Amazon.
          </Text>
        </View>
        
        <View style={styles.featureContainer}>
          <View style={styles.featureHeader}>
            <Ionicons name="bar-chart-outline" size={22} color={theme.colors.primary} />
            <Text style={styles.featureTitle}>Análisis avanzados</Text>
          </View>
          <Text style={styles.featureDescription}>
            Métricas detalladas sobre suscripciones, renovaciones y cancelaciones.
          </Text>
        </View>
        
        <View style={styles.featureContainer}>
          <View style={styles.featureHeader}>
            <Ionicons name="code-slash-outline" size={22} color={theme.colors.primary} />
            <Text style={styles.featureTitle}>Sencillez de implementación</Text>
          </View>
          <Text style={styles.featureDescription}>
            Abstrae la complejidad de las diferentes tiendas de aplicaciones.
          </Text>
        </View>
        
        <Text style={styles.docsLink}>
          Documentación oficial: www.revenuecat.com/docs
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
  codeContainer: {
    backgroundColor: '#2d2d2d',
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    marginTop: theme.spacing.m,
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
  statusContainer: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    marginVertical: theme.spacing.m,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: theme.spacing.s,
    color: theme.colors.text,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  statusText: {
    marginLeft: theme.spacing.s,
    fontSize: 14,
    color: theme.colors.text,
  },
  loader: {
    marginVertical: theme.spacing.l,
  },
  infoContainer: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.m,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: theme.spacing.m,
    color: theme.colors.text,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.s,
    paddingBottom: theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  infoLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  offeringsContainer: {
    marginBottom: theme.spacing.m,
  },
  offeringsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: theme.spacing.m,
    color: theme.colors.text,
  },
  packageItem: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.s,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  packagePrice: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  packageDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    maxWidth: '90%',
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.m,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: theme.spacing.m,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  paywallPlaceholder: {
    height: 300,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },
  paywallNote: {
    textAlign: 'center',
    fontSize: 14,
    color: theme.colors.textSecondary,
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
  docsLink: {
    fontSize: 14,
    color: theme.colors.primary,
    marginTop: theme.spacing.m,
    textAlign: 'center',
  },
}); 