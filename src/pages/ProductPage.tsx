import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Product } from '../components/ProductCard';

const ProductContainer = styled.div`
  padding: 16px 0;
`;

const ProductImage = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--tg-theme-text-color);
`;

const ProductPrice = styled.div`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--tg-theme-text-color);
`;

const ProductDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 24px;
  color: var(--tg-theme-text-color);
`;

const ProductCategory = styled.div`
  display: inline-block;
  padding: 4px 12px;
  background-color: var(--tg-theme-secondary-bg-color);
  border-radius: 16px;
  font-size: 14px;
  margin-bottom: 24px;
  color: var(--tg-theme-text-color);
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const QuantityValue = styled.div`
  font-size: 18px;
  margin: 0 16px;
  min-width: 24px;
  text-align: center;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 16px;
  margin-bottom: 16px;
`;

const BuyNowButton = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 16px;
  background-color: var(--success);
`;

// Моковые данные для товаров
const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Стильная футболка',
    price: 1500,
    image: 'https://source.unsplash.com/random/300x300/?tshirt',
    description: 'Стильная футболка из 100% хлопка высшего качества. Комфортная посадка, приятная к телу ткань. Подходит для повседневной носки и активного отдыха. Доступна в разных цветах и размерах.',
    category: 'Одежда'
  },
  {
    id: 2,
    title: 'Умные часы',
    price: 9990,
    image: 'https://source.unsplash.com/random/300x300/?smartwatch',
    description: 'Смарт-часы с пульсометром и мониторингом сна. Водонепроницаемый корпус, долгая работа от батареи. Отслеживание физической активности и уведомления со смартфона.',
    category: 'Электроника'
  },
  {
    id: 3,
    title: 'Кожаный кошелек',
    price: 2500,
    image: 'https://source.unsplash.com/random/300x300/?wallet',
    description: 'Элегантный кожаный кошелек с отделениями для карт. Натуральная кожа высшего качества, ручная работа. Компактный размер идеально подходит для повседневного использования.',
    category: 'Аксессуары'
  },
  {
    id: 4,
    title: 'Кроссовки',
    price: 4500,
    image: 'https://source.unsplash.com/random/300x300/?sneakers',
    description: 'Удобные и стильные кроссовки для повседневной носки. Амортизирующая подошва, дышащий верх. Идеально подходят для города и активного отдыха.',
    category: 'Обувь'
  }
];

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    // Имитация загрузки данных о товаре
    if (id) {
      const foundProduct = mockProducts.find(p => p.id === parseInt(id));
      setProduct(foundProduct || null);
    }
    
    // Настраиваем основную кнопку Telegram
    const tg = window.Telegram.WebApp;
    tg.MainButton.setText('Добавить в корзину');
    tg.MainButton.show();
    
    return () => {
      tg.MainButton.hide();
    };
  }, [id]);
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  if (!product) {
    return (
      <ProductContainer>
        <div>Товар не найден</div>
      </ProductContainer>
    );
  }
  
  return (
    <ProductContainer>
      <ProductImage>
        <img src={product.image} alt={product.title} />
      </ProductImage>
      
      <ProductTitle>{product.title}</ProductTitle>
      <ProductPrice>₽{product.price}</ProductPrice>
      <ProductCategory>{product.category}</ProductCategory>
      
      <ProductDescription>{product.description}</ProductDescription>
      
      <QuantitySelector>
        <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
        <QuantityValue>{quantity}</QuantityValue>
        <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
      </QuantitySelector>
      
      <AddToCartButton>Добавить в корзину</AddToCartButton>
      <BuyNowButton>Купить сейчас</BuyNowButton>
    </ProductContainer>
  );
};

export default ProductPage; 