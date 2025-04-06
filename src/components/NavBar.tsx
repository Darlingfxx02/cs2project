import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 0;
  background-color: var(--tg-theme-bg-color);
  border-top: 1px solid var(--tg-theme-secondary-bg-color);
  position: sticky;
  bottom: 0;
  z-index: 100;
`;

interface NavItemProps {
  active: boolean;
}

const NavItem = styled.div<NavItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.active ? 'var(--tg-theme-button-color)' : 'var(--tg-theme-hint-color)'};
  font-size: 12px;
  cursor: pointer;
  
  svg {
    margin-bottom: 4px;
    width: 24px;
    height: 24px;
  }
`;

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <NavContainer>
      <NavItem active={isActive('/')} onClick={() => navigate('/')}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="currentColor"/>
        </svg>
        Главная
      </NavItem>
      <NavItem active={isActive('/catalog')} onClick={() => navigate('/catalog')}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5H11V11H3V5ZM13 5H21V11H13V5ZM3 13H11V19H3V13ZM13 13H21V19H13V13Z" fill="currentColor"/>
        </svg>
        Каталог
      </NavItem>
      <NavItem active={isActive('/cart')} onClick={() => navigate('/cart')}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18ZM7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L21.16 4.96L19.42 4H19.41L18.31 6L15.55 11H8.53L8.4 10.73L6.16 6L5.21 4L4.27 2H1V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.29 15 7.17 14.89 7.17 14.75Z" fill="currentColor"/>
        </svg>
        Корзина
      </NavItem>
    </NavContainer>
  );
};

export default NavBar; 