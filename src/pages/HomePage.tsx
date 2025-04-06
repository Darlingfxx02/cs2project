import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard, { Product } from '../components/ProductCard';

const HomeContainer = styled.div`
  padding: 16px 0;
`;

const Banner = styled.div`
  height: 150px;
  margin-bottom: 24px;
  border-radius: 12px;
  background: linear-gradient(45deg, var(--primary), var(--info));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://source.unsplash.com/random/800x400/?shop') center/cover;
    opacity: 0.3;
  }
`;

const SectionTitle = styled.h2`
  margin: 24px 0 16px;
  font-size: 20px;
  font-weight: 600;
  color: var(--tg-theme-text-color);
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const CategoryList = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 8px 0;
  margin-bottom: 16px;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryItem = styled.div`
  padding: 8px 16px;
  background-color: var(--tg-theme-secondary-bg-color);
  border-radius: 20px;
  white-space: nowrap;
  color: var(--tg-theme-text-color);
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: var(--tg-theme-button-color);
    color: var(--tg-theme-button-text-color);
  }
`;

// Моковые данные для товаров
const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Стильная футболка',
    price: 1500,
    image: 'https://source.unsplash.com/random/300x300/?tshirt',
    description: 'Стильная футболка из 100% хлопка высшего качества.',
    category: 'Одежда'
  },
  {
    id: 2,
    title: 'Умные часы',
    price: 9990,
    image: 'https://source.unsplash.com/random/300x300/?smartwatch',
    description: 'Смарт-часы с пульсометром и мониторингом сна.',
    category: 'Электроника'
  },
  {
    id: 3,
    title: 'Кожаный кошелек',
    price: 2500,
    image: 'https://source.unsplash.com/random/300x300/?wallet',
    description: 'Элегантный кожаный кошелек с отделениями для карт.',
    category: 'Аксессуары'
  },
  {
    id: 4,
    title: 'Кроссовки',
    price: 4500,
    image: 'https://source.unsplash.com/random/300x300/?sneakers',
    description: 'Удобные и стильные кроссовки для повседневной носки.',
    category: 'Обувь'
  }
];

// Моковые категории
const categories = ['Все', 'Одежда', 'Электроника', 'Аксессуары', 'Обувь', 'Дом', 'Красота'];

const HomePage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Проверяем наличие Telegram WebApp API
    if (window.Telegram && window.Telegram.WebApp) {
      try {
        const tg = window.Telegram.WebApp;
        
        // Проверяем доступность MainButton
        if (tg.MainButton) {
          tg.MainButton.setText('Перейти в каталог');
          tg.MainButton.show();
          
          const handleClick = () => {
            navigate('/catalog');
          };
          
          tg.MainButton.onClick(handleClick);
          
          return () => {
            tg.MainButton.hide();
            tg.MainButton.offClick(handleClick);
          };
        }
      } catch (error) {
        console.error('Error setting up Telegram MainButton:', error);
      }
    }
  }, [navigate]);
  
  return (
    <HomeContainer>
      <Banner>TG Shop</Banner>
      
      <CategoryList>
        {categories.map(category => (
          <CategoryItem key={category} onClick={() => navigate('/catalog')}>
            {category}
          </CategoryItem>
        ))}
      </CategoryList>
      
      <SectionTitle>Популярные товары</SectionTitle>
      <ProductGrid>
        {mockProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </HomeContainer>
  );
};

export default HomePage; 