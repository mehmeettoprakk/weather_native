import { useState, useCallback, useRef } from 'react';
import { geocodingService } from '../services/weatherApi';
import { APP_CONFIG } from '../constants/config';

/**
 * Şehir arama yönetimi için custom hook
 * @returns {Object} City search state ve fonksiyonları
 */
export const useCitySearch = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Debounce için timer ref
  const debounceTimer = useRef(null);

  /**
   * Şehir arama
   */
  const searchCities = useCallback(async (query, limit) => {
    if (!query || query.length < APP_CONFIG.SEARCH_MIN_LENGTH) {
      setSearchResults([]);
      setError(null);
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      const results = await geocodingService.searchCities(query, limit);
      setSearchResults(results);
      return results;
    } catch (err) {
      const errorMessage = err.message || 'Şehir araması başarısız';
      setError(errorMessage);
      setSearchResults([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Debounced şehir arama
   */
  const debouncedSearch = useCallback((query, delay = 500) => {
    // Önceki timer'ı temizle
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Yeni timer oluştur
    debounceTimer.current = setTimeout(() => {
      searchCities(query);
    }, delay);
  }, [searchCities]);

  /**
   * Arama metnini güncelle ve arama yap
   */
  const updateSearchText = useCallback((text) => {
    setSearchText(text);
    
    if (text.length < APP_CONFIG.SEARCH_MIN_LENGTH) {
      setSearchResults([]);
      setError(null);
      return;
    }

    debouncedSearch(text);
  }, [debouncedSearch]);

  /**
   * Arama sonuçlarını temizle
   */
  const clearSearch = useCallback(() => {
    setSearchText('');
    setSearchResults([]);
    setError(null);
    
    // Timer'ı temizle
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
  }, []);

  /**
   * Sadece sonuçları temizle (arama metnini koru)
   */
  const clearResults = useCallback(() => {
    setSearchResults([]);
    setError(null);
  }, []);

  /**
   * Error'u temizle
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Şehir önerilerini filtreleme (opsiyonel)
   */
  const filterResults = useCallback((results, filterFn) => {
    if (!filterFn || typeof filterFn !== 'function') {
      return results;
    }
    return results.filter(filterFn);
  }, []);

  /**
   * Sonuçları sıralama (opsiyonel)
   */
  const sortResults = useCallback((results, sortFn) => {
    if (!sortFn || typeof sortFn !== 'function') {
      return results;
    }
    return [...results].sort(sortFn);
  }, []);

  return {
    // State
    searchText,
    searchResults,
    loading,
    error,
    
    // Actions
    searchCities,
    updateSearchText,
    clearSearch,
    clearResults,
    clearError,
    
    // Utilities
    filterResults,
    sortResults,
    
    // Computed values
    hasResults: searchResults.length > 0,
    hasError: !!error,
    canSearch: searchText.length >= APP_CONFIG.SEARCH_MIN_LENGTH,
    isSearching: loading && searchText.length >= APP_CONFIG.SEARCH_MIN_LENGTH,
  };
}; 