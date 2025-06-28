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

// Renk Paleti
export const COLORS = {
  primary: '#4A90E2',
  secondary: '#667eea',
  background: '#F8F9FA',
  white: '#FFFFFF',
  black: '#1C1C1E',
  gray: {
    light: '#F1F3F4',
    medium: '#666666',
    dark: '#333333',
  },
  text: {
    primary: '#1C1C1E',
    secondary: '#666666',
    light: '#999999',
    inverse: '#FFFFFF',
  },
  shadow: {
    color: '#000000',
    opacity: 0.1,
  },
};

// Gradient Renkleri
export const APP_GRADIENTS = {
  defaultWeather: ['#667eea', '#764ba2'],
  sunny: ['#56CCF2', '#2F80ED'],
  cloudy: ['#bdc3c7', '#2c3e50'],
  rainy: ['#4facfe', '#00f2fe'],
  night: ['#0f0c29', '#24243e'],
  snow: ['#e6ddd4', '#d5dee7'],
  thunderstorm: ['#141e30', '#243b55'],
}; 