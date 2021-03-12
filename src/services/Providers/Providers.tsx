import React from 'react';
import ResponsiveContext from '../../state/Contexts/ResponsiveContext';
import GlobalStyles from '../../styles/GlobalStyles';
import I18N from '../../i18n/i18n';
import ApiServiceProvider from './ApiServiceProvider';
import StyleProvider from '../../state/Contexts/StyleProvider';
import AppStateProvider from './AppStateProvider';

const Providers: React.FC = ({ children }) => {
  return (
    <ApiServiceProvider>
      <ResponsiveContext>
        <StyleProvider>
          <GlobalStyles>
            <I18N>
              <AppStateProvider>{children}</AppStateProvider>
            </I18N>
          </GlobalStyles>
        </StyleProvider>
      </ResponsiveContext>
    </ApiServiceProvider>
  );
};

export default Providers;
