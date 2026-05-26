/**
 * Intlayer configuration file
 * @see https://intlayer.org/doc/concept/configuration
 */

import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.PORTUGUESE, Locales.ENGLISH],
    defaultLocale: Locales.PORTUGUESE,
  },
  routing: {
    mode: 'no-prefix',
  },
  editor: {
    enabled: false,
  },
  compiler: {
    enabled: false,
  },
  dictionary: {
    importMode: 'static',
  },
  build: {
    minify: true,
    purge: true,
    checkTypes: false,
  },
};

export default config;
