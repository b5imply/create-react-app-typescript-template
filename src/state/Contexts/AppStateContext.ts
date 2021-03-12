import { createContext } from "react";

interface StateContext {
  setAppState: (newState: AppState) => void;
  appState: AppState;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState {}

export const initAppState = {
  setAppState: () => {},
  appState: {},
};

export const AppStateContext = createContext<StateContext>(initAppState);
AppStateContext.displayName = "AppState";
