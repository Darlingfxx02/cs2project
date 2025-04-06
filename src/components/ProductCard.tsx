import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const Card = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--tg-theme-bg-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const CardImage = styled.div`
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 16px;
`;

const ProductTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 500;
  color: var(--tg-theme-text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: var(--tg-theme-text-color);
`;

const AddToCartButton = styled.button`
  width: 100%;
  margin-top: 12px;
`;

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Здесь будет логика добавления в корзину
    console.log('Add to cart:', product.id);
  };
  
  return (
    <Card onClick={() => navigate(`/product/${product.id}`)}>
      <CardImage>
        <img src={product.image} alt={product.title} />
      </CardImage>
      <CardContent>
        <ProductTitle>{product.title}</ProductTitle>
        <ProductPrice>₽{product.price}</ProductPrice>
        <AddToCartButton onClick={handleAddToCart}>
          В корзину
        </AddToCartButton>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 