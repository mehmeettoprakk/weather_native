import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { COLORS } from '../constants/config';

/**
 * Loading ekranı component'i
 * @param {Object} props - Component props
 * @param {string} props.message - Loading mesajı
 * @returns {JSX.Element} Loading screen
 */
export const LoadingScreen = ({ message = 'Hava durumu yükleniyor...' }) => {
  return (
    <View style={commonStyles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.white} />
      <Text style={commonStyles.loadingText}>{message}</Text>
    </View>
  );
}; 