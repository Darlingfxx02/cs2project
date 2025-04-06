import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Product } from '../components/ProductCard';

const CartContainer = styled.div`
  padding: 16px 0;
`;

const CartTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--tg-theme-text-color);
`;

const CartItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const CartItem = styled.div`
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--tg-theme-bg-color);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const ItemImage = styled.div`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemDetails = styled.div`
  padding: 12px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.h3`
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 500;
  color: var(--tg-theme-text-color);
`;

const ItemPrice = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: var(--tg-theme-text-color);
  margin-bottom: 8px;
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityButton = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 50%;
`;

const RemoveButton = styled.button`
  background-color: transparent;
  color: var(--danger);
  padding: 4px 8px;
`;

const CartSummary = styled.div`
  background-color: var(--tg-theme-secondary-bg-color);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 16px;
  color: var(--tg-theme-text-color);
`;

const TotalRow = styled(SummaryRow)`
  font-weight: 700;
  font-size: 18px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 16px;
  background-color: var(--success);
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 40px 0;
  
  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    color: var(--tg-theme-hint-color);
  }
  
  h3 {
    font-size: 18px;
    margin-bottom: 8px;
    color: var(--tg-theme-text-color);
  }
  
  p {
    color: var(--tg-theme-hint-color);
    margin-bottom: 24px;
  }
`;

interface CartItem extends Product {
  quantity: number;
}

// Моковые данные для корзины
const mockCartItems: CartItem[] = [
  {
    id: 1,
    title: 'Стильная футболка',
    price: 1500,
    image: 'https://source.unsplash.com/random/300x300/?tshirt',
    description: 'Стильная футболка из 100% хлопка высшего качества.',
    category: 'Одежда',
    quantity: 2
  },
  {
    id: 3,
    title: 'Кожаный кошелек',
    price: 2500,
    image: 'https://source.unsplash.com/random/300x300/?wallet',
    description: 'Элегантный кожаный кошелек с отделениями для карт.',
    category: 'Аксессуары',
    quantity: 1
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  
  useEffect(() => {
    // Настраиваем основную кнопку Telegram
    const tg = window.Telegram.WebApp;
    
    if (cartItems.length > 0) {
      tg.MainButton.setText('Оформить заказ');
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
    
    return () => {
      tg.MainButton.hide();
    };
  }, [cartItems]);
  
  const updateItemQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };
  
  const calculateDelivery = () => {
    return cartItems.length > 0 ? 300 : 0;
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateDelivery();
  };
  
  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <CartTitle>Корзина</CartTitle>
        <EmptyCart>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.3 5.71002C17.91 5.32002 17.28 5.32002 16.89 5.71002L12 10.59L7.10997 5.70002C6.71997 5.31002 6.08997 5.31002 5.69997 5.70002C5.30997 6.09002 5.30997 6.72002 5.69997 7.11002L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.11002C18.68 6.73002 18.68 6.09002 18.3 5.71002Z" fill="currentColor"/>
          </svg>
          <h3>Корзина пуста</h3>
          <p>Добавьте товары, чтобы продолжить покупки</p>
          <button onClick={() => window.history.back()}>Вернуться к покупкам</button>
        </EmptyCart>
      </CartContainer>
    );
  }
  
  return (
    <CartContainer>
      <CartTitle>Корзина</CartTitle>
      
      <CartItemsList>
        {cartItems.map(item => (
          <CartItem key={item.id}>
            <ItemImage>
              <img src={item.image} alt={item.title} />
            </ItemImage>
            <ItemDetails>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemPrice>₽{item.price}</ItemPrice>
              <ItemActions>
                <QuantityControl>
                  <QuantityButton onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                    -
                  </QuantityButton>
                  <span>{item.quantity}</span>
                  <QuantityButton onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                    +
                  </QuantityButton>
                </QuantityControl>
                <RemoveButton onClick={() => removeItem(item.id)}>
                  Удалить
                </RemoveButton>
              </ItemActions>
            </ItemDetails>
          </CartItem>
        ))}
      </CartItemsList>
      
      <CartSummary>
        <SummaryRow>
          <div>Сумма товаров</div>
          <div>₽{calculateSubtotal()}</div>
        </SummaryRow>
        <SummaryRow>
          <div>Доставка</div>
          <div>₽{calculateDelivery()}</div>
        </SummaryRow>
        <TotalRow>
          <div>Итого</div>
          <div>₽{calculateTotal()}</div>
        </TotalRow>
      </CartSummary>
      
      <CheckoutButton>Оформить заказ</CheckoutButton>
    </CartContainer>
  );
};

export default CartPage; 