import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-xhr-backend'
import zh from 'antd/lib/locale-provider/zh_CN'
import en from 'antd/lib/locale-provider/default'

let prefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/locales' : ''

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${prefix}/{{lng}}/{{ns}}.json`
    },
    whitelist: ['en', 'zh'],
    fallbackLng: ['zh'],
    ns: ['trans'],
    defaultNS: 'trans',
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: true,
      useSuspense: false
    },
  })

i18n.on('languageChanged', function (lng) {
  console.log(lng)
})

export function setAntdLocale (lang) {
  let list = {
    'en': en,
    'zh': zh
  }
  return list[lang]
}

export default i18n
