import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  TextInput,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { popularCities, worldCities } from '../constants/cities';
import { useCitySearch } from '../hooks/useCitySearch';
import { COLORS, FONT_SIZES, SPACING } from '../constants/config';

/**
 * Şehir seçici modal component'i
 */
export const CitySelector = ({ visible, onClose, onCitySelect, onLocationRequest }) => {
  const [activeTab, setActiveTab] = useState('turkey');
  const citySearch = useCitySearch();

  const tabs = [
    { key: 'turkey', label: 'Türkiye', icon: '🇹🇷' },
    { key: 'world', label: 'Dünya', icon: '🌍' },
    { key: 'search', label: 'Arama', icon: '🔍' }
  ];

  const handleCityPress = (city) => {
    onCitySelect(city);
    onClose();
  };

  const handleLocationPress = () => {
    onLocationRequest();
    onClose();
  };

  const renderCityCard = (city) => (
    <TouchableOpacity
      key={`${city.name}-${city.country}`}
      style={styles.cityCard}
      onPress={() => handleCityPress(city)}
    >
      <LinearGradient
        colors={[city.color || '#667eea', '#764ba2']}
        style={styles.cityGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.cityIcon}>{city.icon || '🏙️'}</Text>
        <Text style={styles.cityName}>{city.name}</Text>
        <Text style={styles.cityCountry}>{city.country}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'turkey':
        return (
          <View style={styles.citiesGrid}>
            {popularCities.map(renderCityCard)}
          </View>
        );
      
      case 'world':
        return (
          <View style={styles.citiesGrid}>
            {worldCities.map(renderCityCard)}
          </View>
        );
      
      case 'search':
        return (
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Şehir adı yazın..."
                placeholderTextColor="#999"
                value={citySearch.searchText}
                onChangeText={citySearch.updateSearchText}
                autoCorrect={false}
                autoCapitalize="words"
              />
              {citySearch.loading && (
                <ActivityIndicator size="small" color="#007AFF" style={styles.loadingIcon} />
              )}
            </View>
            
            {citySearch.hasError && (
              <Text style={styles.errorText}>{citySearch.error}</Text>
            )}

            {citySearch.hasResults && (
              <ScrollView style={styles.searchResults} showsVerticalScrollIndicator={false}>
                {citySearch.searchResults.map((city, index) => (
                  <TouchableOpacity
                    key={`${city.name}-${city.country}-${index}`}
                    style={styles.searchResultItem}
                    onPress={() => handleCityPress(city)}
                  >
                    <View style={styles.searchResultContent}>
                      <Text style={styles.searchResultName}>{city.name}</Text>
                      <Text style={styles.searchResultCountry}>
                        {city.state ? `${city.state}, ` : ''}{city.country}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#007AFF" />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {!citySearch.hasResults && !citySearch.loading && citySearch.searchText.length >= 2 && (
              <Text style={styles.noResultsText}>Sonuç bulunamadı</Text>
            )}
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Şehir Seç</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close-circle" size={28} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* GPS Butonu */}
        <View style={styles.gpsSection}>
          <TouchableOpacity style={styles.gpsButton} onPress={handleLocationPress}>
            <LinearGradient
              colors={['#007AFF', '#5856D6']}
              style={styles.gpsGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="locate" size={20} color="#FFFFFF" />
              <Text style={styles.gpsText}>Mevcut Konumumu Kullan</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Tab Bar */}
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.activeTab]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={[styles.tabLabel, activeTab === tab.key && styles.activeTabLabel]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderTabContent()}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingVertical: 15,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  closeButton: {
    padding: 4,
  },
  gpsSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  gpsButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gpsGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  gpsText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingVertical: 20,
  },
  citiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  cityCard: {
    width: '31%',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cityGradient: {
    padding: 12,
    alignItems: 'center',
    minHeight: 75,
    justifyContent: 'center',
  },
  cityIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  cityName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 2,
  },
  cityCountry: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
  },
  loadingIcon: {
    marginLeft: 10,
  },
  searchResults: {
    maxHeight: 400,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  searchResultContent: {
    flex: 1,
  },
  searchResultName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  searchResultCountry: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    fontSize: 14,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 15,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 30,
  },
}); 