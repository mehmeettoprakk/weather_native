import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { 
  getWeatherIcon, 
  formatTime, 
  roundTemperature,
  formatVisibility,
  convertWindSpeed,
  capitalizeDescription 
} from '../utils/weatherUtils';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants/config';
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
      {/* Başlık */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.citySelector}
          onPress={onCityPress}
        >
          <Text style={styles.cityName}>
            {selectedCity ? selectedCity.name : weatherData.name}
          </Text>
          <Text style={styles.country}>{weatherData.sys.country}</Text>
          {isManualLocation && (
            <Text style={styles.manualLocationText}>Manuel seçim</Text>
          )}
          <Ionicons name="chevron-down" size={20} color="#E6F2FF" style={styles.chevronIcon} />
        </TouchableOpacity>
      </View>

      {/* Ana hava durumu */}
      <View style={styles.mainWeather}>
        <Ionicons
          name={getWeatherIcon(weatherData.weather[0].icon)}
          size={100}
          color={COLORS.white}
        />
        <Text style={styles.temperature}>
          {roundTemperature(weatherData.main.temp)}°C
        </Text>
        <Text style={styles.description}>
          {capitalizeDescription(weatherData.weather[0].description)}
        </Text>
        <Text style={styles.feelsLike}>
          Hissedilen: {roundTemperature(weatherData.main.feels_like)}°C
        </Text>
      </View>

      {/* Detaylar */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="thermometer" size={20} color={COLORS.white} />
            <Text style={styles.detailLabel}>Min/Max</Text>
            <Text style={styles.detailValue}>
              {roundTemperature(weatherData.main.temp_min)}° / {roundTemperature(weatherData.main.temp_max)}°
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="water" size={20} color={COLORS.white} />
            <Text style={styles.detailLabel}>Nem</Text>
            <Text style={styles.detailValue}>{weatherData.main.humidity}%</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="speedometer" size={20} color={COLORS.white} />
            <Text style={styles.detailLabel}>Basınç</Text>
            <Text style={styles.detailValue}>{weatherData.main.pressure} hPa</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="eye" size={20} color={COLORS.white} />
            <Text style={styles.detailLabel}>Görüş</Text>
            <Text style={styles.detailValue}>
              {formatVisibility(weatherData.visibility)}
            </Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="compass" size={20} color={COLORS.white} />
            <Text style={styles.detailLabel}>Rüzgar</Text>
            <Text style={styles.detailValue}>
              {weatherData.wind?.speed ? convertWindSpeed(weatherData.wind.speed) + ' km/h' : 'N/A'}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="cloud" size={20} color={COLORS.white} />
            <Text style={styles.detailLabel}>Bulutluluk</Text>
            <Text style={styles.detailValue}>{weatherData.clouds.all}%</Text>
          </View>
        </View>
      </View>

      {/* Güneş durumu */}
      <View style={styles.sunContainer}>
        <View style={styles.sunItem}>
          <Ionicons name="sunny" size={22} color="#FFD700" />
          <Text style={styles.sunLabel}>Gün Doğumu</Text>
          <Text style={styles.sunTime}>{formatTime(weatherData.sys.sunrise)}</Text>
        </View>
        <View style={styles.sunItem}>
          <Ionicons name="moon" size={22} color="#FFA500" />
          <Text style={styles.sunLabel}>Gün Batımı</Text>
          <Text style={styles.sunTime}>{formatTime(weatherData.sys.sunset)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  citySelector: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    flexDirection: 'column',
  },
  cityName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  country: {
    fontSize: 16,
    color: '#E6F2FF',
    marginTop: 4,
  },
  manualLocationText: {
    fontSize: 10,
    color: '#B3D9FF',
    marginTop: 2,
  },
  chevronIcon: {
    marginTop: 3,
  },
  mainWeather: {
    alignItems: 'center',
    marginBottom: 30,
  },
  temperature: {
    fontSize: 60,
    fontWeight: '200',
    color: COLORS.white,
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    color: '#E6F2FF',
    marginBottom: 8,
  },
  feelsLike: {
    fontSize: 16,
    color: '#B3D9FF',
  },
  detailsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: '#B3D9FF',
    marginTop: 6,
    marginBottom: 3,
  },
  detailValue: {
    fontSize: 15,
    color: COLORS.white,
    fontWeight: '600',
  },
  sunContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 14,
    padding: 14,
  },
  sunItem: {
    alignItems: 'center',
  },
  sunLabel: {
    fontSize: 13,
    color: '#B3D9FF',
    marginTop: 6,
    marginBottom: 3,
  },
  sunTime: {
    fontSize: 15,
    color: COLORS.white,
    fontWeight: '600',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: COLORS.white,
    marginTop: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 