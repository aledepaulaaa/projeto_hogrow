import { useEffect } from 'react';
import { useLocale } from 'react-intlayer';
import { getHTMLTextDir } from 'intlayer';

/**
 * Updates the <html> element's `lang` and `dir` attributes
 * whenever the current locale changes via Intlayer.
 */
export function useI18nHTMLAttributes() {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
}
