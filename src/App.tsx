import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

const App = () => {
  useEffect(() => {
    // Инициализация Telegram Web App
    const tg = window.Telegram.WebApp;
    tg.ready();
    
    // Если приложение открыто в Telegram, расширяем его на весь экран
    tg.expand();
    
    // Настраиваем тему в зависимости от темы Telegram
    document.documentElement.style.setProperty(
      '--tg-theme-bg-color', 
      tg.colorScheme === 'dark' ? '#000000' : '#ffffff'
    );
    document.documentElement.style.setProperty(
      '--tg-theme-text-color', 
      tg.colorScheme === 'dark' ? '#ffffff' : '#000000'
    );
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