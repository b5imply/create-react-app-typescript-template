import { createContext } from 'react';

interface StateContext {
  setAppState: (newState: AppState) => void;
  appState: AppState;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState {}

export const initAppState = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setAppState: () => {},
  appState: {},
};

export const AppStateContext = createContext<StateContext>(initAppState);
AppStateContext.displayName = 'AppState';
