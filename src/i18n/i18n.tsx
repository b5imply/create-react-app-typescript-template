import React, { useState, createContext, useCallback, useLayoutEffect } from "react";
import { IntlProvider, useIntl } from "react-intl";
import { PrimitiveType } from "intl-messageformat";
import defaultMessages from "./messages/en.json";

type LocaleMessages = typeof defaultMessages;
type LocaleKey = keyof LocaleMessages;
export type SupportedLocales = "en" | "nb";

// Helper function to import messages based on locale
const importMessages = (locale: SupportedLocales): Promise<LocaleMessages> => {
  switch (locale) {
    case "en":
      return import("./messages/en.json");
    case "nb":
      return import("./messages/nb.json");
    // Add more languages here
  }
};

// Custom hook for easier to get intl messages
type UseFormatMessageType = () => (id: LocaleKey, values?: Record<string, PrimitiveType>) => string;
export const useFormatMessage: UseFormatMessageType = () => {
  const intl = useIntl();
  return (id: LocaleKey, values?: Record<string, PrimitiveType>) =>
    intl.formatMessage({ id }, values);
};

// Locale changer provider
type I18NValue = (newLocale: SupportedLocales) => void;
export const i18nContext = createContext<I18NValue>(() => {});

// Component that sets i18n up
const I18N: React.FC = ({ children }) => {
  const langLocalStorage = window.localStorage.getItem("snowtam-language");
  const langWindowLanguage: SupportedLocales =
    window.navigator.language.slice(0, 2) === "no" ? "nb" : "en";
  const [locale, setLocale] = useState<SupportedLocales>(
    (langLocalStorage as SupportedLocales) ?? langWindowLanguage
  );
  const [messages, setMessages] = useState<LocaleMessages>(defaultMessages);

  useLayoutEffect(() => {
    importMessages(locale).then(setMessages);
  }, [locale]);

  const changeLocale = useCallback(
    (newLocale: SupportedLocales) => {
      setLocale(newLocale);
      window.localStorage.setItem("snowtam-language", newLocale);
    },
    [setLocale]
  );

  return (
    <i18nContext.Provider value={changeLocale}>
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </i18nContext.Provider>
  );
};

export default I18N;
