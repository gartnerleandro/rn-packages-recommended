export const theme = {
  colors: {
    primary: '#6200EE',
    primaryDark: '#3700B3',
    secondary: '#03DAC6',
    secondaryDark: '#018786',
    background: '#F6F8FA',
    card: '#FFFFFF',
    text: '#333333',
    textSecondary: '#666666',
    border: '#E1E4E8',
    notification: '#FF453A',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
  },
  typography: {
    h1: {
      fontSize: 28,
      fontWeight: '700',
    },
    h2: {
      fontSize: 24,
      fontWeight: '700',
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
    },
    body: {
      fontSize: 16,
    },
    caption: {
      fontSize: 14,
    },
    small: {
      fontSize: 12,
    },
  },
  animations: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
};

// Tipo para el tema
export type ThemeType = typeof theme; 