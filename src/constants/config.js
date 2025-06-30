// API Konfigürasyonu
export const API_CONFIG = {
    OPENWEATHER_API_KEY: process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY,
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    GEO_URL: 'http://api.openweathermap.org/geo/1.0',
    DEFAULT_UNITS: 'metric',
    DEFAULT_LANGUAGE: 'tr',
    SEARCH_LIMIT: 10,
    REQUEST_TIMEOUT: 10000,
  };

// Uygulama Sabitleri
export const APP_CONFIG = {
  SEARCH_MIN_LENGTH: 2,
  REFRESH_TIMEOUT: 2000,
  ANIMATION_DURATION: 300,
  MODAL_ANIMATION_TYPE: 'slide',
};

// Hava Durumu İkon Eşlemeleri
export const WEATHER_ICONS = {
  '01d': 'sunny',
  '01n': 'moon',
  '02d': 'partly-sunny',
  '02n': 'cloudy-night',
  '03d': 'cloudy',
  '03n': 'cloudy',
  '04d': 'cloudy',
  '04n': 'cloudy',
  '09d': 'rainy',
  '09n': 'rainy',
  '10d': 'rainy',
  '10n': 'rainy',
  '11d': 'thunderstorm',
  '11n': 'thunderstorm',
  '13d': 'snow',
  '13n': 'snow',
  '50d': 'cloudy',
  '50n': 'cloudy',
};

// Modern Renk Paleti
export const COLORS = {
  primary: '#667eea',
  secondary: '#764ba2',
  accent: '#FF6B6B',
  background: '#F8F9FA',
  white: '#FFFFFF',
  black: '#1C1C1E',
  glass: 'rgba(255, 255, 255, 0.15)',
  glassStrong: 'rgba(255, 255, 255, 0.25)',
  glassDark: 'rgba(0, 0, 0, 0.1)',
  gray: {
    light: '#F8F9FA',
    medium: '#6C757D',
    dark: '#212529',
  },
  text: {
    primary: '#212529',
    secondary: '#6C757D',
    light: '#ADB5BD',
    inverse: '#FFFFFF',
  },
  shadow: {
    color: '#000000',
    opacity: 0.08,
  },
};

// Modern Gradient Koleksiyonu
export const APP_GRADIENTS = {
  defaultWeather: ['#667eea', '#764ba2'],
  sunny: ['#FEB692', '#EA5455'],
  clearSky: ['#74b9ff', '#0984e3'],
  cloudy: ['#74b9ff', '#636e72'],
  rainy: ['#00cec9', '#6c5ce7'],
  night: ['#2d3436', '#636e72'],
  snow: ['#ddd6f3', '#faaca8'],
  thunderstorm: ['#2d3436', '#74b9ff'],
  mist: ['#a8edea', '#fed6e3'],
  sunrise: ['#ff9a9e', '#fecfef'],
  sunset: ['#ffecd2', '#fcb69f'],
  aurora: ['#667eea', '#764ba2', '#ffd89b'],
  ocean: ['#2E3192', '#1BFFFF'],
  forest: ['#11998e', '#38ef7d'],
  desert: ['#f093fb', '#f5576c'],
  glacier: ['#a8edea', '#fed6e3'],
};

// Modern Glassmorphism Stili
export const GLASS_STYLES = {
  card: {
    backgroundColor: COLORS.glass,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  cardStrong: {
    backgroundColor: COLORS.glassStrong,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 12,
  },
  button: {
    backgroundColor: COLORS.glass,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
}; 