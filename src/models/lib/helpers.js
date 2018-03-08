export class LangFieldSet {
  constructor (data, locale){
    this.data = data
    this.locale = locale
  }

  getLocaleField (fieldName) {
    const { data, locale } = this
    return data.i18n && data.i18n[locale] && data.i18n[locale].overrides && data.i18n[locale].overrides[fieldName] || data[fieldName]
  }

}
