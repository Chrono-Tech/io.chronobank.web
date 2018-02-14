import locale from 'locale/lib/index'

export const getLocaleModelFields = (data, locales) => {
  if (!data['i18n']) {
    return null
  }

  let userLocales = new locale.Locales(locales)
  let storyLanguages = Object.keys(data.i18n).filter((lang) => data.i18n[lang].active)

  let supportedLocales = new locale.Locales(storyLanguages)
  let bestLocale = userLocales.best(supportedLocales)

  let lang = bestLocale && bestLocale.language

  console.log('best', bestLocale, data.i18n[lang] && data.i18n[lang].overrides, storyLanguages)
  // Defaulted == not found
  return !bestLocale.defaulted && data.i18n[lang] && data.i18n[lang].overrides ? data.i18n[lang].overrides : null
}