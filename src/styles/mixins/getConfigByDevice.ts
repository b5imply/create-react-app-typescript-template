import { DefaultTheme } from 'styled-components/macro';
import { SupportedDevice } from '../../types/enums/SupportedDeviceEnum';

export interface DeviceConfig {
  desktop: string;
  tabletLandscape: string;
  tabletPortrait: string;
  mobile: string;
}

type GridFragmentsByDevice = (theme: DefaultTheme, deviceConfig: DeviceConfig) => string;
export const getConfigByDevice: GridFragmentsByDevice = (
  { device },
  { desktop, tabletLandscape, tabletPortrait, mobile },
) => {
  switch (device) {
    case SupportedDevice.mobile:
      return mobile;
    case SupportedDevice.tabletPortrait:
      return tabletPortrait;
    case SupportedDevice.tabletLandscape:
      return tabletLandscape;
    case SupportedDevice.desktop:
      return desktop;
    default:
      return desktop;
  }
};
