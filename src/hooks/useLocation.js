import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { locationService } from '../services/locationService';

/**
 * Konum yönetimi için custom hook
 * @returns {Object} Location state ve fonksiyonları
 */
export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('undetermined');

  /**
   * Konum izni kontrol et ve iste
   */
  const requestPermission = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const granted = await locationService.requestLocationPermission();
      const status = granted ? 'granted' : 'denied';
      setPermissionStatus(status);
      return granted;
    } catch (err) {
      const errorMessage = 'Konum izni alınamadı';
      setError(errorMessage);
      Alert.alert('Hata', errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Mevcut konumu al
   */
  const getCurrentLocation = useCallback(async (options = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Önce izin kontrol et
      const permissionGranted = await requestPermission();
      if (!permissionGranted) {
        throw new Error('Konum izni gerekli');
      }

      // Konum servisinin açık olup olmadığını kontrol et
      const serviceEnabled = await locationService.isLocationServiceEnabled();
      if (!serviceEnabled) {
        throw new Error('Konum servisi kapalı. Lütfen GPS\'i açın.');
      }

      const locationData = await locationService.getCurrentLocation(options);
      setLocation(locationData);
      return locationData;
    } catch (err) {
      const errorMessage = err.message || 'Konum alınamadı';
      setError(errorMessage);
      
      // Kritik olmayan hataları kullanıcıya gösterme
      if (!errorMessage.includes('GPS') && !errorMessage.includes('izin')) {
        Alert.alert('Konum Hatası', errorMessage, [
          { text: 'Tamam', style: 'default' }
        ]);
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  }, [requestPermission]);

  /**
   * Son bilinen konumu al
   */
  const getLastKnownLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const locationData = await locationService.getLastKnownLocation();
      if (locationData) {
        setLocation(locationData);
      }
      return locationData;
    } catch (err) {
      const errorMessage = 'Son konum alınamadı';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * İzin durumunu kontrol et
   */
  const checkPermissionStatus = useCallback(async () => {
    try {
      const status = await locationService.getLocationPermissionStatus();
      setPermissionStatus(status);
      return status;
    } catch (err) {
      setError('İzin durumu kontrol edilemedi');
      return 'undetermined';
    }
  }, []);

  /**
   * Konumu temizle
   */
  const clearLocation = useCallback(() => {
    setLocation(null);
    setError(null);
  }, []);

  /**
   * Error'u temizle
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * İzin durumunu önerilen aksiyon ile birlikte al
   */
  const getPermissionInfo = useCallback(() => {
    switch (permissionStatus) {
      case 'granted':
        return {
          status: 'granted',
          message: 'Konum izni verildi',
          canRequest: false,
          needsAction: false,
        };
      case 'denied':
        return {
          status: 'denied',
          message: 'Konum izni reddedildi. Ayarlardan izin verebilirsiniz.',
          canRequest: false,
          needsAction: true,
        };
      case 'undetermined':
        return {
          status: 'undetermined',
          message: 'Konum izni bekleniyor',
          canRequest: true,
          needsAction: true,
        };
      default:
        return {
          status: 'unknown',
          message: 'Konum izin durumu bilinmiyor',
          canRequest: true,
          needsAction: true,
        };
    }
  }, [permissionStatus]);

  return {
    // State
    location,
    loading,
    error,
    permissionStatus,
    
    // Actions
    requestPermission,
    getCurrentLocation,
    getLastKnownLocation,
    checkPermissionStatus,
    clearLocation,
    clearError,
    
    // Computed values
    hasLocation: !!location,
    hasError: !!error,
    hasPermission: permissionStatus === 'granted',
    permissionInfo: getPermissionInfo(),
  };
}; 