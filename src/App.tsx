import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

const App = () => {
  const [telegramInitialized, setTelegramInitialized] = useState(false);

  useEffect(() => {
    const initTelegram = () => {
      // Проверяем, доступен ли Telegram WebApp API
      if (window.Telegram && window.Telegram.WebApp) {
        try {
          // Инициализация Telegram Web App
          const tg = window.Telegram.WebApp;
          
          console.log("Telegram WebApp available:", tg);
          console.log("Color scheme:", tg.colorScheme);
          
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
          
          setTelegramInitialized(true);
          
        } catch (error) {
          console.error('Error initializing Telegram WebApp:', error);
          // Установим дефолтную тему в случае ошибки
          document.documentElement.style.setProperty('--tg-theme-bg-color', '#ffffff');
          document.documentElement.style.setProperty('--tg-theme-text-color', '#000000');
          document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', '#f0f0f0');
        }
      } else {
        // Если API недоступен, используем дефолтную тему
        console.log('Telegram WebApp is not available. Running in browser mode.');
        document.documentElement.style.setProperty('--tg-theme-bg-color', '#ffffff');
        document.documentElement.style.setProperty('--tg-theme-text-color', '#000000');
        document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', '#f0f0f0');
      }
    };

    // Пытаемся инициализировать Telegram сразу
    initTelegram();

    // И также после полной загрузки страницы
    window.addEventListener('load', initTelegram);
    
    return () => {
      window.removeEventListener('load', initTelegram);
    };
  }, []);

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