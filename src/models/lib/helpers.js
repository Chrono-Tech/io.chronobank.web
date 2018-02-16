import locale from 'locale'

export const getLocaleModelFields = (data, locales) => {
  if (!data['i18n']) {
    return null
  }

  let userLocales = new locale.Locales(locales)
  let storyLanguages = Object.keys(data.i18n).filter((lang) => data.i18n[lang].active).concat('en')

  let supportedLocales = new locale.Locales(storyLanguages)
  let bestLocale = userLocales.best(supportedLocales)

  let lang = bestLocale && bestLocale.language

  // Defaulted == not found
  return !bestLocale.defaulted && data.i18n[lang] && data.i18n[lang].overrides ? data.i18n[lang].overrides : null
}