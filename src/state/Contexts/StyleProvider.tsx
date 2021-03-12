import React, { useContext } from "react";
import { ResponsiveContext } from "./ResponsiveContext";
import { ThemeProvider } from "styled-components/macro";
import theme from "../../styles/theme";

const StyleProvider: React.FC = ({ children }) => {
  const { currentDevice } = useContext(ResponsiveContext);
  return <ThemeProvider theme={{ ...theme, device: currentDevice }}>{children}</ThemeProvider>;
};

export default StyleProvider;
