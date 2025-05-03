export interface Library {
  id: string;
  name: string;
  description: string;
  url: string;
  icon?: string;
  color: string;
  route: string;
  tags: string[];
}

export const LIBRARIES: Library[] = [
  {
    id: 'lottie',
    name: 'Lottie React Native',
    description: 'Librería que permite renderizar animaciones Adobe After Effects en React Native',
    url: 'https://github.com/lottie-react-native/lottie-react-native',
    color: '#02D9C4',
    route: '/library/lottie',
    tags: ['animación', 'ui']
  },
  {
    id: 'toast',
    name: 'React Native Toast Message',
    description: 'Implementa notificaciones toast elegantes y personalizables',
    url: 'https://github.com/calintamas/react-native-toast-message',
    color: '#FE7456',
    route: '/library/toast',
    tags: ['ui', 'feedback']
  },
  {
    id: 'calendar',
    name: 'React Native Calendar',
    description: 'Componente de calendario flexible y personalizable',
    url: 'https://github.com/wix/react-native-calendars',
    color: '#216E4E',
    route: '/library/calendar',
    tags: ['ui', 'fecha']
  },
  {
    id: 'modal',
    name: 'Gorhom Bottom Sheet',
    description: 'Bottom sheets de alto rendimiento con gestos y animaciones fluidas',
    url: 'https://github.com/gorhom/react-native-bottom-sheet',
    color: '#5A67D8',
    route: '/library/modal',
    tags: ['ui', 'navegación']
  },
  {
    id: 'flashlist',
    name: 'Shopify FlashList',
    description: 'Alternativa a FlatList con mejor rendimiento para listas grandes',
    url: 'https://github.com/Shopify/flash-list',
    color: '#95BF46',
    route: '/library/flashlist',
    tags: ['rendimiento', 'lista']
  },
  {
    id: 'victory',
    name: 'Victory Native',
    description: 'Biblioteca de visualización de datos y gráficos para React Native',
    url: 'https://nearform.com/open-source/victory-native/docs/',
    color: '#CF1322',
    route: '/library/victory',
    tags: ['gráficos', 'datos']
  },
  {
    id: 'contentloader',
    name: 'React Content Loader',
    description: 'Crea esqueletos de carga animados para tus componentes',
    url: 'https://github.com/danilowoz/react-content-loader',
    color: '#7928CA',
    route: '/library/contentloader',
    tags: ['ui', 'carga']
  },
  {
    id: 'gradient',
    name: 'Expo Linear Gradient',
    description: 'Componente para crear degradados lineales',
    url: 'https://docs.expo.dev/versions/latest/sdk/linear-gradient/',
    color: '#F59E0B',
    route: '/library/gradient',
    tags: ['ui', 'estilo']
  },
  {
    id: 'purchases',
    name: 'React Native Purchases',
    description: 'Integración de compras y suscripciones con RevenueCat',
    url: 'https://github.com/RevenueCat/react-native-purchases',
    color: '#047857',
    route: '/library/purchases',
    tags: ['monetización', 'compras']
  },
  {
    id: 'highlighter',
    name: 'React Native Highlighter',
    description: 'Resalta sintaxis de código en tus aplicaciones',
    url: 'https://github.com/react-native-village/react-native-highlighter',
    color: '#4C1D95',
    route: '/library/highlighter',
    tags: ['código', 'ui']
  }
]; 