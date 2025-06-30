import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles } from '../styles/commonStyles';
import { COLORS, GLASS_STYLES } from '../constants/config';
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
      <View style={[styles.errorCard, GLASS_STYLES.card]}>
        <LinearGradient
          colors={['rgba(255,107,107,0.3)', 'rgba(255,107,107,0.1)']}
          style={styles.iconContainer}
        >
          <Ionicons name="cloud-offline" size={56} color={COLORS.white} />
        </LinearGradient>
        
        <Text style={styles.errorTitle}>Bağlantı Sorunu</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        
        <View style={styles.buttonContainer}>
          {onRetry && (
            <TouchableOpacity 
              style={[styles.actionButton, GLASS_STYLES.button]} 
              onPress={onRetry}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                style={styles.buttonGradient}
              >
                <Ionicons name="refresh" size={20} color={COLORS.white} />
                <Text style={styles.buttonText}>Tekrar Dene</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          
          {onCitySelect && (
            <TouchableOpacity 
              style={[styles.actionButton, GLASS_STYLES.button]} 
              onPress={onCitySelect}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                style={styles.buttonGradient}
              >
                <Ionicons name="location" size={20} color={COLORS.white} />
                <Text style={styles.buttonText}>Şehir Seç</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorCard: {
    alignItems: 'center',
    padding: 40,
    marginHorizontal: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  errorTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  errorMessage: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    fontWeight: '400',
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '100%',
    gap: 12,
  },
  actionButton: {
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
}); 