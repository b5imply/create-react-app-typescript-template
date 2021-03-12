import React, { createContext } from 'react';
import useWindowSize from '../Hooks/useWindowSize';
import { isMobile, withOrientationChange, isTablet } from 'react-device-detect';
import theme from '../../styles/theme';
import { SupportedDevice } from '../../types/enums/SupportedDeviceEnum';

export interface ContextValue {
  currentDevice: SupportedDevice;
}

export const ResponsiveContext = createContext<ContextValue>({
  currentDevice: SupportedDevice.desktop,
});
ResponsiveContext.displayName = 'ResponsiveContext';

interface Props {
  isLandscape?: boolean;
  isPortrait?: boolean;
}

const ResponsiveContextComponent: React.FC<Props> = ({
  children,
  isLandscape = false,
  isPortrait = false,
}) => {
  const [width] = useWindowSize();

  let device = SupportedDevice.mobile;
  if (width <= theme.sizes.screen.phone || isMobile) {
    device = SupportedDevice.mobile;
  }
  if (
    (isTablet && isPortrait) ||
    (width > theme.sizes.screen.phone &&
      width < theme.sizes.screen.tabletPortrait) ||
    (width >= theme.sizes.screen.phone &&
      width < theme.sizes.screen.tabletPortrait &&
      isPortrait)
  ) {
    device = SupportedDevice.tabletPortrait;
  }
  if (
    (isTablet && isLandscape) ||
    (width > theme.sizes.screen.tabletPortrait &&
      width < theme.sizes.screen.tabletLandscape) ||
    (width >= theme.sizes.screen.tabletPortrait &&
      width < theme.sizes.screen.tabletLandscape &&
      isLandscape)
  ) {
    device = SupportedDevice.tabletLandscape;
  }
  if (width >= theme.sizes.screen.tabletLandscape) {
    device = SupportedDevice.desktop;
  }
  const contextValue: ContextValue = {
    currentDevice: device,
  };

  return (
    <ResponsiveContext.Provider value={contextValue}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export default withOrientationChange(ResponsiveContextComponent);
