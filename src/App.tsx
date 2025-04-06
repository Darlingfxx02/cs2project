import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import './styles/global.css';

// Важно: отслеживаем ошибки при загрузке
console.log('App.tsx загружен, проверяем доступность Telegram WebApp');

// Объявляем компонент Fallback для отображения во время инициализации
const LoadingFallback = () => (
  <div className="loading-screen">
    <div className="loading-spinner"></div>
    <p>Инициализация приложения...</p>
  </div>
);

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      console.log('App.tsx: useEffect сработал');
      
      // Проверяем наличие Telegram WebApp API
      if (window.Telegram && window.Telegram.WebApp) {
        console.log('Telegram WebApp API найден:', {
          colorScheme: window.Telegram.WebApp.colorScheme
        });
        
        const tg = window.Telegram.WebApp;
        
        // Инициализация WebApp
        tg.ready();
        tg.expand();
        
        // Установка цветов темы
        document.documentElement.style.setProperty(
          '--tg-theme-bg-color',
          tg.colorScheme === 'dark' ? '#1f1f1f' : '#ffffff'
        );
        
        document.documentElement.style.setProperty(
          '--tg-theme-text-color',
          tg.colorScheme === 'dark' ? '#ffffff' : '#000000'
        );
        
        document.documentElement.style.setProperty(
          '--tg-theme-secondary-bg-color',
          tg.colorScheme === 'dark' ? '#333333' : '#f0f0f0'
        );
        
        console.log('Telegram WebApp успешно инициализирован');
        setIsInitialized(true);
      } else {
        console.warn('Telegram WebApp API не найден, используем значения по умолчанию');
        // Установка цветов по умолчанию
        document.documentElement.style.setProperty('--tg-theme-bg-color', '#ffffff');
        document.documentElement.style.setProperty('--tg-theme-text-color', '#000000');
        document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', '#f0f0f0');
        
        // Показываем приложение даже без Telegram API
        setIsInitialized(true);
      }
    } catch (error) {
      console.error('Ошибка при инициализации Telegram WebApp:', error);
      // Установка цветов по умолчанию при ошибке
      document.documentElement.style.setProperty('--tg-theme-bg-color', '#ffffff');
      document.documentElement.style.setProperty('--tg-theme-text-color', '#000000');
      document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', '#f0f0f0');
      
      // Показываем приложение даже при ошибке
      setIsInitialized(true);
    }
  }, []);

  return (
    <>
      {isInitialized ? (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Routes>
      ) : (
        <LoadingFallback />
      )}
    </>
  );
};

export default App; 