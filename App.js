import React, { useState } from 'react';
import { 
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Text,
  View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

// Clean code imports
import { 
  LoadingScreen, 
  WeatherDisplay, 
  CitySelector, 
  ErrorScreen 
} from './src/components';
import { useWeather } from './src/hooks/useWeather';
import { useLocation } from './src/hooks/useLocation';
import { APP_GRADIENTS } from './src/constants/config';

/**
 * Ana uygulama component'i - Clean Code yapısıyla refactor edildi
 * @returns {JSX.Element} Weather App
 */
export default function App() {
  // State yönetimi
  const [showCityModal, setShowCityModal] = useState(false);
  
  // Custom hooks
  const weather = useWeather();
  const location = useLocation();

  // App başlatıldığında hava durumu verilerini al
  React.useEffect(() => {
    const initializeApp = async () => {
      const coords = await location.getCurrentLocation();
      if (coords) {
        await weather.fetchWeatherByCoords(coords.latitude, coords.longitude);
      }
    };
    
    initializeApp();
  }, []);

  return (
    <LinearGradient 
      colors={APP_GRADIENTS.defaultWeather} 
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="light" />
        
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        >
          {weather.isLoading && !weather.data ? (
            <LoadingScreen message="Hava durumu yükleniyor..." />
          ) : weather.error && !weather.data ? (
            <ErrorScreen 
              error={weather.error}
              onRetry={() => weather.clearError()}
              onCitySelect={() => setShowCityModal(true)}
            />
          ) : weather.data ? (
            <WeatherDisplay
              weatherData={weather.data}
              onCityPress={() => setShowCityModal(true)}
              isManualLocation={weather.isManualLocation}
            />
          ) : (
            <LoadingScreen message="Hava durumu yükleniyor..." />
          )}
        </ScrollView>

        {/* Şehir Seçici Modal */}
        <CitySelector
          visible={showCityModal}
          onClose={() => setShowCityModal(false)}
          onCitySelect={async (city) => {
            await weather.fetchWeatherByCoords(city.lat, city.lon);
            weather.setIsManualLocation(true);
            setShowCityModal(false);
          }}
          onLocationRequest={async () => {
            const coords = await location.getCurrentLocation();
            if (coords) {
              await weather.fetchWeatherByCoords(coords.latitude, coords.longitude);
              weather.setIsManualLocation(false);
            }
          }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
} 