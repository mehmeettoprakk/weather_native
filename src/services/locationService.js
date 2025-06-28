import * as Location from 'expo-location';

// Location Service
export const locationService = {
  /**
   * Konum iznini kontrol et ve iste
   * @returns {Promise<boolean>} İzin durumu
   */
  async requestLocationPermission() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Konum izni alınırken hata:', error);
      return false;
    }
  },

  /**
   * Mevcut konumu al
   * @param {Object} options - Konum seçenekleri
   * @returns {Promise<Object>} Konum verisi
   */
  async getCurrentLocation(options = {}) {
    try {
      const defaultOptions = {
        accuracy: Location.Accuracy.High,
        timeout: 15000,
        maximumAge: 10000,
        ...options,
      };

      const location = await Location.getCurrentPositionAsync(defaultOptions);
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
        timestamp: location.timestamp,
      };
    } catch (error) {
      console.error('Konum alınırken hata:', error);
      throw new Error('Konum bilgisi alınamadı. GPS\'in açık olduğundan emin olun.');
    }
  },

  /**
   * Konum izin durumunu kontrol et
   * @returns {Promise<string>} İzin durumu
   */
  async getLocationPermissionStatus() {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      return status;
    } catch (error) {
      console.error('Konum izin durumu kontrol edilirken hata:', error);
      return 'undetermined';
    }
  },

  /**
   * Konum servisinin etkin olup olmadığını kontrol et
   * @returns {Promise<boolean>} Servis durumu
   */
  async isLocationServiceEnabled() {
    try {
      return await Location.hasServicesEnabledAsync();
    } catch (error) {
      console.error('Konum servisi kontrol edilirken hata:', error);
      return false;
    }
  },

  /**
   * Son bilinen konumu al (varsa)
   * @returns {Promise<Object|null>} Son konum verisi
   */
  async getLastKnownLocation() {
    try {
      const location = await Location.getLastKnownPositionAsync({
        maxAge: 300000, // 5 dakika
        requiredAccuracy: 1000, // 1km
      });
      
      if (location) {
        return {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy,
          timestamp: location.timestamp,
        };
      }
      return null;
    } catch (error) {
      console.error('Son konum alınırken hata:', error);
      return null;
    }
  },
}; 