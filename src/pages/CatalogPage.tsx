import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductCard, { Product } from '../components/ProductCard';

const CatalogContainer = styled.div`
  padding: 16px 0;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid var(--tg-theme-secondary-bg-color);
  background-color: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
  font-size: 16px;
  margin-bottom: 16px;
  
  &:focus {
    outline: none;
    border-color: var(--tg-theme-button-color);
  }
  
  &::placeholder {
    color: var(--tg-theme-hint-color);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface FilterItemProps {
  active: boolean;
}

const FilterItem = styled.div<FilterItemProps>`
  padding: 8px 16px;
  background-color: ${props => props.active ? 'var(--tg-theme-button-color)' : 'var(--tg-theme-secondary-bg-color)'};
  color: ${props => props.active ? 'var(--tg-theme-button-text-color)' : 'var(--tg-theme-text-color)'};
  border-radius: 20px;
  white-space: nowrap;
  font-size: 14px;
  cursor: pointer;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 0;
  color: var(--tg-theme-hint-color);
  
  svg {
    margin-bottom: 16px;
    width: 64px;
    height: 64px;
  }
  
  h3 {
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: 500;
    color: var(--tg-theme-text-color);
  }
  
  p {
    font-size: 14px;
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
  },
  {
    id: 5,
    title: 'Беспроводные наушники',
    price: 6990,
    image: 'https://source.unsplash.com/random/300x300/?headphones',
    description: 'Беспроводные наушники с активным шумоподавлением.',
    category: 'Электроника'
  },
  {
    id: 6,
    title: 'Солнцезащитные очки',
    price: 3500,
    image: 'https://source.unsplash.com/random/300x300/?sunglasses',
    description: 'Стильные солнцезащитные очки с UV-защитой.',
    category: 'Аксессуары'
  }
];

// Категории
const categories = ['Все', 'Одежда', 'Электроника', 'Аксессуары', 'Обувь'];

const CatalogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Все');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  
  useEffect(() => {
    // Фильтрация товаров по поиску и категории
    const results = mockProducts.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'Все' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    
    setFilteredProducts(results);
  }, [searchTerm, activeCategory]);
  
  return (
    <CatalogContainer>
      <SearchInput 
        type="text" 
        placeholder="Поиск товаров..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <FilterContainer>
        {categories.map(category => (
          <FilterItem 
            key={category} 
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </FilterItem>
        ))}
      </FilterContainer>
      
      {filteredProducts.length > 0 ? (
        <ProductGrid>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      ) : (
        <EmptyState>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor"/>
          </svg>
          <h3>Товары не найдены</h3>
          <p>Попробуйте изменить параметры поиска</p>
        </EmptyState>
      )}
    </CatalogContainer>
  );
};

export default CatalogPage; 