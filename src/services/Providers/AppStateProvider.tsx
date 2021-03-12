import React, { useState, useCallback } from 'react';
import { AppStateContext, initAppState, AppState } from '../../state/Contexts/AppStateContext';

const AppStateProvider: React.FC = ({ children }) => {
  const [appState, setNewAppState] = useState<AppState>(initAppState.appState);

  const setAppState = useCallback(
    (newState: AppState) => {
      setNewAppState((prevState: AppState) => ({
        ...prevState,
        ...newState,
      }));
    },
    [setNewAppState],
  );

  return (
    <AppStateContext.Provider
      value={{
        appState,
        setAppState,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
