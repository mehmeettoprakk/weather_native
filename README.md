# 🌤️ Hava Durumu Uygulaması

Modern React Native Expo ile geliştirilmiş **Clean Code** prensipleriyle yazılmış hava durumu uygulaması.

## ✨ Özellikler

- 📍 **Otomatik Konum Tespiti**: GPS ile mevcut konumunuzu otomatik olarak tespit eder
- 🌡️ **Detaylı Hava Durumu**: Sıcaklık, nem, basınç, rüzgar hızı ve daha fazlası
- 🌅 **Güneş Durumu**: Gün doğumu ve batımı saatleri
- 🔄 **Yenileme**: Pull-to-refresh ve manuel yenileme
- 🎨 **Modern Tasarım**: Clean ve modern kullanıcı arayüzü
- 🇹🇷 **Türkçe Dil Desteği**: Tamamen Türkçe arayüz
- 🏙️ **Şehir Seçimi**: Türkiye ve dünya şehirleri arasından seçim
- 🔍 **Akıllı Arama**: Gerçek zamanlı şehir arama

## 🏗️ Clean Code Mimarisi

Proje **Clean Code** ve **SOLID** prensiplerine uygun olarak yapılandırılmıştır:

```
📁 src/
  📁 components/          # UI Bileşenleri
    📄 WeatherDisplay.js   # Hava durumu gösterimi
    📄 CitySelector.js     # Şehir seçici
    📄 SearchModal.js      # Arama modalı

  📁 hooks/               # Custom Hooks
    📄 useWeather.js       # Hava durumu state yönetimi
    📄 useLocation.js      # Konum yönetimi
    📄 useCitySearch.js    # Şehir arama yönetimi

  📁 services/            # API Katmanı
    📄 weatherApi.js       # Hava durumu API'leri
    📄 locationService.js  # Konum servisleri

  📁 constants/           # Sabitler
    📄 cities.js          # Şehir listeleri
    📄 config.js          # Uygulama konfigürasyonu

  📁 styles/              # Stil Dosyaları
    📄 commonStyles.js     # Ortak stiller
    📄 modalStyles.js      # Modal stilleri

  📁 utils/               # Yardımcı Fonksiyonlar
    📄 weatherUtils.js     # Hava durumu yardımcıları

📄 App.js                 # Ana uygulama dosyası (temizlenmiş)
```

### 🎯 **Clean Code Avantajları:**

- ✅ **Tek Sorumluluk**: Her dosya tek bir sorumluluğa sahip
- ✅ **Yeniden Kullanılabilirlik**: Custom hook'lar farklı component'lerde kullanılabilir
- ✅ **Test Edilebilirlik**: Her katman ayrı ayrı test edilebilir
- ✅ **Bakım Kolaylığı**: Kodda değişiklik yapmak çok daha kolay
- ✅ **Scalability**: Proje büyüdükçe yeni özellikler eklemek kolay
- ✅ **Error Handling**: Merkezi hata yönetimi

## 🚀 Kurulum

### 1. Projeyi Klonlayın

```bash
git clone <repository-url>
cd weather
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. OpenWeather API Anahtarı Alın

1. [OpenWeatherMap](https://openweathermap.org/api) sitesine gidin
2. Ücretsiz hesap oluşturun
3. API Keys bölümünden API anahtarınızı alın

### 4. API Anahtarını Ayarlayın

`src/constants/config.js` dosyasında API anahtarınızı güncelleyin:

```javascript
export const API_CONFIG = {
  OPENWEATHER_API_KEY: process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY,
  BASE_URL: "https://api.openweathermap.org/data/2.5",
  GEO_URL: "http://api.openweathermap.org/geo/1.0",
  DEFAULT_UNITS: "metric",
  DEFAULT_LANGUAGE: "tr",
  SEARCH_LIMIT: 10,
  REQUEST_TIMEOUT: 10000,
};
```

### 5. Uygulamayı Çalıştırın

```bash
# Development server'ı başlatın
npm start

# Android'de çalıştırmak için
npm run android

# iOS'ta çalıştırmak için
npm run ios

# Web'de çalıştırmak için
npm run web
```

## 🔧 Geliştirme

### Custom Hook Kullanımı

```javascript
import { useWeather } from '../hooks/useWeather';
import { useLocation } from '../hooks/useLocation';

function MyComponent() {
  const { weatherData, getWeatherByCoords, loading } = useWeather();
  const { getCurrentLocation } = useLocation();

  const handleGetWeather = async () => {
    const location = await getCurrentLocation();
    if (location) {
      await getWeatherByCoords(location.latitude, location.longitude);
    }
  };

  return (
    // JSX here
  );
}
```

### Service Kullanımı

```javascript
import { weatherService } from "../services/weatherApi";

// Koordinatlara göre hava durumu al
const weatherData = await weatherService.getWeatherByCoords(lat, lon);

// Şehir adına göre hava durumu al
const weatherData = await weatherService.getWeatherByCity("Istanbul");
```

### Utils Kullanımı

```javascript
import { formatTime, getWeatherIcon } from "../utils/weatherUtils";

const sunrise = formatTime(weatherData.sys.sunrise);
const iconName = getWeatherIcon(weatherData.weather[0].icon);
```

## 📱 Ekran Görüntüleri

Uygulama şu bilgileri gösterir:

- Mevcut sıcaklık ve hava durumu
- Hissedilen sıcaklık
- Minimum ve maksimum sıcaklık
- Nem oranı
- Atmosferik basınç
- Görüş mesafesi
- Rüzgar hızı
- Bulutluluk oranı
- Gün doğumu ve batımı saatleri

## 🛠️ Kullanılan Teknolojiler

- **React Native**: Cross-platform mobil uygulama geliştirme
- **Expo**: React Native geliştirme platformu
- **OpenWeather API**: Hava durumu verileri
- **Expo Location**: GPS konum servisleri
- **Axios**: HTTP istekleri
- **Expo Vector Icons**: İkonlar
- **Clean Architecture**: Temiz kod mimarisi
- **Custom Hooks**: State management

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Expo CLI
- OpenWeather API anahtarı
- Android Studio (Android geliştirme için)
- Xcode (iOS geliştirme için)

## 🔧 Konfigürasyon

### API Ayarları

`src/constants/config.js` dosyasında tüm API ayarlarını bulabilirsiniz:

```javascript
export const API_CONFIG = {
  OPENWEATHER_API_KEY: "your-api-key",
  BASE_URL: "https://api.openweathermap.org/data/2.5",
  DEFAULT_UNITS: "metric",
  DEFAULT_LANGUAGE: "tr",
};
```

### Renk Paleti

`src/constants/config.js` dosyasında renk paletini özelleştirebilirsiniz:

```javascript
export const COLORS = {
  primary: "#4A90E2",
  secondary: "#667eea",
  // ... diğer renkler
};
```

## 🧪 Testing

```bash
# Test'leri çalıştır
npm test

# Coverage raporu
npm run test:coverage
```

## 🐛 Sorun Giderme

### API Anahtarı Hatası

- API anahtarınızın doğru olduğundan emin olun
- API anahtarının aktif olduğunu kontrol edin (aktivasyon 10-15 dakika sürebilir)

### Konum Hatası

- Cihazınızda GPS'in açık olduğundan emin olun
- Uyglamaya konum izni verdiğinizden emin olun

### Bağlantı Hatası

- İnternet bağlantınızı kontrol edin
- Güvenlik duvarı ayarlarınızı kontrol edin

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Clean code prensiplerini takip edin
4. Test ekleyin
5. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
6. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
7. Pull Request oluşturun

## 📞 İletişim

Herhangi bir sorunuz varsa lütfen iletişime geçin.

---

Made with ❤️ using **Clean Code** principles, React Native & Expo
