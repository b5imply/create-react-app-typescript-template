import React from 'react';
import styled from 'styled-components/macro';
import logo from '../../../assets/logo/logo.svg';
import { useFormatMessage } from '../../../i18n/i18n';

const Home: React.FC = () => {
  const formatMessage = useFormatMessage();
  return (
    <HomeStyled>
      <HomeHeader>
        <HomeLogo src={logo} alt="logo" />
        <p>
          {formatMessage('home.edit', { path: '<code>src/App.tsx</code>' })}
        </p>
        <HomeLink
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {formatMessage('home.link')}
        </HomeLink>
      </HomeHeader>
    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  text-align: center;

  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }
`;

const HomeLogo = styled.img`
  height: 40vmin;
  pointer-events: none;

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const HomeHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const HomeLink = styled.a`
  color: #61dafb;
`;

export default Home;
