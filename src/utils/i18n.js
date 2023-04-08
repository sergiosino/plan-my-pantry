import { I18n } from 'i18n-js'

import en from '../locales/en.json'
import es from '../locales/es.json'

const i18n = new I18n({
  en: { ...en },
  es: { ...es }
})

i18n.enableFallback = true

export default i18n
