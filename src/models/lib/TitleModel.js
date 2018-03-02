import { LangFieldSet } from "./helpers"

export default class TitleModel {
  constructor ({ slug, name, value }) {
    this.slug = slug
    this.name = name
    this.value = value
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? null : new TitleModel({
      ...data,
    })
  }

  static fromServerModel (data, { locales }) {
    let localeModelFields = new LangFieldSet(data, locales)

    return data == null ? null : new TitleModel({
      slug: data.slug,
      name: data.name,
      value: localeModelFields.getLocaleField('value'),
    })
  }
}
