import axios from 'axios';
import { API_CONFIG } from '../constants/config';

// Axios instance oluştur
const weatherApiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.REQUEST_TIMEOUT,
  params: {
    appid: API_CONFIG.OPENWEATHER_API_KEY,
    units: API_CONFIG.DEFAULT_UNITS,
    lang: API_CONFIG.DEFAULT_LANGUAGE,
  },
});

const geoApiClient = axios.create({
  baseURL: API_CONFIG.GEO_URL,
  timeout: API_CONFIG.REQUEST_TIMEOUT,
  params: {
    appid: API_CONFIG.OPENWEATHER_API_KEY,
  },
});

// Hata yönetimi
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    switch (status) {
      case 401:
        throw new Error('API anahtarı geçersiz. Lütfen API anahtarınızı kontrol edin.');
      case 404:
        throw new Error('Şehir bulunamadı.');
      case 429:
        throw new Error('Çok fazla istek gönderildi. Lütfen bekleyin.');
      case 500:
        throw new Error('Server hatası. Lütfen daha sonra tekrar deneyin.');
      default:
        throw new Error(data?.message || 'Bilinmeyen bir hata oluştu.');
    }
  } else if (error.request) {
    // Network error
    throw new Error('İnternet bağlantınızı kontrol edin.');
  } else {
    // Other error
    throw new Error('Beklenmeyen bir hata oluştu.');
  }
};

// Weather API Services
export const weatherService = {
  /**
   * Koordinatlara göre hava durumu al
   * @param {number} lat - Enlem
   * @param {number} lon - Boylam
   * @returns {Promise<Object>} Hava durumu verisi
   */
  async getWeatherByCoords(lat, lon) {
    try {
      const response = await weatherApiClient.get('/weather', {
        params: { lat, lon }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Şehir adına göre hava durumu al
   * @param {string} cityName - Şehir adı
   * @returns {Promise<Object>} Hava durumu verisi
   */
  async getWeatherByCity(cityName) {
    try {
      const response = await weatherApiClient.get('/weather', {
        params: { q: cityName }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * 5 günlük hava durumu tahmini al
   * @param {number} lat - Enlem
   * @param {number} lon - Boylam
   * @returns {Promise<Object>} 5 günlük tahmin verisi
   */
  async getForecast(lat, lon) {
    try {
      const response = await weatherApiClient.get('/forecast', {
        params: { lat, lon }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Geocoding API Services
export const geocodingService = {
  /**
   * Şehir arama
   * @param {string} query - Arama terimi
   * @param {number} limit - Sonuç limiti
   * @returns {Promise<Array>} Şehir listesi
   */
  async searchCities(query, limit = API_CONFIG.SEARCH_LIMIT) {
    try {
      const response = await geoApiClient.get('/direct', {
        params: { q: query, limit }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Koordinatlara göre şehir adı al (Reverse geocoding)
   * @param {number} lat - Enlem
   * @param {number} lon - Boylam
   * @returns {Promise<Array>} Şehir bilgisi
   */
  async getCityByCoords(lat, lon) {
    try {
      const response = await geoApiClient.get('/reverse', {
        params: { lat, lon, limit: 1 }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
}; 