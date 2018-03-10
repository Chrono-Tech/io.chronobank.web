import { LangFieldSet } from "./helpers"

export default class ConstantModel {
  constructor ({ slug, name, value }) {
    this.slug = slug
    this.name = name
    this.value = value
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? null : new ConstantModel({
      ...data,
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = new LangFieldSet(data, locale)

    return data == null ? null : new ConstantModel({
      slug: data.slug,
      name: data.name,
      value: localeModelFields.getLocaleField('value'),
    })
  }
}
