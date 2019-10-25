import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
// import Backend from 'i18next-xhr-backend'
import zh_TW from 'antd/lib/locale-provider/zh_TW'
import en from 'antd/lib/locale-provider/default'
import enTrans from '../locales/en-US/trans.json'
import zhTrans from '../locales/zh-TW/trans'

i18n
  // .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      "en-US": {
        "trans": enTrans
      },
      "zh-TW": {
        "trans": zhTrans
      },
    },
    fallbackLng: ['zh-TW', 'en-US'],
    ns: ['trans'],
    defaultNS: 'trans'
  })

i18n.on('languageChanged', function (lng) {
  console.log(lng)
})

export function setAntdLocale (lang) {
  let list = {
    'en-US': en,
    'zh-TW': zh_TW
  }
  return list[lang]
}

export default i18n
