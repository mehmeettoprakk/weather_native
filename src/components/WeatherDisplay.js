import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  getWeatherIcon, 
  formatTime, 
  roundTemperature,
  formatVisibility,
  convertWindSpeed,
  capitalizeDescription 
} from '../utils/weatherUtils';
import { COLORS, GLASS_STYLES, APP_GRADIENTS } from '../constants/config';
import { StyleSheet } from 'react-native';

/**
 * Hava durumu gösterim component'i
 * @param {Object} props - Component props
 * @param {Object} props.weatherData - Hava durumu verisi
 * @param {Object} props.selectedCity - Seçilen şehir bilgisi
 * @param {Function} props.onCityPress - Şehir seçimi callback'i
 * @param {boolean} props.isManualLocation - Manuel seçim durumu
 * @returns {JSX.Element} Weather display
 */
export const WeatherDisplay = ({ 
  weatherData, 
  selectedCity,
  onCityPress,
  isManualLocation = false 
}) => {
  if (!weatherData) {
    return (
      <View style={styles.noDataContainer}>
        <Ionicons name="cloud-offline" size={64} color={COLORS.white} />
        <Text style={styles.noDataText}>Hava durumu verisi bulunamadı</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onCityPress}>
          <Text style={styles.retryButtonText}>Şehir Seç</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Modern Başlık Kartı */}
      <View style={[styles.headerCard, GLASS_STYLES.card]}>
        <TouchableOpacity 
          style={styles.citySelector}
          onPress={onCityPress}
          activeOpacity={0.8}
        >
          <View style={styles.cityInfo}>
            <Text style={styles.cityName}>
              {selectedCity ? selectedCity.name : weatherData.name}
            </Text>
            <Text style={styles.country}>{weatherData.sys.country}</Text>
          </View>
          <Ionicons name="chevron-down" size={24} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>
      </View>

      {/* Ana Hava Durumu Kartı */}
      <View style={[styles.mainWeatherCard, GLASS_STYLES.cardStrong]}>
        <View style={styles.weatherIconContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']}
            style={styles.iconBackground}
          >
            <Ionicons
              name={getWeatherIcon(weatherData.weather[0].icon)}
              size={100}
              color={COLORS.white}
            />
          </LinearGradient>
        </View>
        
        <View style={styles.mainWeatherInfo}>
          <Text style={styles.temperature}>
            {roundTemperature(weatherData.main.temp)}°
          </Text>
          <Text style={styles.description}>
            {capitalizeDescription(weatherData.weather[0].description)}
          </Text>
          <Text style={styles.feelsLike}>
            Hissedilen {roundTemperature(weatherData.main.feels_like)}°
          </Text>
          
          <View style={styles.tempRange}>
            <Text style={styles.tempRangeText}>
              H:{roundTemperature(weatherData.main.temp_max)}° L:{roundTemperature(weatherData.main.temp_min)}°
            </Text>
          </View>
        </View>
      </View>

      {/* Detay Kartları Grid */}
      <View style={styles.detailsGrid}>
        {/* İlk Satır */}
        <View style={styles.detailRow}>
          <View style={[styles.detailCard, GLASS_STYLES.card]}>
            <Ionicons name="water" size={20} color="#64B5F6" />
            <Text style={styles.detailValue}>{weatherData.main.humidity}%</Text>
            <Text style={styles.detailLabel}>Nem</Text>
          </View>
          <View style={[styles.detailCard, GLASS_STYLES.card]}>
            <Ionicons name="speedometer" size={20} color="#AB47BC" />
            <Text style={styles.detailValue}>{weatherData.main.pressure}</Text>
            <Text style={styles.detailLabel}>hPa</Text>
          </View>
        </View>

        {/* İkinci Satır */}
        <View style={styles.detailRow}>
          <View style={[styles.detailCard, GLASS_STYLES.card]}>
            <Ionicons name="compass" size={20} color="#26C6DA" />
            <Text style={styles.detailValue}>
              {weatherData.wind?.speed ? convertWindSpeed(weatherData.wind.speed) : 'N/A'}
            </Text>
            <Text style={styles.detailLabel}>km/h</Text>
          </View>
          <View style={[styles.detailCard, GLASS_STYLES.card]}>
            <Ionicons name="eye" size={20} color="#66BB6A" />
            <Text style={styles.detailValue}>
              {formatVisibility(weatherData.visibility)}
            </Text>
            <Text style={styles.detailLabel}>Görüş</Text>
          </View>
        </View>
      </View>

      {/* Güneş Durumu Kartı */}
      <View style={[styles.sunContainer, GLASS_STYLES.card]}>
        <LinearGradient
          colors={['rgba(255,193,7,0.3)', 'rgba(255,152,0,0.3)']}
          style={styles.sunGradient}
        >
          <View style={styles.sunItem}>
            <Ionicons name="sunny" size={24} color="#FFD54F" />
            <Text style={styles.sunTime}>{formatTime(weatherData.sys.sunrise)}</Text>
            <Text style={styles.sunLabel}>Gün Doğumu</Text>
          </View>
          
          <View style={styles.sunDivider} />
          
          <View style={styles.sunItem}>
            <Ionicons name="moon" size={24} color="#FFAB40" />
            <Text style={styles.sunTime}>{formatTime(weatherData.sys.sunset)}</Text>
            <Text style={styles.sunLabel}>Gün Batımı</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
  },
  
  // Header Card
  headerCard: {
    marginBottom: 16,
    padding: 16,
  },
  citySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  country: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
    fontWeight: '500',
  },

  // Main Weather Card
  mainWeatherCard: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 18,
  },
  weatherIconContainer: {
    marginBottom: 16,
  },
  iconBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainWeatherInfo: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: 64,
    fontWeight: '100',
    color: COLORS.white,
    marginBottom: 6,
    letterSpacing: -2,
  },
  description: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 10,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  feelsLike: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 14,
    fontWeight: '400',
  },
  tempRange: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 18,
  },
  tempRangeText: {
    fontSize: 15,
    color: COLORS.white,
    fontWeight: '600',
  },

  // Details Grid
  detailsGrid: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailCard: {
    flex: 1,
    alignItems: 'center',
    padding: 14,
    marginHorizontal: 4,
  },
  detailValue: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 2,
  },
  detailLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Sun Container
  sunContainer: {
    overflow: 'hidden',
  },
  sunGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  sunItem: {
    flex: 1,
    alignItems: 'center',
  },
  sunDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },
  sunTime: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '700',
    marginTop: 6,
    marginBottom: 2,
  },
  sunLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // No Data State
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  noDataText: {
    fontSize: 20,
    color: COLORS.white,
    marginTop: 24,
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 28,
  },
  retryButton: {
    ...GLASS_STYLES.button,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 