import { createI18n } from "vue-i18n";
import es from './spanish.js';
import en from './english.js';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en, es
  }
})

export default i18n;
