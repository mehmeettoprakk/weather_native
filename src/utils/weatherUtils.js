import { WEATHER_ICONS } from '../constants/config';

/**
 * Hava durumu ikon kodunu Ionicons ikonuna çevir
 * @param {string} iconCode - OpenWeather ikon kodu
 * @returns {string} Ionicons ikon adı
 */
export const getWeatherIcon = (iconCode) => {
  return WEATHER_ICONS[iconCode] || 'cloudy';
};

/**
 * Timestamp'i saat formatına çevir
 * @param {number} timestamp - Unix timestamp
 * @param {string} locale - Yerel ayar (varsayılan: 'tr-TR')
 * @returns {string} Formatlanmış saat
 */
export const formatTime = (timestamp, locale = 'tr-TR') => {
  return new Date(timestamp * 1000).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Timestamp'i tarih formatına çevir
 * @param {number} timestamp - Unix timestamp
 * @param {string} locale - Yerel ayar (varsayılan: 'tr-TR')
 * @returns {string} Formatlanmış tarih
 */
export const formatDate = (timestamp, locale = 'tr-TR') => {
  return new Date(timestamp * 1000).toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Rüzgar hızını m/s'den km/h'e çevir
 * @param {number} speed - m/s cinsinden hız
 * @returns {number} km/h cinsinden hız
 */
export const convertWindSpeed = (speed) => {
  return Math.round(speed * 3.6);
};

/**
 * Görüş mesafesini metre'den kilometre'ye çevir
 * @param {number} visibility - Metre cinsinden görüş
 * @returns {string} Formatlanmış görüş mesafesi
 */
export const formatVisibility = (visibility) => {
  if (!visibility) return 'N/A';
  return `${(visibility / 1000).toFixed(1)} km`;
};

/**
 * Sıcaklığı yuvarla
 * @param {number} temp - Sıcaklık değeri
 * @returns {number} Yuvarlanmış sıcaklık
 */
export const roundTemperature = (temp) => {
  return Math.round(temp);
};

/**
 * Hava durumu açıklamasını büyük harfle başlat
 * @param {string} description - Hava durumu açıklaması
 * @returns {string} Formatlanmış açıklama
 */
export const capitalizeDescription = (description) => {
  return description.charAt(0).toUpperCase() + description.slice(1);
};

/**
 * Basınç değerini formatla
 * @param {number} pressure - Basınç değeri (hPa)
 * @returns {string} Formatlanmış basınç
 */
export const formatPressure = (pressure) => {
  return `${pressure} hPa`;
};

/**
 * Nem oranını formatla
 * @param {number} humidity - Nem oranı
 * @returns {string} Formatlanmış nem oranı
 */
export const formatHumidity = (humidity) => {
  return `${humidity}%`;
};

/**
 * Rüzgar yönünü açıklayıcı metne çevir
 * @param {number} deg - Rüzgar yönü (derece)
 * @returns {string} Rüzgar yönü açıklaması
 */
export const getWindDirection = (deg) => {
  if (deg === undefined || deg === null) return 'N/A';
  
  const directions = [
    'Kuzey', 'Kuzey-Doğu', 'Doğu', 'Güney-Doğu',
    'Güney', 'Güney-Batı', 'Batı', 'Kuzey-Batı'
  ];
  
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

/**
 * UV indeksini açıklayıcı metne çevir
 * @param {number} uvi - UV indeksi
 * @returns {Object} UV açıklaması ve rengi
 */
export const getUVDescription = (uvi) => {
  if (uvi <= 2) return { text: 'Düşük', color: '#4CAF50' };
  if (uvi <= 5) return { text: 'Orta', color: '#FF9800' };
  if (uvi <= 7) return { text: 'Yüksek', color: '#FF5722' };
  if (uvi <= 10) return { text: 'Çok Yüksek', color: '#9C27B0' };
  return { text: 'Aşırı', color: '#E91E63' };
};

/**
 * Hava kalitesi indeksini açıklayıcı metne çevir
 * @param {number} aqi - Hava kalitesi indeksi
 * @returns {Object} Hava kalitesi açıklaması ve rengi
 */
export const getAirQualityDescription = (aqi) => {
  switch (aqi) {
    case 1: return { text: 'İyi', color: '#4CAF50' };
    case 2: return { text: 'Orta', color: '#8BC34A' };
    case 3: return { text: 'Hassas Gruplar İçin Zararlı', color: '#FF9800' };
    case 4: return { text: 'Zararlı', color: '#FF5722' };
    case 5: return { text: 'Çok Zararlı', color: '#9C27B0' };
    default: return { text: 'N/A', color: '#9E9E9E' };
  }
}; 