import { I18n } from 'i18n-js'

import ar from '../locales/ar.json'
import de from '../locales/de.json'
import en from '../locales/en.json'
import es from '../locales/es.json'
import fr from '../locales/fr.json'
import id from '../locales/id.json'
import it from '../locales/it.json'
import ja from '../locales/ja.json'
import ko from '../locales/ko.json'
import pt from '../locales/pt.json'
import ru from '../locales/ru.json'
import tr from '../locales/tr.json'
import zh from '../locales/zh.json'

const i18n = new I18n({
  ar: { ...ar },
  de: { ...de },
  en: { ...en },
  es: { ...es },
  fr: { ...fr },
  id: { ...id },
  it: { ...it },
  ja: { ...ja },
  ko: { ...ko },
  pt: { ...pt },
  ru: { ...ru },
  tr: { ...tr },
  zh: { ...zh }
})

i18n.enableFallback = true

export default i18n
