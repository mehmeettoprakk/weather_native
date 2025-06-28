import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles } from '../styles/commonStyles';
import { COLORS } from '../constants/config';
import { StyleSheet } from 'react-native';

/**
 * Hata ekranı component'i
 * @param {Object} props - Component props
 * @param {string} props.error - Hata mesajı
 * @param {Function} props.onRetry - Tekrar deneme callback'i
 * @param {Function} props.onCitySelect - Şehir seçimi callback'i
 * @returns {JSX.Element} Error screen
 */
export const ErrorScreen = ({ 
  error = 'Bilinmeyen bir hata oluştu', 
  onRetry, 
  onCitySelect 
}) => {
  return (
    <View style={commonStyles.loadingContainer}>
      <Ionicons name="cloud-offline" size={80} color={COLORS.white} />
      <Text style={styles.errorTitle}>Hata Oluştu</Text>
      <Text style={styles.errorMessage}>{error}</Text>
      
      <View style={styles.buttonContainer}>
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Ionicons name="refresh" size={20} color={COLORS.white} />
            <Text style={styles.buttonText}>Tekrar Dene</Text>
          </TouchableOpacity>
        )}
        
        {onCitySelect && (
          <TouchableOpacity style={styles.cityButton} onPress={onCitySelect}>
            <Ionicons name="location" size={20} color={COLORS.white} />
            <Text style={styles.buttonText}>Şehir Seç</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: '#E6F2FF',
    textAlign: 'center',
    marginBottom: 32,
    marginHorizontal: 40,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  cityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 