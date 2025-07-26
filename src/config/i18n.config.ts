import { AcceptLanguageResolver, I18nOptions } from 'nestjs-i18n';
import * as path from 'path';

const i18nConfig: I18nOptions = {
  fallbackLanguage: 'es',
  loaderOptions: {
    path: path.join(__dirname, '../i18n'),
    watch: true,
  },
  resolvers: [AcceptLanguageResolver],
};

export default i18nConfig;
