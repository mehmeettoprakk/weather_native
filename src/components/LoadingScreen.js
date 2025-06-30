import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles } from '../styles/commonStyles';
import { COLORS, GLASS_STYLES } from '../constants/config';

/**
 * Modern loading ekranı component'i
 * @param {Object} props - Component props
 * @param {string} props.message - Loading mesajı
 * @returns {JSX.Element} Loading screen
 */
export const LoadingScreen = ({ message = 'Hava durumu yükleniyor...' }) => {
  return (
    <View style={commonStyles.loadingContainer}>
      <View style={[styles.loadingCard, GLASS_STYLES.card]}>
        <LinearGradient
          colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
          style={styles.iconContainer}
        >
          <Ionicons name="cloud-download" size={48} color={COLORS.white} />
        </LinearGradient>
        
        <ActivityIndicator 
          size="large" 
          color={COLORS.white} 
          style={styles.spinner}
        />
        
        <Text style={styles.loadingText}>{message}</Text>
        
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.dot1]} />
          <View style={[styles.dot, styles.dot2]} />
          <View style={[styles.dot, styles.dot3]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingCard: {
    alignItems: 'center',
    padding: 40,
    marginHorizontal: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  spinner: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginHorizontal: 4,
  },
  dot1: {
    backgroundColor: '#64B5F6',
  },
  dot2: {
    backgroundColor: '#AB47BC',
  },
  dot3: {
    backgroundColor: '#26C6DA',
  },
}); 