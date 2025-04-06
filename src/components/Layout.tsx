import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import NavBar from './NavBar';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 0 16px;
`;

const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <NavBar />
    </LayoutContainer>
  );
};

export default Layout; 