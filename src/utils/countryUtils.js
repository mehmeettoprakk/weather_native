// Ülke kodu -> Ülke ismi ve bayrak mapping'i
export const COUNTRY_INFO = {
  // Avrupa
  'TR': { name: 'Türkiye', flag: '🇹🇷' },
  'DE': { name: 'Almanya', flag: '🇩🇪' },
  'FR': { name: 'Fransa', flag: '🇫🇷' },
  'IT': { name: 'İtalya', flag: '🇮🇹' },
  'ES': { name: 'İspanya', flag: '🇪🇸' },
  'GB': { name: 'İngiltere', flag: '🇬🇧' },
  'NL': { name: 'Hollanda', flag: '🇳🇱' },
  'AT': { name: 'Avusturya', flag: '🇦🇹' },
  'CH': { name: 'İsviçre', flag: '🇨🇭' },
  'SE': { name: 'İsveç', flag: '🇸🇪' },
  'NO': { name: 'Norveç', flag: '🇳🇴' },
  'DK': { name: 'Danimarka', flag: '🇩🇰' },
  'FI': { name: 'Finlandiya', flag: '🇫🇮' },
  'BE': { name: 'Belçika', flag: '🇧🇪' },
  'PT': { name: 'Portekiz', flag: '🇵🇹' },
  'GR': { name: 'Yunanistan', flag: '🇬🇷' },
  'PL': { name: 'Polonya', flag: '🇵🇱' },
  'CZ': { name: 'Çek Cumhuriyeti', flag: '🇨🇿' },
  'HU': { name: 'Macaristan', flag: '🇭🇺' },
  'RO': { name: 'Romanya', flag: '🇷🇴' },
  'BG': { name: 'Bulgaristan', flag: '🇧🇬' },
  'HR': { name: 'Hırvatistan', flag: '🇭🇷' },
  'RS': { name: 'Sırbistan', flag: '🇷🇸' },
  'RU': { name: 'Rusya', flag: '🇷🇺' },
  'UA': { name: 'Ukrayna', flag: '🇺🇦' },
  
  // Amerika
  'US': { name: 'Amerika Birleşik Devletleri', flag: '🇺🇸' },
  'CA': { name: 'Kanada', flag: '🇨🇦' },
  'MX': { name: 'Meksika', flag: '🇲🇽' },
  'BR': { name: 'Brezilya', flag: '🇧🇷' },
  'AR': { name: 'Arjantin', flag: '🇦🇷' },
  'CL': { name: 'Şili', flag: '🇨🇱' },
  'CO': { name: 'Kolombiya', flag: '🇨🇴' },
  'PE': { name: 'Peru', flag: '🇵🇪' },
  
  // Asya
  'JP': { name: 'Japonya', flag: '🇯🇵' },
  'KR': { name: 'Güney Kore', flag: '🇰🇷' },
  'CN': { name: 'Çin', flag: '🇨🇳' },
  'IN': { name: 'Hindistan', flag: '🇮🇳' },
  'TH': { name: 'Tayland', flag: '🇹🇭' },
  'VN': { name: 'Vietnam', flag: '🇻🇳' },
  'MY': { name: 'Malezya', flag: '🇲🇾' },
  'SG': { name: 'Singapur', flag: '🇸🇬' },
  'ID': { name: 'Endonezya', flag: '🇮🇩' },
  'PH': { name: 'Filipinler', flag: '🇵🇭' },
  'PK': { name: 'Pakistan', flag: '🇵🇰' },
  'BD': { name: 'Bangladeş', flag: '🇧🇩' },
  'IR': { name: 'İran', flag: '🇮🇷' },
  'IQ': { name: 'Irak', flag: '🇮🇶' },
  'IL': { name: 'İsrail', flag: '🇮🇱' },
  'SA': { name: 'Suudi Arabistan', flag: '🇸🇦' },
  'AE': { name: 'Birleşik Arap Emirlikleri', flag: '🇦🇪' },
  'QA': { name: 'Katar', flag: '🇶🇦' },
  'KW': { name: 'Kuveyt', flag: '🇰🇼' },
  
  // Afrika
  'EG': { name: 'Mısır', flag: '🇪🇬' },
  'ZA': { name: 'Güney Afrika', flag: '🇿🇦' },
  'NG': { name: 'Nijerya', flag: '🇳🇬' },
  'KE': { name: 'Kenya', flag: '🇰🇪' },
  'MA': { name: 'Fas', flag: '🇲🇦' },
  'TN': { name: 'Tunus', flag: '🇹🇳' },
  'DZ': { name: 'Cezayir', flag: '🇩🇿' },
  'LY': { name: 'Libya', flag: '🇱🇾' },
  'ET': { name: 'Etiyopya', flag: '🇪🇹' },
  'GH': { name: 'Gana', flag: '🇬🇭' },
  
  // Okyanusya
  'AU': { name: 'Avustralya', flag: '🇦🇺' },
  'NZ': { name: 'Yeni Zelanda', flag: '🇳🇿' },
  'FJ': { name: 'Fiji', flag: '🇫🇯' },
};

/**
 * Ülke kodunu tam ülke ismine çevirir
 * @param {string} countryCode - Ülke kodu (örn: 'TR', 'US')
 * @returns {string} Ülke ismi (örn: 'Türkiye', 'Amerika Birleşik Devletleri')
 */
export const getCountryName = (countryCode) => {
  if (!countryCode) return '';
  
  const upperCode = countryCode.toUpperCase();
  return COUNTRY_INFO[upperCode]?.name || countryCode;
};

/**
 * Ülke koduna göre bayrak emojisini döndürür
 * @param {string} countryCode - Ülke kodu (örn: 'TR', 'US')
 * @returns {string} Bayrak emojisi (örn: '🇹🇷', '🇺🇸')
 */
export const getCountryFlag = (countryCode) => {
  if (!countryCode) return '';
  
  const upperCode = countryCode.toUpperCase();
  return COUNTRY_INFO[upperCode]?.flag || '🌍';
};

/**
 * Şehir arama sonucunu daha okunabilir formata çevirir
 * @param {Object} city - API'den gelen şehir verisi
 * @returns {Object} Formatlanmış şehir verisi
 */
export const formatCitySearchResult = (city) => {
  if (!city) return city;
  
  const countryName = getCountryName(city.country);
  const countryFlag = getCountryFlag(city.country);
  
  return {
    ...city,
    countryName,
    countryFlag,
  };
};

 