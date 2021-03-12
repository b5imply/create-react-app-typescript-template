import React, { useMemo } from 'react';
import ApiService from '../ApiService/ApiService';
import ApiServiceContext from '../../state/Contexts/ApiServiceContext';

const ApiServiceProvider: React.FC = ({ children }) => {
  const token = ''; // TODO get token here for API calls
  const apiService = useMemo(() => new ApiService(token), [token]);

  return (
    <ApiServiceContext.Provider value={apiService}>
      {children}
    </ApiServiceContext.Provider>
  );
};

export default ApiServiceProvider;
