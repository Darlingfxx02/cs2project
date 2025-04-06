import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

// Объявляем компонент Fallback для отображения во время инициализации
const LoadingScreen = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: '18px'
  }}>
    Загрузка...
  </div>
);

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;
    let attempts = 0;
    const maxAttempts = 10;
    
    const initTelegram = () => {
      console.log("Attempting to initialize Telegram WebApp, attempt:", attempts + 1);
      
      // Проверяем, доступен ли Telegram WebApp API
      if (window.Telegram && window.Telegram.WebApp) {
        try {
          const tg = window.Telegram.WebApp;
          
          console.log("Telegram WebApp available:", tg);
          console.log("Color scheme:", tg.colorScheme);
          console.log("InitData:", tg.initData);
          
          // Сигнализируем о готовности
          tg.ready();
          
          // Если приложение открыто в Telegram, расширяем его на весь экран
          if (tg.expand) {
            tg.expand();
          }
          
          // Устанавливаем переменные CSS для темы Telegram
          document.documentElement.style.setProperty(
            '--tg-theme-bg-color', 
            tg.colorScheme === 'dark' ? '#000000' : '#ffffff'
          );
          document.documentElement.style.setProperty(
            '--tg-theme-text-color', 
            tg.colorScheme === 'dark' ? '#ffffff' : '#000000'
          );
          document.documentElement.style.setProperty(
            '--tg-theme-secondary-bg-color',
            tg.colorScheme === 'dark' ? '#333333' : '#f0f0f0'
          );
          
          if (mounted) {
            setIsInitialized(true);
          }
          return true;
        } catch (error) {
          console.error('Error initializing Telegram WebApp:', error);
          document.documentElement.style.setProperty('--tg-theme-bg-color', '#ffffff');
          document.documentElement.style.setProperty('--tg-theme-text-color', '#000000');
          document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', '#f0f0f0');
        }
      } else {
        console.log('Telegram WebApp is not available (attempt ' + (attempts + 1) + ')');
        document.documentElement.style.setProperty('--tg-theme-bg-color', '#ffffff');
        document.documentElement.style.setProperty('--tg-theme-text-color', '#000000');
        document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', '#f0f0f0');
      }
      
      // Если не удалось инициализировать и попытки не исчерпаны
      if (attempts < maxAttempts && mounted) {
        attempts++;
        setTimeout(initTelegram, 100); // Пробуем снова через 100 мс
        return false;
      } else if (mounted) {
        // Если исчерпаны попытки, все равно показываем приложение
        console.log("Max attempts reached, showing app anyway");
        setIsInitialized(true);
        return false;
      }
      return false;
    };

    // Пытаемся инициализировать сразу
    initTelegram();

    return () => {
      mounted = false;
    };
  }, []);

  // Показываем загрузочный экран, пока не инициализировано
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
};

export default App; 