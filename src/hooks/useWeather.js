import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { weatherService } from '../services/weatherApi';

/**
 * Hava durumu yönetimi için custom hook
 * @returns {Object} Weather state ve fonksiyonları
 */
export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null); // Seçilen şehir bilgisi
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isManualLocation, setIsManualLocation] = useState(false);

  /**
   * Koordinatlara göre hava durumu al
   */
  const getWeatherByCoords = useCallback(async (lat, lon, isRefresh = false, cityInfo = null) => {
    if (!lat || !lon) {
      setError('Geçersiz koordinatlar');
      return false;
    }

    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await weatherService.getWeatherByCoords(lat, lon);
      setWeatherData(data);
      
      // Eğer şehir bilgisi verilmişse kaydet
      if (cityInfo) {
        setSelectedCity(cityInfo);
      } else {
        // GPS kullanıldığında seçilen şehir bilgisini temizle
        setSelectedCity(null);
      }
      
      return true;
    } catch (err) {
      const errorMessage = err.message || 'Hava durumu verileri alınamadı';
      setError(errorMessage);
      Alert.alert('Hata', errorMessage);
      return false;
    } finally {
      if (isRefresh) {
        setIsRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  /**
   * Şehir adına göre hava durumu al
   */
  const getWeatherByCity = useCallback(async (cityName) => {
    if (!cityName) {
      setError('Şehir adı gerekli');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await weatherService.getWeatherByCity(cityName);
      setWeatherData(data);
      setSelectedCity(null); // Manuel arama için seçilen şehir bilgisini temizle
      return true;
    } catch (err) {
      const errorMessage = err.message || 'Hava durumu verileri alınamadı';
      setError(errorMessage);
      Alert.alert('Hata', errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Mevcut hava durumu verilerini yenile
   */
  const refreshWeather = useCallback(async () => {
    if (!weatherData || !weatherData.coord) {
      setError('Yenilenecek veri bulunamadı');
      return false;
    }

    return await getWeatherByCoords(
      weatherData.coord.lat, 
      weatherData.coord.lon,
      true, // isRefresh = true
      selectedCity // Mevcut seçilen şehir bilgisini koru
    );
  }, [weatherData, selectedCity, getWeatherByCoords]);

  /**
   * Hava durumu verilerini temizle
   */
  const clearWeather = useCallback(() => {
    setWeatherData(null);
    setSelectedCity(null);
    setError(null);
  }, []);

  /**
   * Error'u temizle
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    data: weatherData,
    selectedCity,
    isLoading: loading,
    error,
    isRefreshing,
    isManualLocation,
    
    // Actions
    fetchWeatherByCoords: getWeatherByCoords,
    getWeatherByCoords,
    getWeatherByCity,
    refreshWeather,
    clearWeather,
    clearError,
    setIsManualLocation,
    
    // Computed values
    hasData: !!weatherData,
    hasError: !!error,
  };
}; 