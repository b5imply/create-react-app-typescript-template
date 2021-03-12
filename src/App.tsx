import React from 'react';
import Providers from './services/Providers/Providers';
import Routes from './services/Routes/Routes';

const App: React.FC = () => {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
};

export default App;
