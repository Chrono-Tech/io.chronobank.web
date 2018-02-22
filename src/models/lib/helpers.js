export const getLocaleModelFields = (data, locale) => {
  if (!data['i18n']) {
    return null
  }

  return data.i18n[locale] && data.i18n[locale].overrides ? data.i18n[locale].overrides : null
}
