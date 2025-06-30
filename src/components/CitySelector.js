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
import { COLORS, GLASS_STYLES, APP_GRADIENTS } from '../constants/config';

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
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[city.color || '#667eea', '#764ba2']}
        style={styles.cityGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cityIconContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
            style={styles.cityIconBackground}
          >
            <Text style={styles.cityIcon}>{city.icon || '🏙️'}</Text>
          </LinearGradient>
        </View>
        
        <View style={styles.cityTextContainer}>
          <Text style={styles.cityName}>{city.name}</Text>
          <View style={styles.cityCountryBadge}>
            <Text style={styles.cityCountry}>{city.country}</Text>
          </View>
        </View>
        
        <View style={styles.cityGlow} />
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
              <Ionicons name="search" size={22} color="rgba(255,255,255,0.7)" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Şehir adı yazın..."
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={citySearch.searchText}
                onChangeText={citySearch.updateSearchText}
                autoCorrect={false}
                autoCapitalize="words"
              />
              {citySearch.loading && (
                <ActivityIndicator size="small" color={COLORS.white} style={styles.loadingIcon} />
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
                    activeOpacity={0.8}
                  >
                    <View style={styles.searchResultFlag}>
                      <Text style={styles.flagEmoji}>{city.countryFlag}</Text>
                    </View>
                    
                    <View style={styles.searchResultContent}>
                      <Text style={styles.searchResultName}>{city.name}</Text>
                      <Text style={styles.searchResultLocation}>
                        {city.countryName}
                      </Text>
                      {city.state && city.state !== city.name && (
                        <Text style={styles.searchResultState}>
                          📍 {city.state}
                        </Text>
                      )}
                    </View>
                    
                    <View style={styles.searchResultArrow}>
                      <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.6)" />
                    </View>
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
      <LinearGradient 
        colors={APP_GRADIENTS.defaultWeather} 
        style={styles.modalBackground}
      >
        <SafeAreaView style={styles.container}>
          {/* Modern Header Card */}
          <View style={[styles.headerCard, GLASS_STYLES.card]}>
            <View style={styles.headerContent}>
              <Text style={styles.title}>Şehir Seç</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
                  style={styles.closeButtonGradient}
                >
                  <Ionicons name="close" size={20} color={COLORS.white} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Modern GPS Button */}
          <View style={styles.gpsSection}>
            <TouchableOpacity 
              style={[styles.gpsButton, GLASS_STYLES.button]} 
              onPress={handleLocationPress}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(0,122,255,0.8)', 'rgba(88,86,214,0.8)']}
                style={styles.gpsGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="locate" size={22} color="#FFFFFF" />
                <Text style={styles.gpsText}>Mevcut Konumumu Kullan</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Modern Tab Bar */}
          <View style={[styles.tabBarCard, GLASS_STYLES.card]}>
            <View style={styles.tabBar}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.key}
                  style={[styles.tab, activeTab === tab.key && styles.activeTab]}
                  onPress={() => setActiveTab(tab.key)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.tabIcon}>{tab.icon}</Text>
                  <Text style={[styles.tabLabel, activeTab === tab.key && styles.activeTabLabel]}>
                    {tab.label}
                  </Text>
                  {activeTab === tab.key && (
                    <LinearGradient
                      colors={['#007AFF', '#5856D6']}
                      style={styles.activeTabIndicator}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Tab Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {renderTabContent()}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  
  // Modern Header
  headerCard: {
    marginTop: 8,
    marginHorizontal: 12,
    marginBottom: 16,
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  closeButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  closeButtonGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Modern GPS Section
  gpsSection: {
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  gpsButton: {
    overflow: 'hidden',
  },
  gpsGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  gpsText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    letterSpacing: 0.3,
  },
  
  // Modern Tab Bar
  tabBarCard: {
    marginHorizontal: 12,
    marginBottom: 16,
    padding: 8,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    position: 'relative',
  },
  activeTab: {
    // Modern active state handled by gradient indicator
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 8,
    right: 8,
    height: 3,
    borderRadius: 2,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  tabLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  activeTabLabel: {
    color: COLORS.white,
    fontWeight: '600',
  },
  
  // Content
  content: {
    flex: 1,
    paddingVertical: 8,
  },
  // Modern City Grid
  citiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  cityCard: {
    width: '31%',
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    ...GLASS_STYLES.card,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  cityGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'space-between',
    position: 'relative',
  },
  cityIconContainer: {
    marginBottom: 8,
  },
  cityIconBackground: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cityIcon: {
    fontSize: 24,
  },
  cityTextContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  cityName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cityCountryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  cityCountry: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cityGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  // Modern Search
  searchContainer: {
    paddingHorizontal: 16,
  },
  searchInputContainer: {
    ...GLASS_STYLES.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '500',
  },
  loadingIcon: {
    marginLeft: 12,
  },
  searchResults: {
    maxHeight: 400,
  },
  searchResultItem: {
    ...GLASS_STYLES.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  searchResultFlag: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  flagEmoji: {
    fontSize: 18,
  },
  searchResultContent: {
    flex: 1,
  },
  searchResultName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  searchResultLocation: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    lineHeight: 18,
  },
  searchResultState: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '400',
    marginTop: 2,
    fontStyle: 'italic',
  },
  searchResultArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginLeft: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  noResultsText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginTop: 32,
    fontWeight: '500',
  },
}); 